<template>
  <v-row class="ma-3">
    <div class="d-flex align-center">Select tags:</div>
    <div>
      <v-card flat>
        <v-card-subtitle class="text-wrap">
          Shuri
          <v-chip-group>
            <v-chip
              variant="elevated"
              class="ma-1"
              :color="tagColors[Tag.STRENGTH.toLowerCase()]"
              size="x-small"
              @click="addTag(shuriCard, Tag.STRENGTH)"
            >
              {{ Tag.STRENGTH }}
            </v-chip>
            <v-chip
              variant="elevated"
              class="ma-1"
              :color="tagColors[Tag.RANGE.toLowerCase()]"
              size="x-small"
              @click="addTag(shuriCard, Tag.RANGE)"
            >
              {{ Tag.RANGE }}
            </v-chip>
            <v-chip
              variant="elevated"
              class="ma-1"
              :color="tagColors[Tag.AGILITY.toLowerCase()]"
              size="x-small"
              @click="addTag(shuriCard, Tag.AGILITY)"
            >
              {{ Tag.AGILITY }}
            </v-chip>
          </v-chip-group>
        </v-card-subtitle>
      </v-card>
    </div>
    <div v-for="card in selectionCards">
      <v-card
        v-if="
          (card.type == CardType.HERO || card.type == CardType.ALLY) &&
          card.name != 'Shuri'
        "
        :disabled="addedTags.size == 1 && !addedTags.has(card.name)"
        flat
      >
        <v-card-subtitle class="text-wrap">
          {{ card.name }}
          <v-chip-group>
            <v-chip
              variant="elevated"
              class="ma-1"
              :color="tagColors[Tag.STRENGTH.toLowerCase()]"
              size="x-small"
              @click="addTag(card, Tag.STRENGTH)"
            >
              {{ Tag.STRENGTH }}
            </v-chip>
            <v-chip
              variant="elevated"
              class="ma-1"
              :color="tagColors[Tag.RANGE.toLowerCase()]"
              size="x-small"
              @click="addTag(card, Tag.RANGE)"
            >
              {{ Tag.RANGE }}
            </v-chip>
            <v-chip
              variant="elevated"
              class="ma-1"
              :color="tagColors[Tag.AGILITY.toLowerCase()]"
              size="x-small"
              @click="addTag(card, Tag.AGILITY)"
            >
              {{ Tag.AGILITY }}
            </v-chip>
          </v-chip-group>
        </v-card-subtitle>
      </v-card>
    </div>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CardType, Card, Tag } from "@/lib/types";

const props = defineProps<{
  selectionCards: Card[];
  tagColors: { [key: string]: string };
}>();

const shuriCard = props.selectionCards.find((c) => c.name == "Shuri") as Card;

const addedTags = ref(new Map<string, Tag>());

const addTag = (card: Card, tag: Tag) => {
  if (
    // If the card is not in the map, and the max selection amount haven't been selected, add it to that card's tags
    !addedTags.value.has(card.name) &&
    addedTags.value.size < 2
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
    addedTags.value.size <= 2
  ) {
    addedTags.value.delete(card.name);
    const oldIndex = card.tags.bonus.findLastIndex((t) => t === tag);
    card.tags.bonus.splice(oldIndex, 1);
  }
};
</script>
