<script setup>
import { reactive, ref } from 'vue'

import Cell from './Cell.vue'

const cellSize = ref('75px')
const gridSize = ref(5);

let mine = [1, 2];

let mouseHeldDown = false;

let message = ref("Find the mine?")


const setupGrid = () => {

  message.value = "Find the mine?";

  mine = [Math.floor(Math.random() * gridSize.value), Math.floor(Math.random() * gridSize.value)]

  let key = 1;

  const grid = reactive({ array: [] })
  let templateRow = []

  for (let i = 0; i < gridSize.value; i++) {
    for (let i = 0; i < gridSize.value; i++) {
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

const cellActivationHandler = (event) => {

  const keyToY = (key) => {
    return Math.floor((key - 1) / gridSize.value)
  }
  const keyToX = (key) => {
    return (key - 1) % gridSize.value
  }

  const y = keyToY(event)
  const x = keyToX(event)

  if (y === mine[1] && x === mine[0]) {
    grid.value.array[y][x].backColor = 'maroon'
    message.value = "Wow!  1 in " + (gridSize.value ** 2)
  }
  else
    grid.value.array[y][x].backColor = 'slategray'
}

const emittedHoverHandler = (event) => {
  if (!mouseHeldDown)
    return;

  cellActivationHandler(event)
}
const emittedClickDownHandler = (event) => {
  mouseHeldDown = true;
  cellActivationHandler(event)
}

const mouseupHandler = (event) => {
  mouseHeldDown = false;
}
onBeforeMount(() => {
  window.addEventListener('mouseup', mouseupHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('mouseup', mouseupHandler)
})

const gridSizeButtonHandler = (amount) => {
  gridSize.value += amount;
  grid.value = setupGrid();
}


</script>

<template>
  <div class="container">
    <h2>
      <div>{{ message }}</div>
    </h2>
    <div class="button-container">
      <span>
        <button @click="grid = setupGrid()">Reset</button>
      </span>
      <span>
        Grid Size:
        <button @click="gridSizeButtonHandler(-1)">-</button>
        {{ gridSize }}
        <button @click="gridSizeButtonHandler(1)">+</button>
      </span>
    </div>
    <div v-for="row in grid.array" class="row">
      <Cell v-for="tile in row" :cellKey="tile.key" :cellSize="cellSize" :backColor="tile.backColor"
        @cellClickDown="emittedClickDownHandler" @cellHover="emittedHoverHandler" />
    </div>
  </div>
</template>

<style>
.container {
  width: fit-content;
  padding: 25px 25px 25px 25px;
  background-color: darkgray;
}
.button-container {
  width:100%;
  margin: auto;
}

button {
  background-color: black;
  color: lightgray;
  border: 0;
  border-radius: 2px;
  margin: 5px 2px;
}

.row {
  width: 100%;
  display: flex;
}

h2 {
  margin: 5px 0px;
}
</style>