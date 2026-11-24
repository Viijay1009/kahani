// Areas of support, as listed on Kahani's Speech Therapy Services flyer.
// Copy is general and educational. It must not promise outcomes or diagnose.
// Edit freely, but keep the slugs stable: they are public URLs.

export type ServiceIcon =
  | "speech-motor"
  | "apraxia"
  | "autism"
  | "attention"
  | "articulation"
  | "fluency"
  | "social"
  | "aac";

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIcon;
  short: string;
  intro: string[];
  signs: string[];
  support: string[];
  metaDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: "speech-motor-difficulties",
    title: "Speech Motor Difficulties",
    icon: "speech-motor",
    short:
      "Support for children who find it hard to coordinate the lips, tongue and jaw movements that speech needs.",
    intro: [
      "Speaking is one of the most complex movements a child learns. The lips, tongue, jaw and breath have to work together quickly and precisely. Some children find this coordination hard, even when they understand language well and know what they want to say.",
      "We look closely at how your child moves for speech and build sessions around the movements and sounds that matter most for them right now.",
    ],
    signs: [
      "Speech that is hard for others to understand",
      "Speaking seems to take a lot of effort",
      "A small range of sounds compared with other children of the same age",
      "Difficulty copying mouth movements or sounds",
    ],
    support: [
      "A careful assessment of speech movements and sound production",
      "Play-based practice that builds movement patterns step by step",
      "Simple activities you can use at home between sessions",
    ],
    metaDescription:
      "Speech motor therapy for children at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru. Individualised, play-based sessions with parent guidance.",
  },
  {
    slug: "childhood-apraxia-of-speech",
    title: "Childhood Apraxia of Speech",
    icon: "apraxia",
    short:
      "Help for children who know what they want to say but find it hard to plan the movements to say it.",
    intro: [
      "Childhood Apraxia of Speech (CAS) is a motor speech disorder. The child knows what they want to say, but the brain has difficulty planning and sequencing the movements needed to say it.",
      "CAS needs frequent, focused practice. We plan sessions around your child's own words and interests, so practice stays meaningful and fun.",
    ],
    signs: [
      "The same word sounds different each time it is said",
      "Visible effort or searching movements of the mouth when trying to speak",
      "Longer words and sentences are much harder than short ones",
      "The rhythm or stress of speech sounds unusual",
    ],
    support: [
      "Assessment to understand your child's speech planning and production",
      "Structured, repetitive practice built into games your child enjoys",
      "Guidance on how often to practise and how to support it at home",
    ],
    metaDescription:
      "Support for Childhood Apraxia of Speech (CAS) at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru. Individualised speech therapy for children.",
  },
  {
    slug: "autism-spectrum-disorders",
    title: "Autism Spectrum Disorders",
    icon: "autism",
    short:
      "Communication support that respects how your child experiences the world and builds on what they already do.",
    intro: [
      "Every autistic child communicates, though not always with spoken words. Our role is to understand how your child already connects, and to widen the ways they can share their needs, ideas and feelings.",
      "Sessions follow your child's interests and pace. Communication can include speech, gestures, pictures and AAC, and every one of these counts.",
    ],
    signs: [
      "Late or limited spoken language",
      "Repeating words or phrases (echolalia) as a way of communicating",
      "Finding back-and-forth interaction or shared play hard",
      "Communicating mostly through actions, such as leading an adult by the hand",
    ],
    support: [
      "Getting to know your child's strengths, interests and communication style",
      "Play-based sessions that build connection and shared attention",
      "Support with AAC where it helps your child express themselves",
      "Guidance for parents on everyday communication at home",
    ],
    metaDescription:
      "Speech and communication support for autistic children at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru. Child-led, play-based therapy.",
  },
  {
    slug: "adhd-attention-difficulties",
    title: "ADHD & Attention Difficulties",
    icon: "attention",
    short:
      "Support for listening, following instructions and the language skills that attention affects.",
    intro: [
      "Attention plays a big part in how children listen, understand and use language. Children with ADHD or attention difficulties may find it hard to follow instructions, wait for a turn, or organise what they want to say.",
      "We work on the communication side of attention: listening, understanding, turn-taking and telling a story in order. Sessions are short, active and structured so your child can do their best.",
    ],
    signs: [
      "Difficulty following instructions with more than one step",
      "Interrupting, or finding it hard to wait for a turn in conversation",
      "Losing track when telling a story or explaining something",
      "Missing parts of what was said",
    ],
    support: [
      "Activities that build listening and understanding",
      "Visual supports and routines that make instructions easier to follow",
      "Practical strategies for home and school",
    ],
    metaDescription:
      "Language and listening support for children with ADHD and attention difficulties at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru.",
  },
  {
    slug: "articulation-pronunciation",
    title: "Articulation & Pronunciation Issues",
    icon: "articulation",
    short:
      "Help for children who find particular speech sounds hard to say clearly.",
    intro: [
      "Children learn speech sounds gradually, and some sounds come later than others. When certain sounds stay difficult beyond the expected age, or speech is hard to understand, focused support can help.",
      "We find out which sounds are tricky and why, then practise them through games, stories and everyday words that matter to your child.",
    ],
    signs: [
      "Swapping one sound for another, such as “tat” for “cat”",
      "Leaving sounds out of words",
      "Speech that family understands but others find hard to follow",
      "Frustration when not understood",
    ],
    support: [
      "A speech sound assessment",
      "Playful, step-by-step practice from single sounds to conversation",
      "Short home activities to practise between sessions",
    ],
    metaDescription:
      "Articulation and pronunciation therapy for children at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru. Speech sound support through play.",
  },
  {
    slug: "stammering-fluency",
    title: "Stammering / Fluency Disorders",
    icon: "fluency",
    short:
      "Calm, supportive help for children who stammer, and for the families around them.",
    intro: [
      "Stammering (also called stuttering) affects the flow of speech. A child may repeat sounds or words, stretch sounds, or get stuck before a word comes out. It is common in young children and can come and go.",
      "We help children and families feel more relaxed about talking, and we tailor support to your child's age and needs. Parents play a central part.",
    ],
    signs: [
      "Repeating sounds, syllables or words, such as “b-b-ball”",
      "Stretching sounds, such as “sssssun”",
      "Getting stuck with no sound coming out",
      "Avoiding talking, or tension when trying to speak",
    ],
    support: [
      "Assessment of your child's speech fluency and how they feel about talking",
      "Age-appropriate therapy approaches",
      "Guidance for parents on creating easy, unhurried conversations at home",
    ],
    metaDescription:
      "Support for children who stammer at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru. Fluency therapy with parent guidance.",
  },
  {
    slug: "social-communication-skills",
    title: "Social Communication Skills",
    icon: "social",
    short:
      "Building the skills of connecting with others: taking turns, sharing attention and conversation.",
    intro: [
      "Social communication is how we use language with other people: starting a conversation, taking turns, understanding gestures and facial expressions, and playing together.",
      "We build these skills through play and real-life situations, at a pace that feels comfortable for your child.",
    ],
    signs: [
      "Finding it hard to start or keep up a conversation",
      "Difficulty taking turns in play or talk",
      "Not yet using gestures such as pointing or waving",
      "Finding it hard to join in with other children",
    ],
    support: [
      "Play-based sessions focused on connection and turn-taking",
      "Practice in everyday situations that matter to your child",
      "Ideas for parents to build social communication into daily routines",
    ],
    metaDescription:
      "Social communication skills support for children at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru. Play-based, individualised therapy.",
  },
  {
    slug: "aac-communication-support",
    title: "AAC Communication Support",
    icon: "aac",
    short:
      "Pictures, signs, boards and devices that give children another way to be heard.",
    intro: [
      "Augmentative and Alternative Communication (AAC) means any way of communicating beyond speech: gestures, signs, pictures, communication boards or speech-generating devices.",
      "AAC can give a child a voice while speech develops, or alongside it. Using AAC does not stop a child from learning to talk. We help you choose, set up and use AAC in everyday life.",
    ],
    signs: [
      "Your child has limited or no spoken words",
      "Frustration from not being able to get a message across",
      "Speech that is very hard for others to understand",
      "Your child already points, leads or uses pictures to communicate",
    ],
    support: [
      "Assessment to find AAC options that suit your child",
      "Teaching your child, and you, how to use AAC in play and routines",
      "Ongoing review as your child's communication grows",
    ],
    metaDescription:
      "AAC (Augmentative and Alternative Communication) support for children at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru.",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

// The five principles from the flyer's "Our Approach" panel.
export const APPROACH = [
  {
    title: "Individualised Therapy Plans",
    body: "Every plan starts with your child: their strengths, their challenges and what matters to your family. No two plans are the same.",
    note: "made for one child",
  },
  {
    title: "Play-Based & Child-Friendly Sessions",
    body: "Children learn best when they are having fun. Sessions are built around play, stories and activities your child enjoys.",
    note: "learning through play",
  },
  {
    title: "Evidence-Based Techniques",
    body: "We use therapy approaches grounded in research and clinical practice, and we adapt them to your child.",
    note: "grounded in research",
  },
  {
    title: "Parent Guidance & Counselling",
    body: "You know your child best. We explain what we are working on and share simple ways to support communication at home.",
    note: "you are part of it",
  },
  {
    title: "Safe & Nurturing Environment",
    body: "A calm, welcoming space where children feel comfortable enough to try, and parents feel heard.",
    note: "a calm place to grow",
  },
] as const;
