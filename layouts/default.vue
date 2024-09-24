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
  <navbar />
  <div class="center">
    <h1>Francisco Website</h1>
    <h2> time here: {{ counter.count }} seconds</h2>
    <slot />
  </div>
</template>

<style>
:root {
  font-family: Arial, Helvetica, sans-serif;

  margin: 0px 0px 0px 0px;
  padding: 10px 20px 0px 20px;
}

body {
  background-color: black;
}

.center {
  padding: 10px 22px 22px 22px;
  background-color: white;
  border-radius: 0px 0px 3px 3px;
}

h1 {
  color: gray;
}
</style>
