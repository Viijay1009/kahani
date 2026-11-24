// Team profiles. Only publish what the client has confirmed or has itself published.
//
// The first profile is taken from Kahani's own public Instagram post
// (instagram.com/p/DXqvpXciTjB, 28 April). The client should still confirm it.
// See docs/CONTENT_REQUIREMENTS.md.

export type TeamMember = {
  name: string;
  role: string;
  qualification?: string;
  certifications?: string[];
  bio: string[];
  /** Path under /public. Leave undefined to show the monogram. */
  photo?: string;
  photoAlt?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Sneha Shibu Malayil",
    role: "Speech and Language Therapist",
    qualification: "BASLP (Bachelor of Audiology and Speech-Language Pathology)",
    certifications: [
      "PROMPT, Level 1",
      "Oral Placement Therapy, Levels 1 and 2",
      "Gestalt Language Processing",
      "Comprehensive Sensory Motor Intervention (COSMI)",
      "Applied Sensory Integration",
    ],
    bio: [
      "Sneha began her BASLP studies in 2018 and has spent the years since working with children and families on speech, language and communication.",
      "She believes every child has a different story to tell, and builds an individualised plan for each child she works with.",
    ],
  },
];
