<script setup>
const props = defineProps(['cellSize'])

</script>

<template>
  <div class="cell">
  </div>
</template>

<style>
.cell {
  width: v-bind('props.cellSize');
  height: v-bind('props.cellSize');
  margin: 2px;
  background-color: darkslategray;
  display: flex;
  border-radius: 3px;
}

.cell:hover {
  background-color: slategray;
  transition: all .04s ease-in;
}
</style>