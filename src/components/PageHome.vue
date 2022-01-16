<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Layout from "./Layout.vue";

const store = useStore();

// defineProps<{ msg: string }>();

const status = computed(() => {
  return store.state.card.status;
});
</script>

<template>
  <Layout>
    <h1 class="">Page home {{ status }}</h1>
  </Layout>
</template>

<style scoped></style>
