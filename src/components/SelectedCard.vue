<template>
  <v-col cols="12" class="ma-3">
    <v-card
      class="mx-auto"
      :class="card.type.toLowerCase()"
      @click="emit('toggle-card', card)"
    >
      <v-card-item>
        <div class="d-flex flex-wrap">
          <div>
            <v-card-title class="d-flex align-center">
              <div class="mr-3">
                <v-chip label class="text-button">
                  <v-tooltip activator="parent" location="top"
                    >Base Power</v-tooltip
                  >
                  {{ card.basePower }}
                </v-chip>
                <span v-if="card.bonusPower" class="text-button ml-1">
                  +
                  <v-chip label class="text-button">
                    <v-tooltip activator="parent" location="top">{{
                      card
                        .bonusPower(hand)
                        .map((point) => {
                          return point.reason;
                        })
                        .join(" ")
                    }}</v-tooltip>
                    {{
                      card.bonusPower(hand).reduce((accumulator, object) => {
                        return accumulator + object.points;
                      }, 0)
                    }}
                  </v-chip>
                </span>
              </div>

              {{ card.name }}
            </v-card-title>
            <v-card-subtitle class="text-wrap">
              {{ card.type }}
              <v-chip
                v-for="tag in card.tags"
                variant="elevated"
                class="ma-1"
                :color="tagColors[tag.toLowerCase()]"
                size="x-small"
              >
                {{ tag }}
              </v-chip>
            </v-card-subtitle>
          </div>
          <div>
            <v-card-text class="text-wrap">
              {{ card.cardText }}
            </v-card-text>
          </div>
        </div>
      </v-card-item>
    </v-card>
    <MoiraMacTaggert
      v-if="card.name == 'Moira MacTaggert'"
      :hand="hand"
      :tagColors="tagColors"
    ></MoiraMacTaggert>
    <XavierMansion
      v-if="card.name == 'Xavier Mansion'"
      :hand="hand"
      :tagColors="tagColors"
    ></XavierMansion>
    <Vision
      v-if="card.name == 'Vision'"
      :hand="hand"
      :tagColors="tagColors"
    ></Vision>
  </v-col>
</template>

<script setup lang="ts">
import { Card } from "@/lib/types";
import XavierMansion from "./SpecialCards/XavierMansion.vue";
import Vision from "./SpecialCards/Vision.vue";
import MoiraMacTaggert from "./SpecialCards/MoiraMacTaggert.vue";

const props = defineProps<{
  hand: Card[];
  card: Card;
}>();

const emit = defineEmits<{
  (event: "toggle-card", card: Card): void;
}>();

const tagColors: { [key: string]: string } = {
  agility: "#f68b1f",
  asgard: "#b17e77",
  boss: "#ed1d24",
  flight: "#00a5e3",
  gamma: "#88ac2e",
  intel: "#2c0d2e",
  mutant: "#00487a",
  range: "#784ea7",
  strength: "#168149",
  tech: "#c30847",
  urban: "#ec0b8c",
  wakanda: "#682329",
  worthy: "#968359",
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
