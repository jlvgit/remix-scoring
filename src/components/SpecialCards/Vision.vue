<template>
  <v-row class="ma-3">
    <div class="d-flex align-center">Select two tags:</div>
    <v-card flat>
      <v-card-subtitle class="text-wrap">
        <v-chip-group multiple :max="2">
          <v-chip
            variant="elevated"
            class="ma-1"
            :color="tagColors[Tag.STRENGTH.toLowerCase()]"
            size="x-small"
            @click="toggleTag(Tag.STRENGTH)"
          >
            {{ Tag.STRENGTH }}
          </v-chip>
          <v-chip
            variant="elevated"
            class="ma-1"
            :color="tagColors[Tag.FLIGHT.toLowerCase()]"
            size="x-small"
            @click="toggleTag(Tag.FLIGHT)"
          >
            {{ Tag.FLIGHT }}
          </v-chip>
          <v-chip
            variant="elevated"
            class="ma-1"
            :color="tagColors[Tag.TECH.toLowerCase()]"
            size="x-small"
            @click="toggleTag(Tag.TECH)"
          >
            {{ Tag.TECH }}
          </v-chip>
          <v-chip
            variant="elevated"
            class="ma-1"
            :color="tagColors[Tag.RANGE.toLowerCase()]"
            size="x-small"
            @click="toggleTag(Tag.RANGE)"
          >
            {{ Tag.RANGE }}
          </v-chip>
        </v-chip-group>
      </v-card-subtitle>
    </v-card>
  </v-row>
</template>

<script setup lang="ts">
import { Card, Tag } from "@/lib/types";

const props = defineProps<{
  hand: Card[];
  tagColors: { [key: string]: string };
}>();

const toggleTag = (tag: Tag) => {
  const visionCard = props.hand.find((card) => card.name == "Vision");
  if (visionCard?.tags.bonus.includes(tag)) {
    visionCard.tags.bonus.splice(visionCard?.tags.bonus.indexOf(tag), 1);
  } else {
    visionCard?.tags.bonus.push(tag);
  }
};
</script>
<style scoped>
@import "../../assets/variables.css";
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
/* 
      const colors = {
        hero: "rgb(2, 93, 188)",
        ally: "rgb(99, 34, 98)",
        condition: "rgb(129, 168, 87)",
        equipment: "rgb(128, 119, 114)",
        location: "rgb(231, 155, 45)",
        manuever: "rgb(172, 90, 109)",
        villian: "rgb(233, 53, 43)",
      }; */
</style>
