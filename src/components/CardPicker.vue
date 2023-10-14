<template>
  <v-list v-model:opened="open" width="300" compact>
    <v-list-group value="Ally" class="ally-group">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Ally"></v-list-item>
      </template>

      <v-list-item
        v-for="card in Allies"
        :key="card.name"
        :value="card"
        ripple
        @click="addToHand(card)"
        >{{ card.name }}</v-list-item
      >
    </v-list-group>

    <v-list-group value="Condition" class="condition-group">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Condition"></v-list-item>
      </template>

      <v-list-item
        v-for="card in Condition"
        :key="card.name"
        :value="card"
        ripple
        @click="addToHand(card)"
        >{{ card.name }}</v-list-item
      >
    </v-list-group>

    <v-list-group value="Equipment" class="equipment-group">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Equipment"></v-list-item>
      </template>

      <v-list-item
        v-for="card in Equipment"
        :key="card.name"
        :value="card"
        ripple
        @click="addToHand(card)"
        >{{ card.name }}</v-list-item
      >
    </v-list-group>

    <v-list-group value="Hero" class="hero-group">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Hero"></v-list-item>
      </template>

      <v-list-item
        v-for="card in Heroes"
        :key="card.name"
        :value="card"
        ripple
        @click="addToHand(card)"
        >{{ card.name }}</v-list-item
      >
    </v-list-group>

    <v-list-group value="Location" class="location-group">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Location"></v-list-item>
      </template>

      <v-list-item
        v-for="card in Locations"
        :key="card.name"
        :value="card"
        ripple
        @click="addToHand(card)"
        >{{ card.name }}</v-list-item
      >
    </v-list-group>

    <v-list-group value="Maneuver" class="maneuver-group">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Maneuver"></v-list-item>
      </template>

      <v-list-item
        v-for="card in Maneuvers"
        :key="card.name"
        :value="card"
        ripple
        @click="addToHand(card)"
        >{{ card.name }}</v-list-item
      >
    </v-list-group>
    <v-list-group value="Villain" class="villain-group">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Villain"></v-list-item>
      </template>

      <v-list-item
        v-for="card in Villains"
        :key="card.name"
        :value="card"
        ripple
        @click="addToHand(card)"
        >{{ card.name }}</v-list-item
      >
    </v-list-group>
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
