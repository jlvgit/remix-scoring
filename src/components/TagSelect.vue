<template>
  <v-row class="ma-3">
    <div class="d-flex align-center">
      Selected {{ addedTags.size }}/{{ maxSelection }}:
    </div>
    <div v-for="card in selectionCards">
      <v-card
        v-if="card.type == CardType.HERO"
        :disabled="addedTags.size == maxSelection && !addedTags.has(card.name)"
        flat
      >
        <v-card-subtitle class="text-wrap">
          {{ card.name }}
          <v-chip-group>
            <v-chip
              v-for="tag in defaultTags[card.name as keyof typeof defaultTags]"
              variant="elevated"
              class="ma-1"
              :color="tagColors[tag.toLowerCase()]"
              size="x-small"
              @click="addTag(card, tag as Tag)"
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-card-subtitle>
      </v-card>
    </div>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Card, CardType, Tag } from "@/lib/types";

const props = defineProps<{
  selectionCards: Card[];
  tagColors: { [key: string]: string };
  defaultTags: { [key: string]: string[] };
  maxSelection: number;
}>();

const addedTags = ref(new Map<string, Tag>());

const addTag = (card: Card, tag: Tag) => {
  // If the card is not in the map, and 3 cards haven't been selected add it to that cards tags
  // If the card is in the map, but the tag is not the same, remove the old tag and add the new one
  // If the card is in the map, it's already been added and a second click should remove it
  if (
    !addedTags.value.has(card.name) &&
    addedTags.value.size < props.maxSelection
  ) {
    addedTags.value.set(card.name, tag);
    card.tags.push(tag);
  } else if (
    addedTags.value.has(card.name) &&
    addedTags.value.get(card.name) !== tag
  ) {
    const oldTag = addedTags.value.get(card.name) as Tag;
    addedTags.value.set(card.name, tag);
    const oldIndex = card.tags.findLastIndex((t) => t === oldTag);
    card.tags[oldIndex] = tag;
  } else if (
    addedTags.value.has(card.name) &&
    addedTags.value.size <= props.maxSelection
  ) {
    addedTags.value.delete(card.name);
    const oldIndex = card.tags.findLastIndex((t) => t === tag);
    card.tags.splice(oldIndex, 1);
  }
};
</script>
<style scoped>
@import "../assets/variables.css";
.ally {
  border: 3px solid var(--ally);
}
.hero {
  border: 3px solid var(--hero);
}
.condition {
  border: 3px solid var(--condition);
}
.equipment {
  border: 3px solid var(--equipment);
}
.location {
  border: 3px solid var(--location);
}
.maneuver {
  border: 3px solid var(--maneuver);
}
.villain {
  border: 3px solid var(--villain);
}
</style>
