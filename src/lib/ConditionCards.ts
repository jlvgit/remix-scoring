import { Card, CardType, Tag } from "./types";
import { getHandInfo, hasCardWithTypeAndTag } from "./utils";

export const Condition: Card[] = [
  {
    name: "Assembled",
    type: CardType.CONDITION,
    basePower: 0,
    cardText: "+4 for each HERO",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo();

      const heroCount = handInfo.types[CardType.HERO] || 0;

      return [
        {
          points: heroCount * 4,
          reason: `+4 for each HERO (${heroCount})`,
        },
      ];
    },
  },
  {
    name: "Berserk",
    type: CardType.CONDITION,
    basePower: 18,
    cardText:
      "Choose a HERO or ALLY. -3 for each other HERO or ALLY and each URBAN",
    tags: {
      base: [Tag.STRENGTH, Tag.GAMMA],
      bonus: [],
      combined: [Tag.STRENGTH, Tag.GAMMA],
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo();

      const heroCount = handInfo.types[CardType.HERO] || 0;
      const allyCount = handInfo.types[CardType.ALLY] || 0;
      const urbanCount = handInfo.tags[Tag.URBAN] || 0;

      return [
        {
          points:
            heroCount + allyCount > 1 ? (heroCount + allyCount - 1) * -3 : 0,
          reason: `-3 for each other HERO (${heroCount}) or ALLY (${allyCount}).`,
        },
        {
          points: urbanCount * -3,
          reason: `-3 each URBAN location (${urbanCount}).`,
        },
      ];
    },
  },
  {
    name: "Fearless",
    type: CardType.CONDITION,
    basePower: 16,
    cardText: "Blanked if there is more than one HERO in your hand",
    tags: {
      base: [Tag.AGILITY],
      bonus: [],
      combined: [Tag.AGILITY],
    },
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo();

      const heroCount = handInfo.types[CardType.HERO] || 0;

      return heroCount > 1 ? false : true;
    },
  },
  {
    name: "Secret Identity",
    type: CardType.CONDITION,
    basePower: 8,
    cardText: "Blanked unless with a HERO and a LOCATION with URBAN",
    tags: {
      base: [Tag.INTEL],
      bonus: [],
      combined: [Tag.INTEL],
    },
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo();

      const heroCount = handInfo.types[CardType.HERO] || 0;
      const hasUrbanLocation = hasCardWithTypeAndTag(
        cards,
        CardType.LOCATION,
        Tag.URBAN
      );

      return heroCount > 0 && hasUrbanLocation ? false : true;
    },
  },
  {
    name: "Worthy",
    type: CardType.CONDITION,
    basePower: 11,
    cardText: "Blanked unless with a VILLAIN with Power greater than 12",
    tags: {
      base: [Tag.WORTHY],
      bonus: [],
      combined: [Tag.WORTHY],
    },
    blanked: (cards: Card[]) => {
      const twelvePowerVillains = cards.filter((card) => {
        if (card.type == CardType.VILLAIN && card.basePower > 12) {
          return card;
        }
      });

      return twelvePowerVillains.length > 0 ? false : true;
    },
  },
];
