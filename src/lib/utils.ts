import { Card, CardType, Tag } from "./types";

export function hasCardWithTypeAndTag(cards: Card[], type: CardType, tag: Tag) {
  return cards.filter((card) => card.type === type && card.tags.includes(tag));
}

export function getOtherCardsWithTag(
  cards: Card[],
  tag: Tag,
  filterCard: string
) {
  return cards.filter((card) => {
    if (card.tags.includes(tag) && card.name !== filterCard) {
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

    card.tags.forEach((tag) => {
      tags[tag] ? tags[tag]++ : (tags[tag] = 1);
    });
  });

  return {
    names: cards.map((card) => card.name),
    tags,
    types,
  };
}

export function combine(A: Card[], i = 0): Card[][] {
  return i == A.length
    ? [[]]
    : combine(A, i + 1).flatMap((x) => [x, [A[i]].concat(x)]);
}

export function getAllCombinations(inputArray: Card[]) {
  const combos: Card[][] = combine(inputArray);

  return combos.filter((combo) => {
    // filter combos that have more than 1 card with the same name or a length greater than 3
    const names = combo.map((card) => card.name);
    const uniqueNames = new Set(names);

    return (
      uniqueNames.size == names.length && names.length <= 3 && names.length > 0
    );
  });
}

export function getMutantTags() {
  return {
    Forge: ["Tech", "Mutant"],
    Angel: ["Agility", "Flight", "Mutant"],
    Beast: ["Tech", "Agility", "Mutant"],
    Colossus: ["Strength", "Strength", "Mutant"],
    Cyclops: ["Range", "Mutant"],
    "Professor X": ["Intel", "Mutant"],
    "Jean Grey / Phoenix": ["Intel", "Range", "Mutant"],
    Shadowcat: ["Tech", "Mutant"],
    Storm: ["Flight", "Range", "Mutant"],
    Wolverine: ["Agility", "Mutant"],
    Mystique: ["Mutant"],
    Toad: ["Mutant"],
  };
}

export function getMutantHeroTags() {
  return {
    Angel: ["Agility", "Flight", "Mutant"],
    Beast: ["Tech", "Agility", "Mutant"],
    Colossus: ["Strength", "Strength", "Mutant"],
    Cyclops: ["Range", "Mutant"],
    "Professor X": ["Intel", "Mutant"],
    "Jean Grey / Phoenix": ["Intel", "Range", "Mutant"],
    Shadowcat: ["Tech", "Mutant"],
    Storm: ["Flight", "Range", "Mutant"],
    Wolverine: ["Agility", "Mutant"],
  };
}
