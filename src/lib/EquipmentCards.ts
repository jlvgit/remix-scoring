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
    cardText: "+9 for each TECH",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
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
    cardText:
      "If you take CEREBRO from the discard area, you may swap a card in your hand with a card in the discard area if either has MUTANT",
    tags: {
      base: [Tag.INTEL],
      bonus: [],
      combined: [Tag.INTEL],
    },
  },
  {
    name: "Mjolnir",
    type: CardType.EQUIPMENT,
    basePower: 10,
    cardText:
      "Blanked unless with WORTHY, or unless with a HERO or AllY with WORTHY",
    tags: {
      base: [Tag.FLIGHT, Tag.RANGE, Tag.ASGARD],
      bonus: [],
      combined: [],
    },
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
    cardText: "+7 for each other EQUIPMENT and each other WAKANDA",
    tags: {
      base: [Tag.WAKANDA],
      bonus: [],
      combined: [Tag.WAKANDA],
    },
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
    cardText: "Blanked unless with a HERO with AGILITY",
    tags: {
      base: [Tag.STRENGTH, Tag.RANGE],
      bonus: [],
      combined: [Tag.STRENGTH, Tag.RANGE],
    },
    blanked: (cards: Card[]) => {
      const hasAgilityHero = hasCardWithTypeAndTag(
        cards,
        CardType.HERO,
        Tag.AGILITY
      );

      return hasAgilityHero.length > 0 ? false : true;
    },
  },
  {
    name: "X-Jet",
    type: CardType.EQUIPMENT,
    basePower: 9,
    cardText:
      "Add FLIGHT to each HERO and ALLY with no FLIGHT. Add RANGE to one HERO or ALLY",
    tags: {
      base: [],
      bonus: [],
      combined: [],
    },
    onAdd: (cards: Card[]) => {
      cards.forEach((card) => {
        if (card.type === CardType.HERO || card.type === CardType.ALLY) {
          if (!card.tags.base.includes(Tag.FLIGHT)) {
            card.tags.bonus.push(Tag.FLIGHT);
          }
        }
      });
    },
    onRemove: (cards: Card[]) => {
      cards.forEach((card) => {
        if (card.type === CardType.HERO || card.type === CardType.ALLY) {
          if (!card.tags.base.includes(Tag.FLIGHT)) {
            const oldIndex = card.tags.bonus.findLastIndex(
              (t) => t === Tag.FLIGHT
            );
            card.tags.bonus.splice(oldIndex, 1);
          }
        }
      });
    },
  },
];
