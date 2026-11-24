import { ADDRESS_LINES, CONTACT } from "@/lib/constants";

// Answers are factual and editable. They must not diagnose or promise outcomes.
export const FAQS = [
  {
    q: "What is a child development centre?",
    a: "A child development centre supports children whose development, such as speech, language or communication, needs some extra help. At Kahani, our focus is speech, language and communication therapy for children, with parents closely involved.",
  },
  {
    q: "When should I consider speech therapy for my child?",
    a: "If you have a concern about how your child talks, understands, plays or connects with others, it is worth asking. You don't need a referral or a diagnosis to contact us. A conversation with a speech-language therapist can help you decide whether an assessment is right for your child.",
  },
  {
    q: "How can I book an appointment?",
    a: `Call or WhatsApp us on ${CONTACT.phoneDisplay}, email ${CONTACT.email}, or send an enquiry through the form on our contact page. We'll get back to you to find a suitable time.`,
  },
  {
    q: "What happens during the first consultation?",
    a: "The first visit is a chance to understand your child. We talk with you about your concerns and your child's history, observe and play with your child, and explain what we see. If therapy is recommended, we discuss a plan with you.",
  },
  {
    q: "Are therapy plans individualised?",
    a: "Yes. Every child has their own story, so every plan is built around your child's strengths, needs and interests, and reviewed as they grow.",
  },
  {
    q: "Can parents participate in therapy?",
    a: "Yes, and we encourage it. Parent guidance and counselling are part of our approach. We share what we're working on and simple ways to support your child at home.",
  },
  {
    q: "Where is Kahani located?",
    a: `We are at ${ADDRESS_LINES.join(", ")}.`,
  },
] as const;
