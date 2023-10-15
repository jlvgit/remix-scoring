<template>
  <v-list v-model:opened="open" width="300" compact>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel title="Ally" class="ally-group">
        <v-expansion-panel-text>
          <v-list-item
            v-for="card in Allies"
            :key="card.name"
            :value="card"
            density="compact"
            ripple
            @click="addToHand(card)"
            >{{ card.name }}</v-list-item
          >
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Condition" class="condition-group">
        <v-expansion-panel-text>
          <v-list-item
            v-for="card in Condition"
            :key="card.name"
            :value="card"
            density="compact"
            ripple
            @click="addToHand(card)"
            >{{ card.name }}</v-list-item
          >
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Equipment" class="equipment-group">
        <v-expansion-panel-text>
          <v-list-item
            v-for="card in Equipment"
            :key="card.name"
            :value="card"
            density="compact"
            ripple
            @click="addToHand(card)"
            >{{ card.name }}</v-list-item
          >
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Hero" class="hero-group">
        <v-expansion-panel-text>
          <v-list-item
            v-for="card in Heroes"
            :key="card.name"
            :value="card"
            density="compact"
            ripple
            @click="addToHand(card)"
            >{{ card.name }}</v-list-item
          >
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Location" class="location-group">
        <v-expansion-panel-text>
          <v-list-item
            v-for="card in Locations"
            :key="card.name"
            :value="card"
            density="compact"
            ripple
            @click="addToHand(card)"
            >{{ card.name }}</v-list-item
          >
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Maneuver" class="maneuver-group">
        <v-expansion-panel-text>
          <v-list-item
            v-for="card in Maneuvers"
            :key="card.name"
            :value="card"
            density="compact"
            ripple
            @click="addToHand(card)"
            >{{ card.name }}</v-list-item
          >
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Villain" class="villain-group">
        <v-expansion-panel-text>
          <v-list-item
            v-for="card in Villains"
            :key="card.name"
            :value="card"
            density="compact"
            ripple
            @click="addToHand(card)"
            >{{ card.name }}</v-list-item
          >
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Card } from "@/lib/types";
import { useCardStore } from "@/stores/cardStore";

// Cards
import { Allies } from "@/lib/AllyCards";
import { Condition } from "@/lib/ConditionCards";
import { Equipment } from "@/lib/EquipmentCards";
import { Heroes } from "@/lib/HeroCards";
import { Locations } from "@/lib/LocationCards";
import { Maneuvers } from "@/lib/ManeuverCards";
import { Villains } from "@/lib/VillainCards";

const open = ref([]);

const cardStore = useCardStore();

const addToHand = (card: Card) => {
  cardStore.addToHand(card);
};
</script>
<style>
@import "../assets/variables.css";

.ally-group {
  border-right: 5px solid var(--ally);
}
.hero-group {
  border-right: 5px solid var(--hero);
}
.condition-group {
  border-right: 5px solid var(--condition);
}
.equipment-group {
  border-right: 5px solid var(--equipment);
}
.location-group {
  border-right: 5px solid var(--location);
}
.maneuver-group {
  border-right: 5px solid var(--maneuver);
}
.villain-group {
  border-right: 5px solid var(--villain);
}
</style>
