<template>
  <div>
    <TagSelect
      :defaultTags="mutantHeroTags"
      :selectionCards="mutantHeroCards"
      :tagColors="tagColors"
      :maxSelection="1"
    ></TagSelect>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TagSelect from "../TagSelect.vue";
import { Card, CardType, Tag } from "@/lib/types";
import { getMutantHeroTags } from "@/lib/utils";

const props = defineProps<{
  hand: Card[];
  tagColors: { [key: string]: string };
}>();

const mutantHeroTags = getMutantHeroTags();

const mutantHeroCards = computed(() => {
  return props.hand.filter((card) => {
    return card.type == CardType.HERO && card.tags.includes(Tag.MUTANT);
  });
});
</script>
