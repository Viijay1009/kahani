# SEO checklist

## Implemented
- [x] Unique `<title>` and meta description on every page (`pageMetadata()` in `src/lib/seo.ts`)
- [x] Home title: "Kahani Child Development Centre | Speech Therapy in BTM, Bangalore"
- [x] Canonical URLs on every page, resolved against `NEXT_PUBLIC_SITE_URL`, or Vercel's production URL when that isn't set
- [x] Open Graph and Twitter/X card metadata, with a 1200 × 630 image
- [x] `sitemap.xml` (17 public URLs) and `robots.txt`
- [x] Unconfirmed service pages are `noindex` and left out of the sitemap
- [x] JSON-LD `MedicalBusiness` with `medicalSpecialty: SpeechPathology`. It uses verified details only: name, address, phone, email, Instagram. Geo coordinates and opening hours are left out until confirmed.
- [x] JSON-LD `FAQPage` on the home and contact pages
- [x] JSON-LD `Service` on the speech therapy page and the 8 detail pages
- [x] JSON-LD `BreadcrumbList` and visible breadcrumbs on all inner pages
- [x] Semantic headings: one `h1` per page, and sections use `h2`/`h3`
- [x] Descriptive alt text on all photos. Decorative SVGs are `aria-hidden`.
- [x] Search-friendly URLs: `/services/speech-therapy/childhood-apraxia-of-speech`
- [x] Internal linking: services list → detail pages → related areas → contact
- [x] Google Maps embed and directions link
- [x] Static prerendering of every page, so the HTML is fully crawlable
- [x] Fonts self-hosted through `next/font`, with no layout shift
- [x] Images served as AVIF/WebP at responsive sizes, lazy-loaded below the fold
- [x] The 3D scene is lazy-loaded and never blocks content. The 2D logo is server-rendered.

## Keyword coverage (natural, not stuffed)
| Keyword | Where |
|---|---|
| Child Development Centre in Bangalore / BTM 2nd Stage | Home description, About title and lead, footer |
| Speech Therapy in Bangalore | Home title, services titles |
| Child Speech Therapist in BTM | Our Team title |
| Speech Therapy for Children in Bangalore | `/services/speech-therapy` title |
| Pediatric Speech Therapy Bangalore | `/services/speech-therapy` description |

## To do after launch
- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel once a custom domain is connected, then redeploy
- [ ] Add the site to Google Search Console and submit `/sitemap.xml`
- [ ] Link the website from the Google Business Profile, and keep name, address and phone identical
- [ ] Add opening hours (site and Business Profile) once confirmed
- [ ] Ask happy families for Google reviews. Do not publish testimonials on the site without written consent.
- [ ] Add the Instagram link to the Business Profile, and the website link to the Instagram bio
