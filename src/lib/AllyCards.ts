import { Card, CardType, Tag } from "./types";
import { getHandInfo } from "./utils";

export const Allies: Card[] = [
  {
    name: "Dora Milaje",
    type: CardType.ALLY,
    basePower: 6,
    tags: [Tag.INTEL, Tag.AGILITY, Tag.WAKANDA],
    cardText: "",
  },
  {
    name: "Forge",
    type: CardType.ALLY,
    basePower: 4,
    tags: [Tag.TECH, Tag.MUTANT],
    cardText: "+4 for each EQUIPMENT",
    bonusPower: (cards: Card[]) => {
      const types = getHandInfo(cards).types;

      return [
        {
          points: (types[CardType.EQUIPMENT] || 0) * 4,
          reason: `+4 for each equipment (${types[CardType.EQUIPMENT] || 0}).`,
        },
      ];
    },
    conditionalTags: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return names.includes("Hack In") ? [Tag.INTEL] : [];
    },
  },
  {
    name: "Heimdall",
    type: CardType.ALLY,
    basePower: 4,
    tags: [Tag.INTEL, Tag.ASGARD],
    cardText: "+6 with Bifrost",
    bonusPower: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return [
        {
          points: names.includes("Bifrost") ? 6 : 0,
          reason: names.includes("Bifrost")
            ? "Bifrost in hand."
            : "Bifrost Missing.",
        },
      ];
    },
  },
  {
    name: "Hulk Operations",
    type: CardType.ALLY,
    basePower: 4,
    tags: [Tag.TECH, Tag.RANGE, Tag.GAMMA],
    cardText: "",
    conditionalTags: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return names.includes("Hack In") ? [Tag.INTEL] : [];
    },
  },
  {
    name: "Jane Foster",
    type: CardType.ALLY,
    basePower: 5,
    tags: [Tag.TECH, Tag.WORTHY],
    cardText: "+8 with THOR ODINSON or GOD OF THUNDER",
    bonusPower: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return [
        {
          points: names.includes("Thor Odinson / God of Thunder") ? 8 : 0,
          reason: names.includes("Thor Odinson / God of Thunder")
            ? "Thor or God of Thunder in hand"
            : "Thor or God of Thunder not in hand",
        },
      ];
    },
    conditionalTags: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return names.includes("Hack In") ? [Tag.INTEL] : [];
    },
  },
  {
    name: "Lockheed",
    type: CardType.ALLY,
    basePower: 5,
    tags: [Tag.FLIGHT, Tag.RANGE],
    cardText: "+7 with SHADOWCAT",
    bonusPower: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return [
        {
          points: names.includes("Shadowcat") ? 7 : 0,
          reason: names.includes("Shadowcat")
            ? "Shadowcat in hand"
            : "Shadowcat Missing",
        },
      ];
    },
  },
  {
    name: "Moira MacTaggert",
    type: CardType.ALLY,
    basePower: 3,
    tags: [Tag.TECH, Tag.INTEL],
    cardText: "One HERO with MUTANT may count one tag twice",
  },
];
