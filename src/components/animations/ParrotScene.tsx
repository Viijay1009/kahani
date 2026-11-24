"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import * as P from "@/components/brand/logo-paths";
import { BRAND } from "@/components/brand/Logo";

// Mark viewBox: x 20..760, y 0..824
const VB = { x: 20, y: 0, w: 740, h: 824 };

/** Small deterministic PRNG (mulberry32) so the scatter is the same every visit. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Sample = { positions: Float32Array; colors: Float32Array; wing: Float32Array; count: number };

/** Rasterise the traced logo layers and sample coloured points from them. */
function sampleMark(max: number): Sample {
  const W = 220;
  const H = Math.round((W * VB.h) / VB.w);
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.scale(W / VB.w, H / VB.h);
  ctx.translate(-VB.x, -VB.y);
  ctx.lineWidth = 46;
  const strokes: [string, string][] = [
    [P.arcGreyL, BRAND.grey],
    [P.arcYellowL, BRAND.yellow],
    [P.arcGreyR, BRAND.grey],
    [P.arcYellowR, BRAND.yellow],
  ];
  for (const [d, col] of strokes) {
    ctx.strokeStyle = col;
    ctx.stroke(new Path2D(d));
  }
  const fills: [string, string][] = [
    [P.body, BRAND.light],
    [P.wing, BRAND.dark],
    [P.yellow, BRAND.yellow],
    [P.beak, BRAND.red],
    [P.eye, BRAND.grey],
  ];
  for (const [d, col] of fills) {
    ctx.fillStyle = col;
    ctx.fill(new Path2D(d));
  }
  const img = ctx.getImageData(0, 0, W, H).data;
  const pts: number[] = [];
  const cols: number[] = [];
  const wing: number[] = [];
  const dark = new THREE.Color(BRAND.dark);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (img[i + 3] < 200) continue;
      pts.push(x / W - 0.5, -(y / H - 0.5) * (H / W));
      const col = new THREE.Color(`rgb(${img[i]},${img[i + 1]},${img[i + 2]})`);
      cols.push(col.r, col.g, col.b);
      wing.push(Math.abs(col.r - dark.r) + Math.abs(col.g - dark.g) + Math.abs(col.b - dark.b) < 0.08 ? 1 : 0);
    }
  }
  // Even thinning down to the budget
  const total = pts.length / 2;
  const step = Math.max(1, total / max);
  const count = Math.min(max, total);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const wingF = new Float32Array(count);
  for (let n = 0; n < count; n++) {
    const k = Math.floor(n * step);
    positions.set([pts[k * 2], pts[k * 2 + 1], 0], n * 3);
    colors.set([cols[k * 3], cols[k * 3 + 1], cols[k * 3 + 2]], n * 3);
    wingF[n] = wing[k];
  }
  return { positions, colors, wing: wingF, count };
}

const vertex = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uScale;
  uniform float uSize;
  attribute vec3 aStart;
  attribute vec3 aColor;
  attribute float aDelay;
  attribute float aWing;
  varying vec3 vColor;
  varying float vAlpha;

  float easeOutCubic(float t) { return 1.0 - pow(1.0 - t, 3.0); }

  void main() {
    float t = clamp((uProgress - aDelay) / (1.0 - 0.45), 0.0, 1.0);
    float e = easeOutCubic(t);
    vec3 target = position;

    // Wing feathers sweep in like a leaf, pivoting on the shoulder
    if (aWing > 0.5) {
      vec2 pivot = vec2(-0.02, 0.06);
      float a = (1.0 - e) * 1.4;
      vec2 d = target.xy - pivot;
      target.xy = pivot + mat2(cos(a), -sin(a), sin(a), cos(a)) * d;
    }

    // Spiral from the scattered start into place
    vec3 p = mix(aStart, target, e);
    float swirl = (1.0 - e) * 2.2;
    p.xy = mat2(cos(swirl), -sin(swirl), sin(swirl), cos(swirl)) * p.xy;

    // A breath of drift once settled
    p.x += sin(uTime * 0.9 + aDelay * 40.0) * 0.0025 * e;
    p.y += cos(uTime * 0.7 + aDelay * 33.0) * 0.0025 * e;

    vec4 mv = modelViewMatrix * vec4(p.xy * uScale, p.z * 200.0 * (1.0 - e), 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * mix(1.8, 1.0, e);
    // In flight, particles glow leaf-green or marigold; they take their true colour as they land
    vec3 tint = fract(aDelay * 97.0) > 0.5 ? vec3(0.49, 0.73, 0.26) : vec3(0.96, 0.77, 0.19);
    vColor = mix(tint, aColor, smoothstep(0.55, 1.0, e));
    vAlpha = smoothstep(0.0, 0.25, t);
  }
`;

const fragment = /* glsl */ `
  uniform float uFade;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.2, d);
    gl_FragColor = vec4(vColor, soft * vAlpha * uFade);
  }
`;

function Particles({ count, onDone }: { count: number; onDone: () => void }) {
  const { size, gl } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  const start = useRef<number | null>(null);
  const done = useRef(false);

  const geo = useMemo(() => {
    const s = sampleMark(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(s.positions, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(s.colors, 3));
    g.setAttribute("aWing", new THREE.BufferAttribute(s.wing, 1));
    const startPos = new Float32Array(s.count * 3);
    const delay = new Float32Array(s.count);
    const rand = seeded(7);
    for (let i = 0; i < s.count; i++) {
      const r = 0.55 + rand() * 0.6;
      const th = rand() * Math.PI * 2;
      startPos.set([Math.cos(th) * r, Math.sin(th) * r * 0.9, (rand() - 0.5) * 2], i * 3);
      // Head and arcs settle first, the tail last: the bird "arrives"
      delay[i] = Math.min(0.45, Math.max(0, (0.5 - s.positions[i * 3 + 1]) * 0.35 + rand() * 0.12));
    }
    g.setAttribute("aStart", new THREE.BufferAttribute(startPos, 3));
    g.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
    return g;
  }, [count]);

  useEffect(() => () => geo.dispose(), [geo]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uFade: { value: 1 },
      uScale: { value: new THREE.Vector2(1, 1) },
      uSize: { value: 3 },
    }),
    [],
  );

  useFrame((state) => {
    const m = mat.current;
    if (!m) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;
    const DURATION = 2.4;
    m.uniforms.uProgress.value = Math.min(1, t / DURATION);
    m.uniforms.uTime.value = state.clock.elapsedTime;
    // Fill the box the SVG occupies: width governs (mark is taller than wide)
    m.uniforms.uScale.value.set(size.width, size.width);
    m.uniforms.uSize.value = Math.max(2.2, (size.width / 220) * 1.25) * gl.getPixelRatio();
    if (t > DURATION && !done.current) {
      done.current = true;
      onDone();
    }
    if (t > DURATION) m.uniforms.uFade.value = Math.max(0, 1 - (t - DURATION) / 0.9);
  });

  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function ParrotScene({ onAssembled, dense }: { onAssembled: () => void; dense: boolean }) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 500], zoom: 1, near: 0.1, far: 2000 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      frameloop="always"
      aria-hidden
      style={{ position: "absolute", inset: 0 }}
    >
      <Particles count={dense ? 5200 : 2600} onDone={onAssembled} />
    </Canvas>
  );
}
