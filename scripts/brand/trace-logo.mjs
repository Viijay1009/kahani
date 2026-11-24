import sharp from 'sharp';
import potrace from 'potrace';
import fs from 'fs';
const S=4, crop={left:452,top:30,width:505,height:206};
const {data,info}=await sharp('design/source/flyer.jpg').extract(crop).resize({width:crop.width*S,kernel:'lanczos3'}).median(3).raw().toBuffer({resolveWithObject:true});
const W=info.width,H=info.height;
function hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?((g-b)/d+(g<b?6:0)):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;}return[h,s,l]}
const cls=new Uint8Array(W*H);
for(let i=0;i<W*H;i++){const[h,s,l]=hsl(data[i*3],data[i*3+1],data[i*3+2]);let c=0;
 if(l>0.8&&s<0.75) c=0; else if((h<20||h>340)&&s>0.35&&l<0.75) c=4; else if(h>=38&&h<62&&s>0.45&&l>0.45) c=3;
 else if(h>=62&&h<175&&s>0.18){ c = l<0.36?1:2; } else if(s<0.3&&l<0.62) c=5; cls[i]=c;}
function mask(fn,b=1.2){const buf=Buffer.alloc(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;buf[i]=fn(cls[i],x,y)?0:255;}return sharp(buf,{raw:{width:W,height:H,channels:1}}).blur(b).png().toBuffer();}
async function smooth(buf,r=5){const a=await sharp(buf).blur(r).threshold(150).png().toBuffer();return sharp(a).blur(r).threshold(110).png().toBuffer();}
function trace(buf,t=60){return new Promise((res,rej)=>potrace.trace(buf,{turdSize:t,optTolerance:0.4,threshold:128},(e,svg)=>e?rej(e):res(svg.match(/ d="([^"]+)"/)[1])));}
const notArc=(x,y)=>{const dx=x-380,dy=y-335,r=Math.hypot(dx,dy);let a=Math.atan2(dy,dx)*180/Math.PI;if(a<0)a+=360;if(a>=138&&a<=258&&r>232)return false;if(a>=18&&a<=78&&r>258)return false;return true;};
const P={
 body: await trace(await smooth(await mask((c,x,y)=>x<700&&notArc(x,y)&&(c===1||c===2||c===4||(c===3&&x>45*S&&x<150*S)),1.6),9),300),
 wing: await trace(await smooth(await mask((c,x,y)=>x<700&&notArc(x,y)&&c===1,1.4)),200),
 yellow: await trace(await smooth(await mask((c,x,y)=>c===3&&((x>380&&x<580&&y>140&&y<320)||(y>660&&x>150&&x<480)),1.6),4),100),
 beak: await trace(await mask((c,x,y)=>x<760&&c===4)),
 eye: await trace(await mask((c,x,y)=>c===5&&x>440&&x<530&&y>190&&y<270),20),
 word: await trace(await mask((c,x,y)=>x>=760&&y<470&&c===1)),
};
// clean arcs (center/radius estimated from flyer)
const cx=380, cy=335;
const arc=(r,a0,a1)=>{const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)].map(v=>v.toFixed(1)).join(' ');const large=(a1-a0)>180?1:0;return `M${p(a0)} A${r} ${r} 0 ${large} 1 ${p(a1)}`;};
P.arcGreyL=arc(330,140,239); P.arcYellowL=arc(262,148,253); P.arcGreyR=arc(352,24,72); P.arcYellowR=arc(287,25,64);
fs.writeFileSync('scripts/brand/paths.json',JSON.stringify(P));
const C={dark:'#1F5A35',light:'#7DB943',yellow:'#F4C430',red:'#E0473E',grey:'#5E5850'};
const markInner=`<g fill="none" stroke-width="46"><path d="${P.arcGreyL}" stroke="${C.grey}"/><path d="${P.arcYellowL}" stroke="${C.yellow}"/><path d="${P.arcGreyR}" stroke="${C.grey}"/><path d="${P.arcYellowR}" stroke="${C.yellow}"/></g><path d="${P.body}" fill="${C.light}"/><path d="${P.wing}" fill="${C.dark}"/><path d="${P.yellow}" fill="${C.yellow}"/><path d="${P.beak}" fill="${C.red}"/><path d="${P.eye}" fill="${C.grey}"/>`;
fs.mkdirSync('public/brand',{recursive:true});
fs.writeFileSync('public/brand/kahani-mark.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 0 740 824">${markInner}</svg>`);
fs.writeFileSync('public/brand/kahani-logo.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 0 1960 824">${markInner}<path d="${P.word}" fill="${C.dark}"/><path d="M800 486 Q1380 500 1970 492" stroke="${C.grey}" stroke-width="10" stroke-linecap="round" fill="none"/><text x="768" y="632" font-family="Trebuchet MS, Segoe UI, sans-serif" font-size="96" fill="#4A4038">Child Development Centre</text></svg>`);


console.log(Object.fromEntries(Object.entries(P).map(([k,v])=>[k,v.length])));
// Emit the TypeScript module used by the site
let ts = '// Vector paths traced from the supplied Kahani flyer (see docs/ASSET_REQUIREMENTS.md).\n// Coordinate space: 2020 x 824. Mark occupies x 20–760, wordmark x 760–1960.\n';
for (const [k, v] of Object.entries(P)) ts += `export const ${k} =\n  ${JSON.stringify(v)};\n`;
fs.writeFileSync('src/components/brand/logo-paths.ts', ts);
