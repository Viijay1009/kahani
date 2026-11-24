# Asset requirements

## What the site uses today

| File | Source | Used in |
|---|---|---|
| `public/brand/kahani-logo.svg`, `public/brand/kahani-mark.svg` | Vector trace of the supplied Speech Therapy Services flyer (`scripts/brand/trace-logo.mjs`) | Header, footer, hero, favicon |
| `src/components/brand/logo-paths.ts` | Same trace, as path data for inline/animated use | Logo, 3D particle scene |
| `public/img/opening-day.webp` | Supplied photo (woman with bouquet at the Kahani sign) | Team section, gallery |
| `public/img/reception-wall.webp` | Crop of the same photo: the Kahani wall sign only | Gallery |
| `public/img/opening-flowers.webp` | Crop of the same photo: balloons and reception desk flowers | Gallery |
| `public/img/kahani-parrot.png` | Rendered from the vector mark (512px, transparent) | Structured data logo |
| `public/img/og-kahani.jpg` | Logo on cream, 1200 × 630 | Open Graph / social previews |
| `src/app/icon.png`, `src/app/apple-icon.png` | Rendered from the vector mark | Favicons |

### About the logo
The logo was traced from the flyer, so it is close to the original but not the master artwork. The arcs were redrawn as clean geometric arcs, as they appear on the centre's wall sign. The "Child Development Centre" descriptor is set as live text.
**Action:** please send the original logo file (AI, SVG, EPS or a high-resolution PNG) and we will swap it in. Keep the path names in `logo-paths.ts`, or replace `kahani-logo.svg` and `kahani-mark.svg`.

## Photos we still need

There are no authentic photos yet of the therapy rooms, materials or sessions. The site is designed to work without them: illustrations and the parrot carry those sections. As real photos arrive, add them to `src/data/gallery.ts` and they will appear in the gallery layout.

Rules:
- Use real Kahani photos wherever possible.
- **No identifiable child appears without written parental consent.** Hands-only and over-the-shoulder shots are often the best choice.
- Never present a generated image as the real centre, staff or clients.
- Export as WebP at the sizes below. Next.js serves AVIF/WebP at responsive sizes automatically.

| Filename | Size | Purpose | Notes |
|---|---|---|---|
| `clinic-interior.webp` | 1400 × 1000 | Clinic environment | Real photo preferred |
| `therapy-materials.webp` | 1200 × 900 | Learning resources, picture cards, toys | Real photo, no children needed |
| `therapist-child.webp` | 1200 × 900 | Therapy interaction | Real, with consent; hands-only works well |
| `speech-therapy.webp` | 1200 × 900 | Speech therapy page | Real preferred |
| `play-therapy.webp` | 1200 × 900 | Play-based learning | Real preferred |
| `parent-guidance.webp` | 1200 × 900 | Parent guidance section | Real preferred |
| `team-photo.webp` | 1600 × 1000 | Team page | Real only |
| `hero-child.webp` | 1920 × 1200 | Optional hero image | Not used. The animated parrot is the hero |
| `story-illustration.webp` | 1400 × 1000 | Optional philosophy illustration | Not used. Typography carries this section |

### Prompts, only if generated placeholders are approved
Generated images must be labelled internally as illustrative and never captioned as Kahani's centre or people.

- **hero-child.webp:** "Premium editorial lifestyle photograph for an Indian child development centre website. A young Indian child engaged in a joyful creative learning activity in a beautifully designed, warm, natural therapy environment. Soft daylight, natural wooden furniture, muted forest green and warm cream surroundings, candid expression, authentic documentary photography, sophisticated composition, cinematic depth of field. Leave generous negative space on the left for website typography. No text, no logos, no watermark."
- **speech-therapy.webp:** "Authentic editorial photograph of a qualified speech-language therapist engaging in a playful communication activity with a young Indian child in a warm, professional child development centre. Colourful educational picture cards, natural interaction, calm welcoming room, documentary photography, warm daylight, no staged medical procedures, no text, no watermark."
- **play-therapy.webp:** "Beautiful documentary-style photograph of a young Indian child exploring educational toys, puzzles, and creative learning materials in a welcoming developmental learning environment. Warm neutral interior, natural lighting, child-centred atmosphere, candid photography."
- **parent-guidance.webp:** "Warm professional photograph of an Indian parent and child development professional having a supportive conversation in a comfortable consultation space. Natural expressions, welcoming atmosphere, elegant neutral interiors, premium editorial photography."
- **kahani-hero.mp4 (optional):** "Soft cinematic editorial video of a warm, welcoming child development environment. A child exploring colourful educational toys and creative activities, natural sunlight entering through windows, gentle movement, organic green botanical elements, calming cream and forest green colour palette, premium documentary aesthetic. Slow camera movement, uncluttered composition, no text, no logo, no watermark." The site doesn't need it: the particle parrot is the hero moment.

## Regenerating brand assets
```
node scripts/brand/trace-logo.mjs   # re-trace logo paths from design/source/flyer.jpg
node scripts/brand/photos.mjs       # re-crop photos, rebuild OG image and favicons
```
The trace script rewrites `src/components/brand/logo-paths.ts` directly.
