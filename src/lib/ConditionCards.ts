import { Card, CardType, Tag } from "./types";
import { getHandInfo, hasCardWithTypeAndTag } from "./utils";

export const Condition: Card[] = [
  {
    name: "Assembled",
    type: CardType.CONDITION,
    basePower: 0,
    tags: [],
    cardText: "+4 for each HERO",
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);

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
    tags: [Tag.STRENGTH, Tag.GAMMA],
    cardText:
      "Choose a HERO or ALLY. -3 for each other HERO or ALLY and each URBAN",
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);

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
    tags: [Tag.AGILITY],
    cardText: "Blanked if there is more than one HERO in your hand",
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);

      const heroCount = handInfo.types[CardType.HERO] || 0;

      return heroCount > 1 ? false : true;
    },
  },
  {
    name: "Secret Identity",
    type: CardType.CONDITION,
    basePower: 8,
    tags: [Tag.INTEL],
    cardText: "Blanked unless with a HERO and a LOCATION with URBAN",
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);

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
    tags: [Tag.WORTHY],
    cardText: "Blanked unless with a VILLAIN with Power greater than 12",
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
