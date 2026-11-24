# Kahani Child Development Centre

Website for Kahani Child Development Centre, BTM 2nd Stage, Bengaluru: speech, language and communication support for children.

*Unfolding stories, word by word.*

## Stack
Next.js 16 (App Router, Cache Components) · TypeScript (strict) · Tailwind CSS 4 · GSAP + ScrollTrigger · Three.js via React Three Fiber · lucide-react · next/font · next/image

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Where things live
| Path | What |
|---|---|
| `src/lib/constants.ts` | Phone, email, address, WhatsApp, map: edit contact details here |
| `src/data/services.ts` | The 8 areas of support and the 5 approach principles |
| `src/data/faqs.ts`, `src/data/team.ts`, `src/data/gallery.ts` | FAQs, team profiles, gallery photos |
| `src/components/sections/` | Home page chapters (Hero, Philosophy, Services, Approach…) |
| `src/components/animations/` | Particle parrot (`ParrotScene`), word-by-word reveal, scroll reveals |
| `src/components/brand/` | Vector logo, voice arcs, service illustrations |
| `docs/` | Design plan, asset plan, content to confirm, SEO checklist |

## Environment
See `.env.example`. Both variables are optional.

## Accessibility and motion
All animation respects `prefers-reduced-motion`. The 3D intro falls back to the static vector logo. Content is visible without JavaScript.
