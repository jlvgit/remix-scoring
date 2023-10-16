<template>
  <v-col>
    <div class="text-h3 ml-4">
      {{ totalScore }} <v-btn @click="resetHand">Reset</v-btn>
    </div>
    <v-col v-if="hand.length > 0">
      <TransitionGroup name="list" tag="div">
        <div
          v-for="card in hand"
          :key="card.name"
          :class="cardStore.blankedCardsMap.has(card.name) ? 'blanked' : ''"
        >
          <SelectedCard
            :hand="hand"
            :card="card"
            @toggle-card="addToHand"
          ></SelectedCard>
        </div>
      </TransitionGroup>
    </v-col>
    <div
      v-else
      class="ml-4 d-flex justify-center"
      style="color: gray; font-size: large; margin-top: 100px"
    >
      No cards selected
    </div>
  </v-col>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Card } from "@/lib/types";

// Functions
import SelectedCard from "./SelectedCard.vue";
import { useCardStore } from "@/stores/cardStore";

const emit = defineEmits<{
  (event: "reset-hand"): void;
}>();

const cardStore = useCardStore();
const hand = computed(() => cardStore.getHand());

const resetHand = () => {
  cardStore.resetHand();
};

const addToHand = (card: Card) => {
  cardStore.addToHand(card);
};

const totalScore = computed(() => {
  let score = 0;

  if (hand) {
    score = cardStore.scoreHand(hand.value);
  }

  return score;
});
</script>
<style>
.blanked {
  opacity: 0.5;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
