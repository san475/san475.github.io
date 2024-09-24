<script setup>
const props = defineProps(['cellSize', 'cellKey', 'backColor'])


</script>

<template>
  <div class="cell" @click="$emit('cellClick', props.cellKey)">
    {{ props.cellKey }}
  </div>
</template>

<style>
.cell {
  width: v-bind('props.cellSize');
  height: v-bind('props.cellSize');
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