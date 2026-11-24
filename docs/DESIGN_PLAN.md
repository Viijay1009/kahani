# Kahani — design plan

## Subject, audience, job
- **Subject:** a speech-language and child development centre in BTM 2nd Stage, Bengaluru. Its own line is *"Unfolding stories, word by word."*
- **Audience:** parents who are worried, hopeful, and short on time. Many will be reading on a phone.
- **Primary job:** help a parent see that their child's needs fit what Kahani does, then make contact by call, WhatsApp or an enquiry.

## Reference research (Keymer Childcare)
What works there: one continuous illustrated world inside an inset, rounded frame. A preloader with the brand mark. Young Serif / Fraunces display type over Figtree. Taped "photo" cards. Pill navigation. Contact by a mailto form.
What we don't take: the cartoon landscape, identical taped cards for every block, the colour-coded pill badges, and the full-screen preloader that delays content.

## The idea: *voice arcs* and *word by word*
The Kahani mark is a parrot inside broken concentric arcs, like sound travelling outward. That is our one signature device:
1. **Voice arcs.** Partial concentric rings in grey, marigold and leaf green. They frame the hero, show the hovered service, mark the Approach path and draw in the footer. Nothing else is decorative.
2. **Word by word.** Key statements reveal one word at a time as you scroll, which acts out the brand line.

## Tokens
| Token | Hex | Source / role |
|---|---|---|
| forest | `#1F5A35` | Wordmark green. Headings, primary buttons |
| deep | `#0F3622` | Footer ground, dark text on light green |
| leaf | `#7DB943` | Parrot body. Accents, arcs |
| sprout | `#E7F0DA` | Soft green ground for alternating chapters |
| marigold | `#F4C430` | Eye ring and arcs. Highlight, CTA hover |
| paper | `#FBF6EA` | Page ground (flyer paper) |
| sand | `#F1E5CF` | Secondary ground |
| bark | `#5E5850` | Logo arc grey. Secondary text, rules |
| ink | `#22281F` | Body text |
| beak | `#D8463B` | Used very sparingly: tiny markers only |

**Type**
- Display: **Fraunces** (variable; `SOFT` 100 and `WONK` 1 for a storybook softness), weights 400–600, with optical sizing.
- Body: **Nunito Sans**, 17–18px, line-height 1.6, measure ≤ 68ch.
- Hand: **Kalam** (Indian Type Foundry), used only for marginal notes, at most once per section.

**Scale (1.25, fluid):** 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 88 / 120 px at desktop, set with `clamp()`.

**Radii:** frame 40px, media 28px, controls are full pills, and inputs 14px. Hierarchy decides the radius, so it is not one value everywhere.

## Layout
- The whole page sits inside a paper **frame** with a 12–16px inset (from the reference), but every chapter has a different composition:
```
HERO        [handnote]
            Every child          ((( parrot )))   ← 3D particles assemble,
            has a story.           arcs draw        then the crisp 2D mark
               Let's help them
               tell it.          [body] [CTA][CTA]
PHILOSOPHY  giant serif statement revealed word by word, parrot perched on the last line
SERVICES    sticky illustrated "stage" on the left (arcs + icon change per item) | 8-row list on the right
APPROACH    pinned horizontal path; the parrot flies along a vine between 5 milestones
GLIMPSE     asymmetric photo journal: 1 tall, 2 stacked, notes in Kalam; lightbox
PEOPLE      large portrait + profile column (verified public info only)
PARENTS     forest-green chapter, two overlapping speech bubbles (parent + child)
FAQ         two columns: question index on the left, answers on the right (accordion on mobile)
CONTACT     address card left, form right, map below
FOOTER      deep green, arcs drawing in, large wordmark
```
- Alignment: content is left-aligned. Only the Philosophy statement is centred.

## Motion language (Emil Kowalski rules)
- One easing family: `cubic-bezier(.22,1,.36,1)` for entering and `cubic-bezier(.4,0,.2,1)` for state changes. Controls take 160–220ms. Reveals take 600–900ms.
- **One orchestrated moment:** the hero's parrot assembling, then the headline. Elsewhere motion is tied to scroll (word reveal, approach path) or to user action (hover, accordion, lightbox, menu).
- Only `transform`, `opacity` and `clip-path` are animated. Every GSAP context is reverted on unmount. With `prefers-reduced-motion`, scrubbed effects become static and the 3D scene becomes the SVG mark.

## Review against the generic defaults
- *Cream + serif + terracotta* → The brief requires cream and a serif. We dropped terracotta/coral as an accent and use the logo's own marigold and leaf instead. The beak red appears only as 6px markers.
- *Eyebrow labels on every heading* → Only the hero has a handwritten note. Section headings stand alone.
- *Numbered markers* → Used only in Approach, where the content really is a path.
- *Identical rounded cards* → Services is a list with a changing stage, the gallery is a journal, FAQ is an index. No card grids.
- *Arrow glyphs appended to buttons* → No. Buttons use the arc motif on hover.
