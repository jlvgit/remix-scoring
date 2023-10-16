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
                v-for="tag in card.tags.combined"
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
    <CardTypeSelect
      v-if="displayCardTypeSelected[card.name]"
      :selectionCards="hand"
      :selectionTypes="displayCardTypeSelected[card.name]"
      :colors="cardColors"
      :parentCard="card"
    />
    <Shuri
      v-if="card.name == 'Shuri'"
      :selectionCards="hand"
      :tagColors="tagColors"
    />
    <TagSelect
      v-if="displayTagSelect[card.name]"
      :defaultTags="mutantHeroTags"
      :selectionCards="mutantHeroCards"
      :tagColors="tagColors"
      :maxSelection="displayTagSelect[card.name]"
    />
    <Vision v-if="card.name == 'Vision'" :hand="hand" :tagColors="tagColors" />
    <XJet
      v-if="card.name == 'X-Jet'"
      :selectionCards="hand"
      :maxSelection="1"
    />
  </v-col>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { Card, CardType, Tag } from "@/lib/types";
import { Heroes } from "@/lib/HeroCards";
import { Allies } from "@/lib/AllyCards";

// Components
import CardTypeSelect from "./CardTypeSelect.vue";
import TagSelect from "./TagSelect.vue";
import Shuri from "./SpecialCards/Shuri.vue";
import Vision from "./SpecialCards/Vision.vue";
import XJet from "./SpecialCards/XJet.vue";

const props = defineProps<{
  hand: Card[];
  card: Card;
}>();

const emit = defineEmits<{
  (event: "toggle-card", card: Card): void;
}>();

const displayCardTypeSelected: { [key: string]: CardType[] } = {
  "Hidden Lair": [CardType.VILLAIN],
  Juggernaut: [CardType.LOCATION],
  Selene: [CardType.HERO, CardType.ALLY],
};

const displayTagSelect: { [key: string]: number } = {
  "Moira MacTaggert": 1,
  "Xavier Mansion": 3,
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

const mutantHeroTags = computed(() => {
  const tags: { [key: string]: Tag[] } = {};

  Heroes.forEach((hero) => {
    if (hero.tags.base.includes(Tag.MUTANT)) {
      tags[hero.name] = hero.tags.base;
    }
  });

  return tags;
});

const mutantHeroCards = computed(() => {
  return props.hand.filter((card) => {
    return card.type == CardType.HERO && card.tags.base.includes(Tag.MUTANT);
  });
});
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
