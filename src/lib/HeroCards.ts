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
    tags: [Tag.AGILITY, Tag.FLIGHT, Tag.MUTANT],
    cardText: "",
  },
  {
    name: "Beast",
    type: CardType.HERO,
    basePower: 6,
    tags: [Tag.TECH, Tag.AGILITY, Tag.MUTANT],
    cardText: "",
    conditionalTags: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return names.includes("Hack In")
        ? [Tag.TECH, Tag.AGILITY, Tag.MUTANT, Tag.INTEL]
        : [Tag.TECH, Tag.AGILITY, Tag.MUTANT];
    },
  },
  {
    name: "Black Panther",
    type: CardType.HERO,
    basePower: 4,
    tags: [Tag.AGILITY, Tag.WAKANDA],
    cardText: "+5 for each other WAKANDA",
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
    tags: [Tag.INTEL, Tag.AGILITY, Tag.AGILITY],
    cardText: "",
  },
  {
    name: "Bruce Banner / Hulk",
    type: CardType.HERO,
    basePower: 1,
    tags: [Tag.TECH, Tag.GAMMA],
    cardText: "Transform with any other GAMMA",
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
    conditionalTags: (cards: Card[]) => {
      const names = getHandInfo(cards).names;
      const hasHackIn = names.includes("Hack In");

      const otherGammas = getOtherCardsWithTag(
        cards,
        Tag.GAMMA,
        "Bruce Banner / Hulk"
      );

      if (otherGammas.length > 0) {
        return [Tag.GAMMA, Tag.STRENGTH, Tag.STRENGTH, Tag.STRENGTH];
      } else {
        return hasHackIn
          ? [Tag.TECH, Tag.GAMMA, Tag.INTEL]
          : [Tag.TECH, Tag.GAMMA];
      }
    },
  },
  {
    name: "Captain America",
    type: CardType.HERO,
    basePower: 2,
    tags: [Tag.AGILITY, Tag.WORTHY],
    cardText: "+2 for each other HERO, +4 with VIBRANIUM SHIELD",
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
    tags: [Tag.STRENGTH, Tag.STRENGTH, Tag.MUTANT],
    cardText: "",
  },
  {
    name: "Cyclops",
    type: CardType.HERO,
    basePower: 4,
    tags: [Tag.RANGE, Tag.MUTANT],
    cardText: "+3 for each other MUTANT",
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
    tags: [Tag.TECH, Tag.FLIGHT, Tag.RANGE],
    cardText: "",
    conditionalTags: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return names.includes("Hack In")
        ? [Tag.TECH, Tag.FLIGHT, Tag.RANGE, Tag.INTEL]
        : [Tag.TECH, Tag.FLIGHT, Tag.RANGE];
    },
  },
  {
    name: "Hawkeye",
    type: CardType.HERO,
    basePower: 5,
    tags: [Tag.TECH, Tag.RANGE, Tag.RANGE],
    cardText: "",
    conditionalTags: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return names.includes("Hack In")
        ? [Tag.TECH, Tag.RANGE, Tag.RANGE, Tag.INTEL]
        : [Tag.TECH, Tag.RANGE, Tag.RANGE];
    },
  },
  {
    name: "Professor X",
    type: CardType.HERO,
    basePower: 3,
    tags: [Tag.INTEL, Tag.MUTANT],
    cardText: "+6 for each of CEREBRO or XAVIER MANSION",
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
    tags: [Tag.INTEL, Tag.RANGE, Tag.MUTANT],
    cardText: "Transform with two or more other MUTANT",
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
    conditionalTags: (cards: Card[]) => {
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
  {
    name: "Shadowcat",
    type: CardType.HERO,
    basePower: 4,
    tags: [Tag.TECH, Tag.MUTANT],
    cardText: "+4 with any LOCATION",
    bonusPower: (cards: Card[]) => {
      const types = getHandInfo(cards).types;

      return [
        {
          points: types[CardType.LOCATION] > 0 ? 4 : 0,
          reason: `+4 with any LOCATION (${types[CardType.LOCATION]})`,
        },
      ];
    },
    conditionalTags: (cards: Card[]) => {
      const names = getHandInfo(cards).names;

      return names.includes("Hack In")
        ? [Tag.TECH, Tag.MUTANT, Tag.INTEL]
        : [Tag.TECH, Tag.MUTANT];
    },
  },
  {
    name: "She-Hulk",
    type: CardType.HERO,
    basePower: 4,
    tags: [Tag.STRENGTH, Tag.GAMMA],
    cardText: "+5 for each other GAMMA",
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
    tags: [Tag.AGILITY, Tag.STRENGTH],
    cardText: "+5 and FLIGHT with a LOCATION with URBAN",
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
    conditionalTags: (cards: Card[]) => {
      return hasCardWithTypeAndTag(cards, CardType.LOCATION, Tag.URBAN)
        ? [Tag.AGILITY, Tag.STRENGTH, Tag.FLIGHT]
        : [Tag.AGILITY, Tag.STRENGTH];
    },
  },
  {
    name: "Storm",
    type: CardType.HERO,
    basePower: 4,
    tags: [Tag.FLIGHT, Tag.RANGE, Tag.MUTANT],
    cardText: "",
  },
  {
    name: "Thor Odinson / God of Thunder",
    type: CardType.HERO,
    basePower: 4,
    tags: [Tag.STRENGTH, Tag.ASGARD, Tag.WORTHY],
    cardText: "Transform with MJOLNIR or two or more ALLIES",
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
    conditionalTags: (cards: Card[]) => {
      const info = getHandInfo(cards);

      const allyCount = info.types[CardType.ALLY] || 0;
      const hasMjolnir = info.names.includes("Mjolnir");

      return hasMjolnir || allyCount >= 2
        ? [Tag.STRENGTH, Tag.FLIGHT, Tag.RANGE, Tag.ASGARD, Tag.WORTHY]
        : [Tag.STRENGTH, Tag.ASGARD, Tag.WORTHY];
    },
  },
  {
    name: "Tony Stark / Iron Man",
    type: CardType.HERO,
    basePower: 3,
    tags: [Tag.TECH, Tag.RANGE],
    cardText: "Transform with two or more INTEL",
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
    conditionalTags: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;
      const names = getHandInfo(cards).names;
      const hasHackIn = names.includes("Hack In");

      return tags[Tag.INTEL] >= 2
        ? hasHackIn
          ? [Tag.TECH, Tag.STRENGTH, Tag.FLIGHT, Tag.RANGE, Tag.INTEL]
          : [Tag.TECH, Tag.STRENGTH, Tag.FLIGHT, Tag.RANGE]
        : hasHackIn
        ? [Tag.TECH, Tag.RANGE, Tag.INTEL]
        : [Tag.TECH, Tag.RANGE];
    },
  },
  {
    name: "Valkyrie",
    type: CardType.HERO,
    basePower: 7,
    tags: [Tag.STRENGTH, Tag.FLIGHT, Tag.ASGARD],
    cardText: "+3 for each other MUTANT",
  },
  {
    name: "Vision",
    type: CardType.HERO,
    basePower: 3,
    tags: [Tag.WORTHY],
    cardText:
      "VISION has your choice of two different tags, either STRENGTH, FLIGHT, TECH, or RANGE",
  },
  {
    name: "Wolverine",
    type: CardType.HERO,
    basePower: 4,
    tags: [Tag.AGILITY, Tag.MUTANT],
    cardText: "+6 with any VILLAIN with BOSS",
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
