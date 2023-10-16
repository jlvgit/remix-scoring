<template>
  <v-row class="ma-3">
    <div class="d-flex align-center">Select a card to blank:</div>
    <v-card-subtitle class="text-wrap">
      <v-chip-group :max="1">
        <div v-for="card in selectionCards">
          <v-chip
            v-if="selectionTypes.includes(card.type as CardType)"
            variant="elevated"
            class="ma-1"
            :color="colors[card.type.toLowerCase()]"
            size="x-small"
            @click="blank(card)"
          >
            {{ card.name }}
          </v-chip>
        </div>
      </v-chip-group>
    </v-card-subtitle>
  </v-row>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { Card, CardType } from "@/lib/types";

import { useCardStore } from "@/stores/cardStore";

const props = defineProps<{
  selectionCards: Card[];
  selectionTypes: CardType[];
  colors: { [key: string]: string };
  parentCard: Card;
}>();

const cardStore = useCardStore();

let blankedCard: null | Card = null;

const isParentCardBlanked = computed(() => {
  if (props.parentCard.blanked) {
    return props.parentCard.blanked(props.selectionCards);
  }
  if (props.parentCard.forceBlank) {
    return props.parentCard.forceBlank;
  }
  return false;
});

const resetBlankedCard = () => {
  if (blankedCard) {
    blankedCard.forceBlank = false;
    blankedCard = null;
  }
};

const blank = (card: Card) => {
  if (blankedCard && blankedCard.name == card.name) {
    if (props.parentCard.name == "Selene") {
      cardStore.penaltyPoints += card.basePower;
    }
    card.forceBlank = false;
    blankedCard = null;
  } else if (blankedCard && blankedCard.name != card.name) {
    if (props.parentCard.name == "Selene") {
      cardStore.penaltyPoints += blankedCard?.basePower;
      cardStore.penaltyPoints -= card.basePower;
    }
    blankedCard.forceBlank = false;
    card.forceBlank = true;
    blankedCard = card;
  } else {
    if (props.parentCard.name == "Selene") {
      cardStore.penaltyPoints -= card.basePower;
    }
    card.forceBlank = true;
    blankedCard = card;
  }
};

// watch for changes to the parent card and if isParentCardBlanked is true, call the resetBlankedCard function
watch(isParentCardBlanked, (newVal) => {
  if (newVal) {
    resetBlankedCard();
  }
});
</script>
