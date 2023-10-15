import { Card, CardType, Tag } from "./types";

export function hasCardWithTypeAndTag(cards: Card[], type: CardType, tag: Tag) {
  return cards.filter(
    (card) => card.type === type && card.tags.combined.includes(tag)
  );
}

export function getOtherCardsWithTag(
  cards: Card[],
  tag: Tag,
  filterCard: string
) {
  return cards.filter((card) => {
    if (card.tags.combined.includes(tag) && card.name !== filterCard) {
      return card;
    }
  });
}

export function getOtherCardsWithType(
  cards: Card[],
  type: CardType,
  filterCard: string
) {
  return cards.filter((card) => {
    if (card.type == type && card.name !== filterCard) {
      return card;
    }
  });
}

export function getHandInfo(cards: Card[]) {
  const types: Record<string, number> = {};
  const tags: Record<string, number> = {};

  cards.forEach((card) => {
    types[card.type] ? types[card.type]++ : (types[card.type] = 1);

    card.tags.combined.forEach((tag) => {
      tags[tag] ? tags[tag]++ : (tags[tag] = 1);
    });
  });

  return {
    names: cards.map((card) => card.name),
    tags,
    types,
  };
}
