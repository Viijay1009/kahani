import Image from "next/image";
import { ParrotMark } from "@/components/brand/Logo";
import { MaskReveal, ScrollReveal } from "@/components/animations/ScrollReveal";

const PHOTOS = [
  { src: "/media/pretend-salad.webp", alt: "Small hands holding a toy plate of pretend vegetables and a cup during pretend play", caption: "Pretend play: a veg salad" },
  { src: "/media/animal-stickers.webp", alt: "Animal, fruit and vegetable picture cards spread across a table", caption: "Our afternoon looks like this" },
  { src: "/media/home-practice-book.webp", alt: "A practice book with what, where and who questions for home practice", caption: "Books for home practice" },
];

/** Kahani's own line from the flyer, beside real photos from the centre. */
export function InsideKahani() {
  return (
    <section aria-labelledby="inside-title" className="bg-paper px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[80rem] gap-6 lg:grid-cols-12">
        <ScrollReveal className="flex flex-col justify-between rounded-[2rem] bg-sprout p-8 md:p-10 lg:col-span-4">
          <div>
            <svg data-reveal viewBox="0 0 48 36" aria-hidden className="w-12 text-leaf">
              <path d="M0 36V20C0 8 6 1 18 0v8c-6 1-9 5-9 11h9v17H0Zm30 0V20c0-12 6-19 18-20v8c-6 1-9 5-9 11h9v17H30Z" fill="currentColor" />
            </svg>
            <h2 id="inside-title" data-reveal className="mt-6 text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] leading-tight text-deep">
              At Kahani, every child’s voice matters.
            </h2>
            <p data-reveal className="mt-4 text-ink/75">
              Let’s build their story, one word at a time: with play, patience, and families right beside us.
            </p>
          </div>
          <div data-reveal className="mt-8 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-paper">
              <ParrotMark className="w-8" />
            </span>
            <span>
              <span className="block font-bold text-deep">The Kahani team</span>
              <span className="block text-[0.92rem] text-ink/65">BTM 2nd Stage, Bengaluru</span>
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-3 md:gap-6 lg:col-span-8">
          {PHOTOS.map((p) => (
            <figure key={p.src}>
              <MaskReveal className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 22vw, 33vw" className="object-cover" />
              </MaskReveal>
              <figcaption className="mt-3 font-hand text-[0.95rem] text-bark md:text-lg">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
