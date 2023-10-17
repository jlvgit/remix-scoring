import { useCardStore } from "@/stores/cardStore";
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

export function getHandInfo() {
  const store = useCardStore();
  return store.handInfo;
}
