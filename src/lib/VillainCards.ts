import { useCardStore } from "@/stores/cardStore";
import { Card, CardType, Tag } from "./types";
import {
  getHandInfo,
  getOtherCardsWithTag,
  hasCardWithTypeAndTag,
} from "./utils";

export const Villains: Card[] = [
  {
    name: "Abomination",
    type: CardType.VILLAIN,
    basePower: 13,
    cardText: "-20 unless with two or more STRENGTH",
    tags: { base: [Tag.GAMMA], bonus: [], combined: [Tag.GAMMA] },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo().tags;

      return [
        {
          points: tags[Tag.STRENGTH] >= 2 ? 0 : -20,
          reason:
            tags[Tag.STRENGTH] >= 2
              ? `"No penalty for more than 2 STRENGTH (${tags[Tag.STRENGTH]}).`
              : `-20 for less than 2 STRENGTH (${tags[Tag.STRENGTH]})`,
        },
      ];
    },
  },
  {
    name: "Baron Zemo",
    type: CardType.VILLAIN,
    basePower: 15,
    cardText: "-3 for each HERO",
    tags: { base: [Tag.BOSS], bonus: [], combined: [Tag.BOSS] },
    bonusPower: (cards: Card[]) => {
      const types = getHandInfo().types;

      return [
        {
          points: types[CardType.HERO] || 0 * -3,
          reason: `-3 for each HERO (${types[CardType.HERO]})`,
        },
      ];
    },
  },
  {
    name: "Black Cat",
    type: CardType.VILLAIN,
    basePower: 8,
    cardText: "+5 with a LOCATION with URBAN. -5 for each MANEUVER",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo();

      const hasUrbanLocation = hasCardWithTypeAndTag(
        cards,
        CardType.LOCATION,
        Tag.URBAN
      );

      const maneuverCount = handInfo.types[CardType.MANEUVER] || 0;

      maneuverCount * -5 + (hasUrbanLocation ? 5 : 0);

      return [
        {
          points: maneuverCount * -5,
          reason: `-5 for each MANEUVER (${maneuverCount})`,
        },
        {
          points: hasUrbanLocation ? 5 : 0,
          reason: `Urban Location +5 (${hasUrbanLocation.toString()})`,
        },
      ];
    },
  },
  {
    name: "Hela",
    type: CardType.VILLAIN,
    basePower: 18,
    cardText: "-20 unless with two or more other ASGARD",
    tags: { base: [Tag.ASGARD], bonus: [], combined: [Tag.ASGARD] },
    bonusPower: (cards: Card[]) => {
      const otherAsgard = getOtherCardsWithTag(cards, Tag.ASGARD, "Hela");

      return [
        {
          points: otherAsgard.length >= 2 ? 0 : -20,
          reason:
            otherAsgard.length >= 2
              ? `"Two or more other ASGARD in hand (${otherAsgard.length}).`
              : `-20 for less than 2 other ASGARD (${otherAsgard.length})`,
        },
      ];
    },
  },
  {
    name: "Kang",
    type: CardType.VILLAIN,
    basePower: -10,
    cardText: "+5 for each different tag in your hand",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo().tags;

      return [
        {
          points: Object.keys(tags).length * 5,
          reason: `+5 for each different tag (${Object.keys(tags).join(", ")})`,
        },
      ];
    },
  },
  {
    name: "Killmonger",
    type: CardType.VILLAIN,
    basePower: -9,
    cardText: "+9 for each other WAKANDA",
    tags: { base: [Tag.WAKANDA], bonus: [], combined: [Tag.WAKANDA] },
    bonusPower: (cards: Card[]) => {
      const otherWakanda = getOtherCardsWithTag(
        cards,
        Tag.WAKANDA,
        "Killmonger"
      );

      return [
        {
          points: otherWakanda.length * 9,
          reason: `+9 for each other WAKANDA (${otherWakanda.length})`,
        },
      ];
    },
  },
  {
    name: "Juggernaut",
    type: CardType.VILLAIN,
    basePower: 16,
    cardText: "Blank one LOCATION",
    tags: { base: [Tag.MUTANT], bonus: [], combined: [Tag.MUTANT] },
  },
  {
    name: "Kingpin",
    type: CardType.VILLAIN,
    basePower: 13,
    cardText: "Blanked unless with a LOCATION with URBAN",
    tags: { base: [Tag.BOSS], bonus: [], combined: [Tag.BOSS] },
    bonusPower: (cards: Card[]) => {
      const hasUrbanLocation = hasCardWithTypeAndTag(
        cards,
        CardType.LOCATION,
        Tag.URBAN
      );

      return [
        {
          points: hasUrbanLocation.length > 0 ? 0 : -13,
          reason:
            hasUrbanLocation.length > 0
              ? `LOCATION with URBAN tag in hand (${hasUrbanLocation.length}).`
              : `No LOCATION with URBAN tag in hand.`,
        },
      ];
    },
  },
  {
    name: "Magneto",
    type: CardType.VILLAIN,
    basePower: 17,
    cardText:
      "Blank all EQUIPMENT and ignore all TECH. (cards with TECH keep their other details)",
    tags: { base: [Tag.BOSS], bonus: [], combined: [Tag.BOSS] },
    onAdd: (cards: Card[]) => {
      cards.forEach((card) => {
        if (card.type === CardType.EQUIPMENT) {
          card.forceBlank = true;
        }
      });
      const store = useCardStore();
      store.blankedTags.add(Tag.TECH);
    },
    onRemove: (cards: Card[]) => {
      cards.forEach((card) => {
        if (card.type === CardType.EQUIPMENT) {
          card.forceBlank = false;
        }
      });
      const store = useCardStore();
      store.blankedTags.delete(Tag.TECH);
    },
  },
  {
    name: "Mystique",
    type: CardType.VILLAIN,
    basePower: 14,
    cardText:
      "-20 unless with two or more INTEL or with any three cards sharing the same tag",
    tags: { base: [Tag.MUTANT], bonus: [], combined: [Tag.MUTANT] },
    bonusPower: (cards: Card[]) => {
      const handInfo = getHandInfo();

      const intelCount = handInfo.tags[Tag.INTEL] || 0;

      if (intelCount >= 2) {
        return [
          {
            points: 0,
            reason: "No penalty for two or more INTEL",
          },
        ];
      }

      const uniqueTags: Tag[] = [];
      // loop through cards and see if any 3 share the same tag
      cards.forEach((card) => {
        card.tags.combined.forEach((tag) => {
          const matchingCards = cards.filter((card) =>
            card.tags.combined.includes(tag)
          );
          if (matchingCards.length >= 3 && !uniqueTags.includes(tag)) {
            uniqueTags.push(tag);
          }
        });
      });

      return [
        {
          points: uniqueTags.length > 0 ? 0 : -20,
          reason:
            uniqueTags.length > 0
              ? `Hand has 3 cards that share a tag (${uniqueTags.join(", ")})`
              : "-20 for less than 2 INTEL and no 3 cards with the same tag",
        },
      ];
    },
  },
  {
    name: "Sauron",
    type: CardType.VILLAIN,
    basePower: -7,
    cardText: "-7 for each FLIGHT and for each RANGE",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo().tags;

      const flightCount = tags[Tag.FLIGHT] || 0;
      const rangeCount = tags[Tag.RANGE] || 0;

      return [
        {
          points: flightCount * 7,
          reason: `+7 for each FLIGHT (${flightCount})`,
        },
        {
          points: rangeCount * 7,
          reason: `+7 for each RANGE (${rangeCount})`,
        },
      ];
    },
  },
  {
    name: "Selene",
    type: CardType.VILLAIN,
    basePower: 25,
    cardText:
      "Blank any HERO or ALLY in your hand. Subtract its base power from your total score.",
    tags: { base: [Tag.MUTANT], bonus: [], combined: [Tag.MUTANT] },
  },
  {
    name: "Sentinels",
    type: CardType.VILLAIN,
    basePower: 12,
    cardText: "-20 unless with two or more MUTANTS",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo().tags;

      const mutantCount = tags[Tag.MUTANT] || 0;

      return [
        {
          points: mutantCount >= 2 ? 0 : -20,
          reason:
            mutantCount >= 2
              ? `No penalty for two or more MUTANTS (${mutantCount}).`
              : "Less than two MUTANTS in hand.",
        },
      ];
    },
  },
  {
    name: "Taskmaster",
    type: CardType.VILLAIN,
    basePower: 11,
    cardText: "Blank all MANEUVERS",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
  },
  {
    name: "The Leader",
    type: CardType.VILLAIN,
    basePower: 12,
    cardText: "-3 for each STRENGTH and for other GAMMA",
    tags: {
      base: [Tag.GAMMA, Tag.BOSS],
      bonus: [],
      combined: [Tag.GAMMA, Tag.BOSS],
    },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo().tags;

      const gammaCount = getOtherCardsWithTag(cards, Tag.GAMMA, "The Leader");
      const strengthCount = tags[Tag.STRENGTH] || 0;

      return [
        {
          points: strengthCount * -3,
          reason: `-3 for each STRENGTH (${strengthCount})`,
        },
        {
          points: gammaCount.length * -3,
          reason: `-3 for each other GAMMA (${gammaCount.length})`,
        },
      ];
    },
  },
  {
    name: "Toad",
    type: CardType.VILLAIN,
    basePower: 14,
    cardText: "Blanked unless with a VILLAIN with BOSS",
    tags: { base: [Tag.MUTANT], bonus: [], combined: [Tag.MUTANT] },
    bonusPower: (cards: Card[]) => {
      const hasBossVillain = hasCardWithTypeAndTag(
        cards,
        CardType.VILLAIN,
        Tag.BOSS
      );

      return [
        {
          points: hasBossVillain ? 14 : 0,
          reason: hasBossVillain
            ? `Villian with BOSS tag in hand.`
            : "No Villain with BOSS in hand.",
        },
      ];
    },
  },
  {
    name: "Ultron",
    type: CardType.VILLAIN,
    basePower: 14,
    cardText: "-20 unless with two or more TECH",
    tags: { base: [Tag.BOSS], bonus: [], combined: [Tag.BOSS] },
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo().tags;

      return [
        {
          points: tags[Tag.TECH] >= 2 ? 0 : -20,
          reason:
            tags[Tag.TECH] >= 2
              ? `"Two or more STRENGTH in hand (${tags[Tag.TECH]}).`
              : `-20 for less than 2 TECH (${tags[Tag.TECH]})`,
        },
      ];
    },
  },
];
