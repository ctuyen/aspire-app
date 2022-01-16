<script setup lang="ts">
import { ref, computed } from "vue";

defineProps<{ msg: string }>();

const menus = computed(() => [
  {
    name: "Home",
    icon: "Logo",
    selected: false,
  },
  {
    name: "Cards",
    icon: "pay",
    selected: false,
  },
  {
    name: "Payments",
    icon: "payment",
    selected: false,
  },
  {
    name: "Credit",
    icon: "Credit",
    selected: false,
  },
  {
    name: "Profile",
    icon: "Account",
    selected: false,
  },
]);
</script>

<template>
  <div v-for="(menu, i) in menus" class="test--bmod">
    {{ menu.name }}
  </div>
</template>

<style lang="scss" scoped></style>
