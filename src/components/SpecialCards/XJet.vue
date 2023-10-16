<template>
  <v-row class="ma-3">
    <div class="d-flex align-center">Selected a HERO or ALLY:</div>
    <v-card-subtitle class="text-wrap">
      <v-chip-group>
        <div v-for="card in selectionCards">
          <v-chip
            v-if="card.type == CardType.HERO || card.type == CardType.ALLY"
            variant="elevated"
            class="ma-1"
            :color="cardColors[card.type.toLowerCase()]"
            size="x-small"
            @click="addTag(card, Tag.RANGE as Tag)"
          >
            {{ card.name }}
          </v-chip>
        </div>
      </v-chip-group>
    </v-card-subtitle>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Card, CardType, Tag } from "@/lib/types";

const props = defineProps<{
  selectionCards: Card[];
  maxSelection: number;
}>();

const addedTags = ref(new Map<string, Tag>());

const addTag = (card: Card, tag: Tag) => {
  if (
    // If the card is not in the map, and the max selection amount haven't been selected, add it to that card's tags
    !addedTags.value.has(card.name) &&
    addedTags.value.size < props.maxSelection
  ) {
    addedTags.value.set(card.name, tag);
    card.tags.bonus.push(tag);
  } else if (
    // If the card is in the map, but the tag is not the same as the one being added, replace the old tag with the new one
    addedTags.value.has(card.name) &&
    addedTags.value.get(card.name) !== tag
  ) {
    const oldTag = addedTags.value.get(card.name) as Tag;
    addedTags.value.set(card.name, tag);
    const oldIndex = card.tags.bonus.findLastIndex((t) => t === oldTag);
    card.tags.bonus[oldIndex] = tag;
  } else if (
    // If the card is in the map, and the tag being added is the same, then it's a second click on the tag (ie. toggling it off), remove the tag
    addedTags.value.has(card.name) &&
    addedTags.value.size <= props.maxSelection
  ) {
    addedTags.value.delete(card.name);
    const oldIndex = card.tags.bonus.findLastIndex((t) => t === tag);
    card.tags.bonus.splice(oldIndex, 1);
  }
};

const cardColors: { [key: string]: string } = {
  ally: "#6c47a6",
  hero: "#00a7ea",
  condition: "#009344",
  equipment: "#565c6d",
  location: "#f48a20",
  maneuver: "#ec0b8c",
  villain: "#ac082a",
};
</script>
