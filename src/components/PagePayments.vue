<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1 class="test--bmod">Page cards</h1>
</template>

<style lang="scss" scoped>
.test {
  color: sandybrown;
  &--bmod {
    color: seagreen;
    font-size: 1.1rem;
  }
  &__el {
    color: aqua;
    &--mod {
      color: red;
    }
  }
}
</style>
