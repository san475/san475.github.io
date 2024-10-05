<script setup>
import { reactive, ref } from 'vue'

import Cell from './Cell.vue'

const cellSize = ref(85)
const gridSize = ref(10);

let pg_interval;
onBeforeMount(() => {
  window.addEventListener('mouseup', mouseupHandler)
  pg_interval = setInterval(processGravity, 500)

})
onBeforeUnmount(() => {
  window.removeEventListener('mouseup', mouseupHandler)
  clearInterval(pg_interval)
})

const keyToY = (key) => {
  return Math.floor((key - 1) / gridSize.value)
}
const keyToX = (key) => {
  return (key - 1) % gridSize.value
}


const getCellFromKey = (grid, key) => {
  const keyToY = (key) => {
    return Math.floor((key - 1) / gridSize.value)
  }
  const keyToX = (key) => {
    return (key - 1) % gridSize.value
  }

  let x = keyToX(key)
  let y = keyToY(key)

  return grid.value.array[y][x]
}

let gravity = ref(false)
const toggleGravity = () => { gravity.value = !gravity.value }
const processGravity = () => {
  if (!gravity.value)
    return;

  const toBeDisabled = []
  const toBeEnabled = []
  for (const row of grid.value.array) {
    for (const cell of row) {
      if (cell.backColor === 'slategray') {
        toBeDisabled.push(cell)
        if (cell.key + gridSize.value <= gridSize.value ** 2) {
          let new_cell = getCellFromKey(grid, cell.key + gridSize.value)
          toBeEnabled.push(new_cell)
        }
      }
    }
  }

  for (const cell of toBeDisabled) {
    cell.backColor = 'darkslategray'
  }
  for (const cell of toBeEnabled) {
    if (cell.key <= gridSize.value ** 2)
      cell.backColor = 'slategray'
  }
}



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

  return grid;
}

let grid = ref([]);
grid.value = setupGrid()

const cellActivationHandler = (key) => {

  let x = keyToX(key)
  let y = keyToY(key)

  let cell = getCellFromKey(grid, key);

  if (y === mine[1] && x === mine[0]) {
    cell.backColor = 'maroon'
    message.value = "Wow!  1 in " + (gridSize.value ** 2)
  }
  else
    cell.backColor = 'slategray'

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

const gridSizeButtonHandler = (amount) => {
  gridSize.value += amount;
  grid.value = setupGrid();
}

const cellSizeButtonHandler = (amount) => {
  cellSize.value += amount;
  grid.value = setupGrid();
}
</script>

<template>
  <div class="container">
    <h2>
      <div>{{ message }}</div>
    </h2>
    <div class="button-container">
      <div>
        <button @click="grid = setupGrid()">Reset</button>
      </div>
      <div>
        Grid Size:
        <button @click="gridSizeButtonHandler(-1)">-</button>
        {{ gridSize }}
        <button @click="gridSizeButtonHandler(1)">+</button>
      </div>
      <div>
        Cell Size:
        <button @click="cellSizeButtonHandler(-5)">-</button>
        {{ cellSize }}
        <button @click="cellSizeButtonHandler(5)">+</button>
      </div>
      <div>
        <button @click="toggleGravity">
          <span v-if="!gravity"> Gravity ON </span>
          <span v-else> Gravity OFF </span>
        </button>
      </div>
    </div>
    <div v-for="row in grid.array" class="row">
      <Cell v-for="tile in row" :cellKey="tile.key" :cellSize="cellSize + 'px'" :backColor="tile.backColor"
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
  width: 100%;
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