// Real Kahani photographs only. Add new photos here once the client supplies them
// (with consent for any identifiable child). See docs/ASSET_REQUIREMENTS.md.

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const PHOTOS: Photo[] = [
  {
    src: "/img/reception-wall.webp",
    alt: "The green Kahani wordmark and parrot logo mounted on the cream wall at the centre",
    caption: "Our sign at the centre in BTM 2nd Stage",
    width: 930,
    height: 480,
  },
  {
    src: "/img/opening-day.webp",
    alt: "A smiling woman in glasses holding a bouquet of yellow flowers in front of the Kahani sign, with yellow balloons behind her",
    caption: "Opening day at Kahani",
    width: 1080,
    height: 1440,
  },
  {
    src: "/img/opening-flowers.webp",
    alt: "Yellow chrysanthemums and balloons beside the green reception desk, decorated with orange and peach flowers",
    caption: "Flowers and balloons at the reception desk",
    width: 520,
    height: 640,
  },
];
