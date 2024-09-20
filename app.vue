<script setup>

import Grid from './Grid.vue';

import {reactive, onMounted} from 'vue'

const counter = reactive({count: 0});
const now = new Date();

onMounted(() => setInterval(() => {
  console.log('test', counter)
  const then = new Date();
  counter.count =  (then - now )/ 1000
}, 10))

</script>

<template>
  <div>
    <div class="center">
      <h1>Francisco Website</h1>
      <h2> time here: {{ counter.count }} seconds</h2>
    <Grid/>
    </div>
  </div>
</template>

<style>
body {
  background-color: black;

}

.center {
  padding: 32px;
  margin: 32px;
  background-color: white;
  border-radius: 5px;

}

h1 {
  color: gray;
}
</style>
