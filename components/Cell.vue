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

  transition: all .1s ease-in-out;
}

.cell:hover {
  background-color: color-mix(in HSL, v-bind("props.backColor") 80%, rgb(255, 255, 255));
}
</style>