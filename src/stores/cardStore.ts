import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { Card, CardType } from "@/lib/types";

// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useCardStore = defineStore("cards", () => {
  const hand = ref([] as Card[]);
  const blankedCardsMap = ref(new Map<string, Card>());

  function getHand(): Card[] {
    return hand.value.sort((a, b) => a.name.localeCompare(b.name));
  }

  function resetHand() {
    hand.value = [];
  }

  function addToHand(card: Card) {
    if (hand.value.includes(card)) {
      hand.value.splice(hand.value.indexOf(card), 1);
    } else if (hand.value.length < 7) {
      hand.value.push(card);
    }
  }

  const handInfo = computed(() => {
    const types: Record<string, number> = {};
    const tags: Record<string, number> = {};

    hand.value.forEach((card: Card) => {
      types[card.type] ? types[card.type]++ : (types[card.type] = 1);

      card.tags.forEach((tag) => {
        tags[tag] ? tags[tag]++ : (tags[tag] = 1);
      });
    });

    return {
      names: hand.value.map((card: Card) => card.name),
      tags,
      types,
    };
  });

  function scoreHand(hand: Card[], blankedCards: Card[] = []) {
    let score = 0;

    const types = handInfo.value.types;

    const villainCount = types[CardType.VILLAIN] || 0;
    const heroCount = types[CardType.HERO] || 0;
    const allyCount = types[CardType.ALLY] || 0;

    // if (villainCount == 0 || heroCount + allyCount == 0) {
    //   return 0;
    // }

    hand.forEach((card: Card) => {
      if (card.blanked) {
        card.blanked(hand)
          ? blankedCardsMap.value.set(card.name, card)
          : blankedCardsMap.value.delete(card.name);
      }
    });

    // remove blanked cards from the hand for scoring
    hand = hand.filter((card) => !blankedCards.includes(card));

    hand.forEach((card: Card) => {
      if (card.conditionalTags) {
        card.tags.concat(card.conditionalTags(hand));
      }
    });

    hand.forEach((card: Card) => {
      if (blankedCardsMap.value.has(card.name)) {
        return;
      }
      score += card.basePower;
      if (card.bonusPower) {
        card.bonusPower(hand).forEach((bonus) => {
          score += bonus.points;
        });
      }
    });

    // add blanked cards back into the hand
    hand = hand.concat(blankedCards);

    return score;
  }

  function addBlankedCard(card: Card) {
    blankedCardsMap.value.set(card.name, card);
  }

  function removeBlankedCard(cardName: string) {
    blankedCardsMap.value.delete(cardName);
  }

  return {
    hand,
    handInfo,
    blankedCardsMap,
    getHand,
    resetHand,
    addToHand,
    scoreHand,
    addBlankedCard,
    removeBlankedCard,
  };
});
