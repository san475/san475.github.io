<script setup>

import {reactive, onMounted} from 'vue'

const counter = reactive({count: 0});

onMounted(() => setInterval(() => {
  console.log('test', counter)
  counter.count++;
}, 1000))

</script>
<template>
  <div>
    <div class="center">
      <h1>Francisco Website test</h1>
      <h2> time here: {{ counter.count }}</h2>
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

}

h1 {
  color: gray;
}
</style>
