<script setup>
import { reactive, ref, toRaw } from 'vue'

import Cell from './Cell.vue'

const cellSize = ref('75px')

const setupGrid = () => {

  let key = 1;

  const grid = reactive({ array: [] })
  let templateRow = []

  for (let i = 0; i < 10; i++) {
    for (let i = 0; i < 10; i++) {
      templateRow.push({ key: key++, value: 0, backColor: 'darkslategray' })
    }
    grid.array.push(templateRow)
    templateRow = []
  }

  //console.log('grid: ', grid)
  return grid;
}

let grid = ref([]);
grid.value = setupGrid()

const receiveEmit = (event) => {
  const keyToY = (key) => {
    return Math.floor((key - 1) / 10)
  }
  const keyToX = (key) => {
    return (key - 1) % 10 
  }
  /*
  */
  console.log('TEST')
  console.log(event)
  console.log(keyToX(event), keyToY(event))
  console.log(grid.value.array[keyToX(event)][keyToY(event)])

  grid.value.array[keyToY(event)][keyToX(event)].backColor = 'slategray'

}


</script>

<template>
  <div class="container">
    <div v-for="row in grid.array" class="row">
      <Cell v-for="tile in row" :cellKey="tile.key" :cellSize="cellSize" :backColor="tile.backColor"
        @cellClick="receiveEmit" />
    </div>
    <button @click="grid = setupGrid()">clear</button>
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