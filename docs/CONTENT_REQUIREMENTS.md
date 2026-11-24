# Content requirements: please confirm

Nothing on the site invents staff, qualifications, testimonials, outcomes or facilities. Below is what we used, where it came from, and what we need from Kahani.

## 1. Please confirm before or soon after launch

| Item | What the site shows now | Source | Action |
|---|---|---|---|
| **Email address** | `kahani.cdc@outlook.com` | Project brief | Kahani's Instagram post (28 April) shows **kahanicdc@gmail.com**. Which address should parents use? Edit `CONTACT.email` in `src/lib/constants.ts`. |
| **Team profile** | Sneha Shibu Malayil, Speech and Language Therapist, BASLP. Certified in PROMPT L1, Oral Placement Therapy L1 & 2, Gestalt Language Processing, COSMI, Applied Sensory Integration | Kahani's own public Instagram post | Confirm the wording and that she is happy for it to appear. Edit `src/data/team.ts`. |
| **Supplied photo** | Shown as "Opening day at Kahani" next to the team section, without naming the person | Supplied image | Tell us who is pictured and whether to label it. You can add `photo: "/img/…"` to a profile in `team.ts`. |
| **"How it works" steps** | First conversation, assessment, plan, sessions and home practice (`/services/speech-therapy`) | Our wording, based on the flyer's approach panel | Confirm this matches how Kahani actually works. |
| **FAQ answers** | 7 general answers (`src/data/faqs.ts`) | Our wording | Review. Nothing in them promises outcomes. |
| **Service descriptions** | 8 areas from the flyer, with general signs and support (`src/data/services.ts`) | Our wording, based on general clinical knowledge | Ask a clinician at Kahani to review. Each page says it is not a diagnosis. |

## 2. Services not yet published
- `/services/occupational-therapy` and `/services/child-development` exist as **clearly marked "being prepared" pages**. They are `noindex`, left out of the sitemap and not linked from the navigation.
- Kahani's Instagram bio lists **Speech · Language · Feeding · Communication**, and there are posts on food chaining. If **feeding therapy** is offered, we can add it as a ninth area of support.

## 3. Useful additions
- Opening hours. They are not shown anywhere, and we can add them to the contact section and structured data.
- Session fees or "please call for fees". Parents often ask.
- Languages spoken in sessions (for example English, Kannada, Hindi, Malayalam). This is useful for parents and for local SEO.
- More team profiles: name, role, qualification, short bio, photo.
- Real photos (see `ASSET_REQUIREMENTS.md`).
- An appointment form backend (see below).

## 4. Enquiry form
There is no backend yet, so the form **does not pretend to save anything**:
- By default, it opens WhatsApp (+91 81059 35183) with the parent's details pre-filled, and the parent presses send. A "Send by email instead" link does the same through email.
- To receive submissions directly, create a form endpoint that accepts JSON POSTs (for example Formspree, Basin or Web3Forms), then set this in Vercel:
  ```
  NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://formspree.io/f/xxxxxxx
  ```
  Redeploy, and the button becomes "Send enquiry" with a real success or error state.
- The form asks only for the child's **age**, never their name, and asks parents not to include medical records.
