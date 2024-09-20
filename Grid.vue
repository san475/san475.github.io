<script setup>
import { ref } from 'vue'

import Cell from './Cell.vue'

const cellSize= ref('75px')

const grid = ref([])
const templateRow = ref([])

for (let i = 0; i < 10; i++) {
  templateRow.value.push(0)

}
console.log(templateRow)
for (let i = 0; i < 10; i++) {
  grid.value.push(templateRow.value)
}


</script>

<template>
  <div class="container">
    <div class="row" v-for="row in grid">
      <Cell :cellSize="cellSize" v-for="tile in row"/>
    </div>
  </div>
</template>

<style>
.container {
  display: inline-block;
  padding: 25px 25px 25px 25px;
  background-color: darkgray;
}

.row {
  width: 100%;
  display: flex;
}


</style>