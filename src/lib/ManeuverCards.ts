import { Card, CardType, Tag } from "./types";
import { getHandInfo, hasCardWithTypeAndTag } from "./utils";

export const Maneuvers: Card[] = [
  {
    name: "Avoid Crossfire",
    type: CardType.MANEUVER,
    basePower: 0,
    cardText: "+5|7|9 for each RANGE if with 1|2|3 or more cards with RANGE",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const hasTaskmaster = handInfo.names.includes("Taskmaster");

      return hasTaskmaster ? true : false;
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const rangeCount = handInfo.tags[Tag.RANGE] || 0;

      let points = 0;

      if (rangeCount == 1) {
        points = 5 * rangeCount;
      } else if (rangeCount == 2) {
        points = 7 * rangeCount;
      } else if (rangeCount > 3) {
        points = 9 * rangeCount;
      }

      return [
        {
          points,
          reason: `+${points} for each RANGE (${rangeCount})`,
        },
      ];
    },
  },
  {
    name: "Build Gadgets",
    type: CardType.MANEUVER,
    basePower: 0,
    cardText: "+13 for each pair of TECH and INTEL",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const hasTaskmaster = handInfo.names.includes("Taskmaster");

      return hasTaskmaster ? true : false;
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const pairNumbers = [handInfo.tags[Tag.TECH], handInfo.tags[Tag.INTEL]];

      const min = Math.min(...pairNumbers);
      const max = Math.max(...pairNumbers);

      return [
        {
          points: max >= min ? min * 13 : 0,
          reason: `+13 for each pair of TECH and INTEL (${min || 0})`,
        },
      ];
    },
  },
  {
    name: "Discover Weakness",
    type: CardType.MANEUVER,
    basePower: 0,
    cardText: "+11 for each pair of INTEL and AGILITY",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const hasTaskmaster = handInfo.names.includes("Taskmaster");

      return hasTaskmaster ? true : false;
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const pairNumbers = [
        handInfo.tags[Tag.INTEL],
        handInfo.tags[Tag.AGILITY],
      ];

      const min = Math.min(...pairNumbers);
      const max = Math.max(...pairNumbers);

      return [
        {
          points: max >= min ? min * 11 : 0,
          reason: `+11 for each pair of INTEL and AGILITY (${min})`,
        },
      ];
    },
  },
  {
    name: "Find Higher Ground",
    type: CardType.MANEUVER,
    basePower: 0,
    cardText: "+10 for each pair of FLIGHT and RANGE",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const hasTaskmaster = handInfo.names.includes("Taskmaster");

      return hasTaskmaster ? true : false;
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const pairNumbers = [handInfo.tags[Tag.FLIGHT], handInfo.tags[Tag.RANGE]];

      const min = Math.min(...pairNumbers);
      const max = Math.max(...pairNumbers);

      return [
        {
          points: max >= min ? min * 10 : 0,
          reason: `+10 for each pair of FLIGHT and RANGE (${min})`,
        },
      ];
    },
  },
  {
    name: "Hack In",
    type: CardType.MANEUVER,
    basePower: 0,
    cardText: "+6 for each TECH. Each TECH also counts as INTEL",
    tags: {
      base: [Tag.INTEL],
      bonus: [],
      combined: [Tag.INTEL],
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      return [
        {
          points: (handInfo.tags[Tag.TECH] || 0) * 6,
          reason: `+6 for each TECH (${handInfo.tags[Tag.TECH] || 0})`,
        },
      ];
    },
  },
  {
    name: "Throw Car",
    type: CardType.MANEUVER,
    basePower: 0,
    cardText: "+14 with both STRENGTH and LOCATION with URBAN",
    tags: { base: [Tag.RANGE], bonus: [], combined: [Tag.RANGE] },
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const hasTaskmaster = handInfo.names.includes("Taskmaster");

      return hasTaskmaster ? true : false;
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);

      const strengthCount = handInfo.tags[Tag.STRENGTH] || 0;
      const hasUrbanLocation = hasCardWithTypeAndTag(
        cards,
        CardType.LOCATION,
        Tag.URBAN
      );

      return [
        {
          points: hasUrbanLocation && strengthCount ? 14 : 0,
          reason:
            hasUrbanLocation && strengthCount
              ? `+14 with both STRENGTH and LOCATION with URBAN `
              : "Missing STRENGTH or LOCATION with URBAN",
        },
      ];
    },
  },
  {
    name: "Precise Shot",
    type: CardType.MANEUVER,
    basePower: 0,
    cardText: "+12 for each pair of INTEL and RANGE",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    blanked: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const hasTaskmaster = handInfo.names.includes("Taskmaster");

      return hasTaskmaster ? true : false;
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo(cards);
      const pairNumbers = [handInfo.tags[Tag.INTEL], handInfo.tags[Tag.RANGE]];

      const min = Math.min(...pairNumbers);
      const max = Math.max(...pairNumbers);

      return [
        {
          points: max >= min ? min * 12 : 0,
          reason: `+12 for each pair of INTEL and RANGE (${min})`,
        },
      ];
    },
  },
];
