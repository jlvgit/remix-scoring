import { Card, CardType, Tag } from "./types";
import {
  getHandInfo,
  getOtherCardsWithTag,
  getOtherCardsWithType,
  hasCardWithTypeAndTag,
} from "./utils";

export const Heroes: Card[] = [
  {
    name: "Angel",
    type: CardType.HERO,
    basePower: 6,
    cardText: "",
    tags: {
      base: [Tag.AGILITY, Tag.FLIGHT, Tag.MUTANT],
      bonus: [],
      combined: [Tag.AGILITY, Tag.FLIGHT, Tag.MUTANT],
    },
  },
  {
    name: "Beast",
    type: CardType.HERO,
    basePower: 6,
    cardText: "",
    tags: {
      base: [Tag.TECH, Tag.AGILITY, Tag.MUTANT],
      bonus: [],
      combined: [Tag.TECH, Tag.AGILITY, Tag.MUTANT],
    },
  },
  {
    name: "Black Panther",
    type: CardType.HERO,
    basePower: 4,
    cardText: "+5 for each other WAKANDA",
    tags: {
      base: [Tag.AGILITY, Tag.WAKANDA],
      bonus: [],
      combined: [Tag.AGILITY, Tag.WAKANDA],
    },
    bonusPower: (cards: Card[]) => {
      const otherWakanda = getOtherCardsWithTag(
        cards,
        Tag.WAKANDA,
        "Black Panther"
      );

      return [
        {
          points: otherWakanda.length * 5,
          reason: `+5 for each other WAKANDA (${otherWakanda.length})`,
        },
      ];
    },
  },
  {
    name: "Black Widow",
    type: CardType.HERO,
    basePower: 6,
    cardText: "",
    tags: {
      base: [Tag.INTEL, Tag.AGILITY, Tag.AGILITY],
      bonus: [],
      combined: [Tag.INTEL, Tag.AGILITY, Tag.AGILITY],
    },
  },
  {
    name: "Bruce Banner / Hulk",
    type: CardType.HERO,
    basePower: 1,
    cardText: "Transform with any other GAMMA",
    tags: {
      base: [Tag.TECH, Tag.GAMMA],
      bonus: [],
      combined: [Tag.GAMMA],
      conditional: (cards: Card[]) => {
        const otherGammas = getOtherCardsWithTag(
          cards,
          Tag.GAMMA,
          "Bruce Banner / Hulk"
        );

        if (otherGammas.length > 0) {
          return [Tag.GAMMA, Tag.STRENGTH, Tag.STRENGTH, Tag.STRENGTH];
        } else {
          return [Tag.TECH, Tag.GAMMA];
        }
      },
    },
    bonusPower: (cards: Card[]) => {
      const otherGammas = getOtherCardsWithTag(
        cards,
        Tag.GAMMA,
        "Bruce Banner / Hulk"
      );

      return [
        {
          points: otherGammas.length > 0 ? 18 : 0,
          reason:
            otherGammas.length > 0
              ? "Transformed in to Hulk with another GAMMA."
              : "Not transformed. Still puny Banner.",
        },
      ];
    },
  },
  {
    name: "Captain America",
    type: CardType.HERO,
    basePower: 2,
    cardText: "+2 for each other HERO, +4 with VIBRANIUM SHIELD",
    tags: {
      base: [Tag.AGILITY, Tag.WORTHY],
      bonus: [],
      combined: [Tag.AGILITY, Tag.WORTHY],
    },
    bonusPower: (cards: Card[]) => {
      const otherHeroes = getOtherCardsWithType(
        cards,
        CardType.HERO,
        "Captain America"
      );
      const otherHeroesCount = otherHeroes.length;

      const hasVibraniumShield = cards.some(
        (card) => card.name === "Vibranium Shield"
      );
      return [
        {
          points: otherHeroesCount * 2,
          reason: `+2 for each other HERO (${otherHeroesCount})`,
        },
        {
          points: hasVibraniumShield ? 4 : 0,
          reason: hasVibraniumShield
            ? "+4 with Vibranium Shield."
            : "No Vibranium Shield in hand.",
        },
      ];
    },
  },
  {
    name: "Colossus",
    type: CardType.HERO,
    basePower: 6,
    cardText: "",
    tags: {
      base: [Tag.STRENGTH, Tag.STRENGTH, Tag.MUTANT],
      bonus: [],
      combined: [Tag.STRENGTH, Tag.STRENGTH, Tag.MUTANT],
    },
  },
  {
    name: "Cyclops",
    type: CardType.HERO,
    basePower: 4,
    cardText: "+3 for each other MUTANT",
    tags: {
      base: [Tag.RANGE, Tag.MUTANT],
      bonus: [],
      combined: [Tag.RANGE, Tag.MUTANT],
    },
    bonusPower: (cards: Card[]) => {
      const otherMutants = getOtherCardsWithTag(cards, Tag.MUTANT, "Cyclops");
      return [
        {
          points: otherMutants.length * 3,
          reason: `+3 for each other MUTANT (${otherMutants.length})`,
        },
      ];
    },
  },
  {
    name: "Falcon",
    type: CardType.HERO,
    basePower: 6,
    cardText: "",
    tags: {
      base: [Tag.TECH, Tag.FLIGHT, Tag.RANGE],
      bonus: [],
      combined: [Tag.TECH, Tag.FLIGHT, Tag.RANGE],
    },
  },
  {
    name: "Hawkeye",
    type: CardType.HERO,
    basePower: 5,
    cardText: "",
    tags: {
      base: [Tag.TECH, Tag.RANGE, Tag.RANGE],
      bonus: [],
      combined: [Tag.TECH, Tag.RANGE, Tag.RANGE],
    },
  },
  {
    name: "Professor X",
    type: CardType.HERO,
    basePower: 3,
    cardText: "+6 for each of CEREBRO or XAVIER MANSION",
    tags: {
      base: [Tag.INTEL, Tag.MUTANT],
      bonus: [],
      combined: [Tag.INTEL, Tag.MUTANT],
    },
    bonusPower: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      const hasCerebro = names.includes("Cerebro");
      const hasXavierMansion = names.includes("Xavier Mansion");

      return [
        {
          points: hasCerebro ? 6 : 0,
          reason: hasCerebro ? `+6 for Cerebro.` : "No Cerebro in hand.",
        },
        {
          points: hasXavierMansion ? 6 : 0,
          reason: hasXavierMansion
            ? `+6 for Xavier Mansion.`
            : "No Xavier Mansion in hand.",
        },
      ];
    },
  },
  {
    name: "Jean Grey / Phoenix",
    type: CardType.HERO,
    basePower: 3,
    cardText: "Transform with two or more other MUTANT",
    tags: {
      base: [Tag.INTEL, Tag.RANGE, Tag.MUTANT],
      bonus: [],
      combined: [Tag.INTEL, Tag.RANGE, Tag.MUTANT],
      conditional: (cards: Card[]) => {
        const otherMutants = getOtherCardsWithTag(
          cards,
          Tag.MUTANT,
          "Jean Grey / Phoenix"
        );

        return otherMutants.length >= 2
          ? [Tag.INTEL, Tag.RANGE, Tag.RANGE, Tag.FLIGHT, Tag.MUTANT]
          : [Tag.INTEL, Tag.RANGE, Tag.MUTANT];
      },
    },
    bonusPower: (cards: Card[]) => {
      const otherMutants = getOtherCardsWithTag(
        cards,
        Tag.MUTANT,
        "Jean Grey / Phoenix"
      );

      return [
        {
          points: otherMutants.length >= 2 ? 12 : 0,
          reason:
            otherMutants.length >= 2
              ? "Transformed in to Phoenix with two or more other MUTANT."
              : "Not transformed. Still Jean Grey.",
        },
      ];
    },
  },
  {
    name: "Shadowcat",
    type: CardType.HERO,
    basePower: 4,
    cardText: "+4 with any LOCATION",
    tags: {
      base: [Tag.TECH, Tag.MUTANT],
      bonus: [],
      combined: [Tag.TECH, Tag.MUTANT],
    },
    bonusPower: (cards: Card[]) => {
      const types = getHandInfo(cards).types;

      return [
        {
          points: types[CardType.LOCATION] > 0 ? 4 : 0,
          reason: `+4 with any LOCATION (${types[CardType.LOCATION]})`,
        },
      ];
    },
  },
  {
    name: "She-Hulk",
    type: CardType.HERO,
    basePower: 4,
    cardText: "+5 for each other GAMMA",
    tags: {
      base: [Tag.STRENGTH, Tag.GAMMA],
      bonus: [],
      combined: [Tag.STRENGTH, Tag.GAMMA],
    },
    bonusPower: (cards: Card[]) => {
      const otherGammas = getOtherCardsWithTag(cards, Tag.GAMMA, "She-Hulk");

      return [
        {
          points: otherGammas.length * 5,
          reason: `+5 for each other GAMMA (${otherGammas.length})`,
        },
      ];
    },
  },
  {
    name: "Spider-Man",
    type: CardType.HERO,
    basePower: 5,
    cardText: "+5 and FLIGHT with a LOCATION with URBAN",
    tags: {
      base: [Tag.AGILITY, Tag.STRENGTH],
      bonus: [],
      combined: [Tag.AGILITY, Tag.STRENGTH],
      conditional: (cards: Card[]) => {
        return hasCardWithTypeAndTag(cards, CardType.LOCATION, Tag.URBAN)
          ? [Tag.AGILITY, Tag.STRENGTH, Tag.FLIGHT]
          : [Tag.AGILITY, Tag.STRENGTH];
      },
    },
    bonusPower: (cards: Card[]) => {
      const hasUrbanLocation = hasCardWithTypeAndTag(
        cards,
        CardType.LOCATION,
        Tag.URBAN
      );
      return [
        {
          points: hasUrbanLocation.length > 0 ? 5 : 0,
          reason: hasUrbanLocation
            ? "LOCATION with URBAN in hand."
            : "No LOCATION with URBAN in hand.",
        },
      ];
    },
  },
  {
    name: "Storm",
    type: CardType.HERO,
    basePower: 4,
    cardText: "",
    tags: {
      base: [Tag.FLIGHT, Tag.RANGE, Tag.MUTANT],
      bonus: [],
      combined: [Tag.FLIGHT, Tag.RANGE, Tag.MUTANT],
    },
  },
  {
    name: "Thor Odinson / God of Thunder",
    type: CardType.HERO,
    basePower: 4,
    cardText: "Transform with MJOLNIR or two or more ALLIES",
    tags: {
      base: [Tag.STRENGTH, Tag.ASGARD, Tag.WORTHY],
      bonus: [],
      combined: [Tag.STRENGTH, Tag.ASGARD, Tag.WORTHY],
      conditional: (cards: Card[]) => {
        const info = getHandInfo(cards);

        const allyCount = info.types[CardType.ALLY] || 0;
        const hasMjolnir = info.names.includes("Mjolnir");

        return hasMjolnir || allyCount >= 2
          ? [Tag.STRENGTH, Tag.FLIGHT, Tag.RANGE, Tag.ASGARD, Tag.WORTHY]
          : [Tag.STRENGTH, Tag.ASGARD, Tag.WORTHY];
      },
    },
    bonusPower: (cards: Card[]) => {
      const info = getHandInfo(cards);

      const allyCount = info.types[CardType.ALLY] || 0;
      const hasMjolnir = info.names.includes("Mjolnir");

      return [
        {
          points: hasMjolnir || allyCount >= 2 ? 12 : 0,
          reason:
            hasMjolnir || allyCount >= 2
              ? "Transformed in to God of Thunder with Mjolnir or two or more ALLIES."
              : "Not transformed. Still Thor Odinson.",
        },
      ];
    },
  },
  {
    name: "Tony Stark / Iron Man",
    type: CardType.HERO,
    basePower: 3,
    cardText: "Transform with two or more INTEL",
    tags: {
      base: [Tag.TECH, Tag.RANGE],
      bonus: [],
      combined: [Tag.TECH, Tag.RANGE],
      conditional: (cards: Card[]) => {
        const tags = getHandInfo(cards).tags;

        return tags[Tag.INTEL] >= 2
          ? [Tag.TECH, Tag.STRENGTH, Tag.FLIGHT, Tag.RANGE]
          : [Tag.TECH, Tag.RANGE];
      },
    },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;

      return [
        {
          points: tags[Tag.INTEL] >= 2 ? 12 : 0,
          reason:
            tags[Tag.INTEL] >= 2
              ? "Has two or more INTEL, Transformed in to Iron Man"
              : "Not transformed. Still Tony Stark.",
        },
      ];
    },
  },
  {
    name: "Valkyrie",
    type: CardType.HERO,
    basePower: 7,
    cardText: "+3 for each other MUTANT",
    tags: {
      base: [Tag.STRENGTH, Tag.FLIGHT, Tag.ASGARD],
      bonus: [],
      combined: [Tag.STRENGTH, Tag.FLIGHT, Tag.ASGARD],
    },
  },
  {
    name: "Vision",
    type: CardType.HERO,
    basePower: 3,
    cardText:
      "VISION has your choice of two different tags, either STRENGTH, FLIGHT, TECH, or RANGE",
    tags: { base: [Tag.WORTHY], bonus: [], combined: [Tag.WORTHY] },
  },
  {
    name: "Wolverine",
    type: CardType.HERO,
    basePower: 4,
    cardText: "+6 with any VILLAIN with BOSS",
    tags: {
      base: [Tag.AGILITY, Tag.MUTANT],
      bonus: [],
      combined: [Tag.AGILITY, Tag.MUTANT],
    },
    bonusPower: (cards: Card[]) => {
      const hasBossVillain = hasCardWithTypeAndTag(
        cards,
        CardType.VILLAIN,
        Tag.BOSS
      );

      return [
        {
          points: hasBossVillain ? 6 : 0,
          reason: hasBossVillain
            ? "+6 with any VILLAIN with BOSS."
            : "No VILLAIN with BOSS in hand.",
        },
      ];
    },
  },
];
