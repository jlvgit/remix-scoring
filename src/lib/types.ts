export type Card = {
  name: string;
  type: string;
  basePower: number;
  tags: {
    base: Tag[];
    bonus: Tag[];
    conditional?: (cards: Card[]) => Tag[];
    combined: Tag[];
  };
  cardText: string;
  bonusPower?: (cards: Card[]) => CardScore[];
  blanked?: (cards: Card[]) => boolean;
  onAdd?: (cards: Card[]) => void;
  onRemove?: (cards: Card[]) => void;
};

export type CardScore = {
  points: number;
  reason: string;
};

export enum CardType {
  ALLY = "Ally",
  CONDITION = "Condition",
  EQUIPMENT = "Equipment",
  HERO = "Hero",
  LOCATION = "Location",
  MANEUVER = "Maneuver",
  VILLAIN = "Villain",
}

export enum Tag {
  AGILITY = "Agility",
  ASGARD = "Asgard",
  BOSS = "Boss",
  FLIGHT = "Flight",
  GAMMA = "Gamma",
  INTEL = "Intel",
  MUTANT = "Mutant",
  RANGE = "Range",
  STRENGTH = "Strength",
  TECH = "Tech",
  URBAN = "Urban",
  WAKANDA = "Wakanda",
  WORTHY = "Worthy",
}
