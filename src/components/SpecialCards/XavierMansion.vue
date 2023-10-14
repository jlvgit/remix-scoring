<template>
  <div>
    <TagSelect
      :defaultTags="mutantTags"
      :selectionCards="mutantTagCards"
      :tagColors="tagColors"
      :maxSelection="3"
    ></TagSelect>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TagSelect from "../TagSelect.vue";
import { Card, Tag } from "@/lib/types";
import { getMutantTags } from "@/lib/utils";

const props = defineProps<{
  hand: Card[];
  tagColors: { [key: string]: string };
}>();

const mutantTags = getMutantTags();

const mutantTagCards = computed(() => {
  return props.hand.filter((card) => {
    return card.tags.includes(Tag.MUTANT);
  });
});
</script>
