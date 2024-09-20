<script setup>
import { ref } from 'vue'

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
      <div class="cell" v-for="tile in row">
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: inline;

}

.row {
  width: 100%;
  display: flex;
}

.cell {
  width: v-bind('cellSize');
  height: v-bind('cellSize');
  margin: 1px;
  background-color: darkslategray;
  display: flex;
}
</style>