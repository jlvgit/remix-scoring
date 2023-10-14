import { Card, CardType, Tag } from "./types";
import {
  getHandInfo,
  getOtherCardsWithTag,
  getOtherCardsWithType,
  hasCardWithTypeAndTag,
} from "./utils";

export const Equipment: Card[] = [
  {
    name: "Arc Reactor",
    type: CardType.EQUIPMENT,
    basePower: 0,
    tags: [],
    cardText: "+9 for each TECH",
    bonusPower: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;
      return [
        {
          points: (tags[Tag.TECH] || 0) * 9,
          reason: `Tech Count: (${tags[Tag.TECH] || 0})`,
        },
      ];
    },
  },
  {
    name: "Cerebro",
    type: CardType.EQUIPMENT,
    basePower: 8,
    tags: [Tag.INTEL],
    cardText:
      "If you take CEREBRO from the discard area, you may swap a card in your hand with a card in the discard area if either has MUTANT",
  },
  {
    name: "Mjolnir",
    type: CardType.EQUIPMENT,
    basePower: 10,
    tags: [Tag.FLIGHT, Tag.RANGE, Tag.ASGARD],
    cardText:
      "Blanked unless with WORTHY, or unless with a HERO or AllY with WORTHY",
    blanked: (cards: Card[]) => {
      const tags = getHandInfo(cards).tags;
      const worthyCount = tags[Tag.WORTHY] || 0;

      return worthyCount > 0 ? false : true;
    },
  },
  {
    name: "Spear of Bashenga",
    type: CardType.EQUIPMENT,
    basePower: 0,
    tags: [Tag.WAKANDA],
    cardText: "+7 for each other EQUIPMENT and each other WAKANDA",
    bonusPower: (cards: Card[]) => {
      const otherWakanda = getOtherCardsWithTag(
        cards,
        Tag.WAKANDA,
        "Spear of Bashenga"
      );

      const otherEquipment = getOtherCardsWithType(
        cards,
        CardType.EQUIPMENT,
        "Spear of Bashenga"
      );

      otherEquipment.length * 7 + otherWakanda.length * 7;
      return [
        {
          points: otherWakanda.length * 7,
          reason: `+7 for each other WAKANDA card (${otherWakanda.length})`,
        },
        {
          points: otherEquipment.length * 7,
          reason: `+7 for each other EQUIPMENT card (${otherEquipment.length})`,
        },
      ];
    },
  },
  {
    name: "Vibranium Shield",
    type: CardType.EQUIPMENT,
    basePower: 9,
    tags: [Tag.STRENGTH, Tag.RANGE],
    cardText: "Blanked unless with a HERO with AGILITY",
    blanked: (cards: Card[]) => {
      const hasAgilityHero = hasCardWithTypeAndTag(
        cards,
        CardType.HERO,
        Tag.AGILITY
      );

      return hasAgilityHero.length > 0 ? false : true;
    },
  },
];
