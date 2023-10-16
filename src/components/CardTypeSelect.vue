<template>
  <v-row class="ma-3">
    <div class="d-flex align-center">Select a card to blank:</div>
    <v-card-subtitle class="text-wrap">
      <v-chip-group :max="1">
        <div v-for="card in selectionCards">
          <v-chip
            v-if="card.type == selectionType"
            variant="elevated"
            class="ma-1"
            :color="colors[card.type.toLowerCase()]"
            size="x-small"
            @click="blankLocation(card)"
          >
            {{ card.name }}
          </v-chip>
        </div>
      </v-chip-group>
    </v-card-subtitle>
  </v-row>
</template>

<script setup lang="ts">
import { Card, CardType } from "@/lib/types";

const props = defineProps<{
  selectionCards: Card[];
  selectionType: CardType;
  colors: { [key: string]: string };
}>();

// ref for the blanked villain
let blankedCard: null | Card = null;

const blankLocation = (card: Card) => {
  if (blankedCard && blankedCard.name == card.name) {
    card.forceBlank = false;
    blankedCard = null;
  } else if (blankedCard && blankedCard.name != card.name) {
    blankedCard.forceBlank = false;
    card.forceBlank = true;
    blankedCard = card;
  } else {
    card.forceBlank = true;
    blankedCard = card;
  }
};
</script>
