<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { CellColor, keyToX, keyToY, getCellFromKey, setupGrid } from '~/utils/grid.js';
import Cell from './Cell.vue'


const cellSize: Ref<number> = ref(75)
const gridSize: Ref<number> = ref(11)
const cellHue: Ref<number> = ref(0)

let grid: Ref<GridObject> = ref(reactive({ array: [], mine: { x: 0, y: 0 }, message: "" }));

let gravity: Ref<boolean> = ref(false)
let party_mode: Ref<boolean> = ref(false)

let mouseHeldDown: boolean = false;

let gravity_interval: NodeJS.Timeout;

grid.value = setupGrid(gridSize.value);


onBeforeMount(() => {
  window.addEventListener('mouseup', mouseupHandler)
  window.addEventListener('mousedown', mousedownHandler)
  gravity_interval = setInterval(processGravity, 500)

})
onBeforeUnmount(() => {
  window.removeEventListener('mouseup', mouseupHandler)
  window.removeEventListener('mousedown', mousedownHandler)
  clearInterval(gravity_interval)
})


const togglePartyMode = () => { party_mode.value = !party_mode.value }
const toggleGravity = () => { gravity.value = !gravity.value }


const processGravity = () => {
  if (!gravity.value)
    return;

  const toBeDisabled: CellObject[] = []
  const toBeEnabled: CellObject[] = []

  for (const row of grid.value.array) {
    for (const cell of row) {
      if (cell.active) {
        toBeDisabled.push(cell)

        if (cell.key + gridSize.value <= gridSize.value ** 2) {
          let new_cell = getCellFromKey(grid.value, cell.key + gridSize.value, gridSize.value)
          toBeEnabled.push(new_cell)
        }
      }
    }
  }

  for (const cell of toBeDisabled) {
    cell.active = false;
    cell.backColor = CellColor.disabled
  }

  for (const cell of toBeEnabled) {
    if (cell.key <= gridSize.value ** 2) {
      setEnabledCellColor(cell, party_mode.value, cellHue)
      cell.active = true;
    }
  }
}


const cellActivationHandler = (key: number, grid: GridObject, gridSize: Ref<number>) => {

  let x = keyToX(key, gridSize.value)
  let y = keyToY(key, gridSize.value)

  let cell = getCellFromKey(grid, key, gridSize.value);

  if (y === grid.mine.y && x === grid.mine.x) {
    cell.backColor = CellColor.mine;
    grid.message = "Wow!  1 in " + (gridSize.value ** 2)
  }
  else {
    setEnabledCellColor(cell, party_mode.value, cellHue);
  }
  cell.active = true;
}


const emittedHoverHandler = (key: number) => {
  if (!mouseHeldDown)
    return;

  cellActivationHandler(key, grid.value, gridSize)
}


const emittedClickDownHandler = (key: number) => {
  cellActivationHandler(key, grid.value, gridSize)
}


const mouseupHandler = () => {
  mouseHeldDown = false;
}
const mousedownHandler = () => {
  mouseHeldDown = true;
}


const gridSizeButtonHandler = (amount: number) => {
  gridSize.value += amount;
  grid.value = setupGrid(gridSize.value);
}
const cellSizeButtonHandler = (amount: number) => {
  cellSize.value += amount;
  grid.value = setupGrid(gridSize.value);
}
</script>

<template>
  <div class="container">
    <h2>
      <div>{{ grid.message }}</div>
    </h2>
    <div class="button-container">
      <div>
        <button @click="grid = setupGrid(gridSize)">Reset</button>
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
          <span v-if="!gravity"> Turn Gravity On </span>
          <span v-else> Turn Gravity Off </span>
        </button>
      </div>
      <div>
        <button @click="togglePartyMode">
          <span v-if="!party_mode"> Turn Party Mode On </span>
          <span v-else> Turn Party Mode Off </span>
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