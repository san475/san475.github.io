<script setup>
const props = defineProps(['cellSize', 'cellKey', 'backColor'])


</script>

<template>
  <div class="cell" 
  @mousedown="$emit('cellClickDown', props.cellKey)" 
  @mouseup="$emit('cellClickUp', props.cellKey)"
  @mouseover="$emit('cellHover', props.cellKey)">
    {{ }}
  </div>
</template>

<style>
.cell {
  color: lightgray;
  width: v-bind('props.cellSize');
  height: v-bind('props.cellSize');
  width: 5vw;
  height: 5vw;
  margin: 2px;
  background-color: v-bind("props.backColor");
  display: flex;
  border-radius: 3px;
}

.cell:hover {
  background-color: white;
  transition: all .04s ease-in;
}
</style>