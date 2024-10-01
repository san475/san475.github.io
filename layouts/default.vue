<script setup>
import navbar from '~/components/navbar.vue';
import { reactive, onMounted } from 'vue'

const counter = reactive({ count: 0 });
const now = new Date();
onMounted(() => setInterval(() => {
  const then = new Date();
  counter.count = Math.floor((then - now) / 1000)
}, 10))
</script>

<template>
  <div class="center">
    <navbar />
    <div class="content">
      <h1>Francisco Esteve</h1>
      <h2> Your time here: {{ counter.count }} seconds</h2>
      <slot />
    </div>
  </div>
</template>

<style></style>
