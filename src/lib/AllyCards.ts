import { Card, CardType, Tag } from "./types";
import { getHandInfo } from "./utils";

export const Allies: Card[] = [
  {
    name: "Dora Milaje",
    type: CardType.ALLY,
    basePower: 6,
    cardText: "",
    tags: {
      base: [Tag.INTEL, Tag.AGILITY, Tag.WAKANDA],
      bonus: [],
      combined: [Tag.INTEL, Tag.AGILITY, Tag.WAKANDA],
    },
  },
  {
    name: "Forge",
    type: CardType.ALLY,
    basePower: 4,
    cardText: "+4 for each EQUIPMENT",
    tags: {
      base: [Tag.TECH, Tag.MUTANT],
      bonus: [],
      combined: [Tag.TECH, Tag.MUTANT],
      conditional: (cards: Card[]) => {
        const names = getHandInfo(cards).names;

        return names.includes("Hack In")
          ? [Tag.TECH, Tag.MUTANT, Tag.INTEL]
          : [Tag.TECH, Tag.MUTANT];
      },
    },
    bonusPower: (cards: Card[]) => {
      const types = getHandInfo(cards).types;

      return [
        {
          points: (types[CardType.EQUIPMENT] || 0) * 4,
          reason: `+4 for each equipment (${types[CardType.EQUIPMENT] || 0}).`,
        },
      ];
    },
  },
  {
    name: "Heimdall",
    type: CardType.ALLY,
    basePower: 4,
    cardText: "+6 with Bifrost",
    tags: {
      base: [Tag.INTEL, Tag.ASGARD],
      bonus: [],
      combined: [Tag.INTEL, Tag.ASGARD],
    },
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
    cardText: "",
    tags: {
      base: [Tag.TECH, Tag.RANGE, Tag.GAMMA],
      bonus: [],
      combined: [Tag.TECH, Tag.RANGE, Tag.GAMMA],
      conditional: (cards: Card[]) => {
        const names = getHandInfo(cards).names;

        return names.includes("Hack In")
          ? [Tag.TECH, Tag.RANGE, Tag.GAMMA, Tag.INTEL]
          : [Tag.TECH, Tag.RANGE, Tag.GAMMA];
      },
    },
  },
  {
    name: "Jane Foster",
    type: CardType.ALLY,
    basePower: 5,
    cardText: "+8 with THOR ODINSON or GOD OF THUNDER",
    tags: {
      base: [Tag.TECH, Tag.WORTHY],
      bonus: [],
      combined: [Tag.TECH, Tag.WORTHY],
      conditional: (cards: Card[]) => {
        const names = getHandInfo(cards).names;

        return names.includes("Hack In")
          ? [Tag.TECH, Tag.WORTHY, Tag.INTEL]
          : [Tag.TECH, Tag.WORTHY];
      },
    },
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
  },
  {
    name: "Lockheed",
    type: CardType.ALLY,
    basePower: 5,
    cardText: "+7 with SHADOWCAT",
    tags: {
      base: [Tag.FLIGHT, Tag.RANGE],
      bonus: [],
      combined: [Tag.FLIGHT, Tag.RANGE],
    },
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
    cardText: "One HERO with MUTANT may count one tag twice",
    tags: {
      base: [Tag.TECH, Tag.INTEL],
      bonus: [],
      combined: [Tag.TECH, Tag.INTEL],
      conditional: (cards: Card[]) => {
        const names = getHandInfo(cards).names;

        return names.includes("Hack In")
          ? [Tag.TECH, Tag.INTEL, Tag.INTEL]
          : [Tag.TECH, Tag.INTEL];
      },
    },
  },
];
