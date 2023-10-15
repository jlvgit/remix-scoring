import { Card, CardType, Tag } from "./types";
import {
  getHandInfo,
  getOtherCardsWithTag,
  getOtherCardsWithType,
  hasCardWithTypeAndTag,
} from "./utils";

export const Locations: Card[] = [
  {
    name: "Bifrost",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+11 with a second LOCATION",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    bonusPower: (cards: Card[]) => {
      const otherLocations = getOtherCardsWithType(
        cards,
        CardType.LOCATION,
        "Bifrost"
      );

      return [
        {
          points: otherLocations.length > 0 ? 11 : 0,
          reason: `+11 with a second LOCATION (${otherLocations.length})`,
        },
      ];
    },
  },
  {
    name: "Birnin Zana",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+7 for each other WAKANDA",
    tags: {
      base: [Tag.TECH, Tag.WAKANDA, Tag.URBAN],
      bonus: [],
      combined: [Tag.TECH, Tag.WAKANDA, Tag.URBAN],
      conditional: (cards: Card[]) => {
        const names = getHandInfo(cards).names;

        return names.includes("Hack In")
          ? [Tag.TECH, Tag.WAKANDA, Tag.URBAN, Tag.INTEL]
          : [Tag.TECH, Tag.WAKANDA, Tag.URBAN];
      },
    },
    bonusPower: (cards: Card[]) => {
      const otherWakanda = getOtherCardsWithTag(
        cards,
        Tag.WAKANDA,
        "Birnin Zana"
      );

      return [
        {
          points: otherWakanda.length * 7,
          reason: `+7 for each other WAKANDA (${otherWakanda.length})`,
        },
      ];
    },
  },
  {
    name: "Factory",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+5 for each TECH, and for each AGILITY",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;

      const tech = tags[Tag.TECH] || 0;
      const agility = tags[Tag.AGILITY] || 0;

      return [
        {
          points: tech * 5,
          reason: `+5 for each TECH (${tech}.`,
        },
        {
          points: agility * 5,
          reason: `+5 for each AGILITY (${agility}.`,
        },
      ];
    },
  },
  {
    name: "Falling Debris",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+4 for for each STRENGTH and for each FLIGHT",
    tags: { base: [Tag.URBAN], bonus: [], combined: [Tag.URBAN] },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;

      const strength = tags[Tag.STRENGTH] || 0;
      const flight = tags[Tag.FLIGHT] || 0;

      return [
        {
          points: strength * 4,
          reason: `+4 for each STRENGTH (${strength}.`,
        },
        {
          points: flight * 4,
          reason: `+4 for each FLIGHT (${flight}.`,
        },
      ];
    },
  },
  {
    name: "Halls of Asgard",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+9 for each other ASGARD",
    tags: { base: [Tag.URBAN], bonus: [], combined: [Tag.URBAN] },
    bonusPower: (cards: Card[]) => {
      const otherAsgard = getOtherCardsWithTag(
        cards,
        Tag.ASGARD,
        "Halls of Asgard"
      );

      return [
        {
          points: otherAsgard.length * 9,
          reason: `+9 for each other ASGARD (${otherAsgard.length})`,
        },
      ];
    },
  },
  {
    name: "High Speed Chase",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+3 for each AGILITY, for each FLIGHT, and for each RANGE",
    tags: { base: [Tag.URBAN], bonus: [], combined: [Tag.URBAN] },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;

      const agility = tags[Tag.AGILITY] || 0;
      const flight = tags[Tag.FLIGHT] || 0;
      const range = tags[Tag.RANGE] || 0;

      return [
        {
          points: agility * 3,
          reason: `+3 for each AGILITY (${agility}.`,
        },
        {
          points: flight * 3,
          reason: `+3 for each FLIGHT (${flight}.`,
        },
        {
          points: range * 3,
          reason: `+3 for each RANGE (${range}.`,
        },
      ];
    },
  },
  {
    name: "Krakoa",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+5 for each MUTANT",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    bonusPower: (cards: Card[]) => {
      const types = getHandInfo(cards).types;

      return [
        {
          points: types[CardType.HERO] || 0 * 5,
          reason: `+5 for each MUTANT (${types[CardType.HERO]}.`,
        },
      ];
    },
  },
  {
    name: "Madripoor",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+3 for each INTEL",
    tags: { base: [Tag.URBAN], bonus: [], combined: [Tag.URBAN] },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;

      return [
        {
          points: tags[Tag.INTEL] || 0 * 3,
          reason: `+3 for each INTEL (${tags[Tag.INTEL]}.`,
        },
      ];
    },
  },
  {
    name: "Remote Fortress",
    type: CardType.LOCATION,
    basePower: 15,
    cardText: "Blanked unless with a VILLAIN with BOSS",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    blanked: (cards: Card[]) => {
      const hasBossVillain = hasCardWithTypeAndTag(
        cards,
        CardType.VILLAIN,
        Tag.BOSS
      );

      return hasBossVillain.length > 0 ? false : true;
    },
  },
  {
    name: "Runaway Train",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+4 for each STRENGTH and each TECH",
    tags: { base: [Tag.URBAN], bonus: [], combined: [Tag.URBAN] },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;

      const strength = tags[Tag.STRENGTH] || 0;
      const tech = tags[Tag.TECH] || 0;

      return [
        {
          points: strength * 4,
          reason: `+4 for each STRENGTH (${strength}.`,
        },
        {
          points: tech * 4,
          reason: `+4 for each TECH (${tech}.`,
        },
      ];
    },
  },
  {
    name: "Skyscraper",
    type: CardType.LOCATION,
    basePower: 0,
    cardText: "+4 for for each AGILITY and for each FLIGHT",
    tags: { base: [Tag.URBAN], bonus: [], combined: [Tag.URBAN] },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;

      const agility = tags[Tag.AGILITY] || 0;
      const flight = tags[Tag.FLIGHT] || 0;

      return [
        {
          points: agility * 4,
          reason: `+4 for each AGILITY (${agility}.`,
        },
        {
          points: flight * 4,
          reason: `+4 for each FLIGHT (${flight}.`,
        },
      ];
    },
  },
  {
    name: "Xavier Mansion",
    type: CardType.LOCATION,
    basePower: 4,
    cardText: "Up to three HEROES with MUTANT may each count one tag twice",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
  },
];
