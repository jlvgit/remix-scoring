<template>
  <v-row class="ma-3">
    <CardPicker></CardPicker>
    <CardDisplay></CardDisplay>
  </v-row>
</template>

<script setup lang="ts">
// Components
import CardPicker from "./CardPicker.vue";
import CardDisplay from "./CardDisplay.vue";
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
