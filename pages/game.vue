<script setup>

import * as rustlike from '/res/rustlike.js'

definePageMeta({
  layout: false,
});
console.log('rustlike', rustlike)

onBeforeMount(() => {
  window.addEventListener("load", async () => {
    await rustlike.wasm_bindgen("../res/rustlike_bg.wasm");
  })
});

useHead({
  script: [ rustlike ]
})
</script>

<template>
  <NuxtLayout name="game">
    <canvas id="canvas" width="640" height="480"></canvas>

  </NuxtLayout>
</template>


<style>
</style>