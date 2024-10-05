<script setup>
import wasm_bindgen from '@/rustlike';


definePageMeta({
  layout: false,
});



onMounted(async () => {
  console.log(localStorage.getItem("dirty"))
  await wasm_bindgen("/rustlike_bg.wasm");
  if (localStorage.getItem("dirty") === 'true') {

    localStorage.setItem("dirty", false);
    location.reload()
  }
})

onBeforeUnmount(() => {
  localStorage.setItem("dirty", true);
})

</script>

<template>
  <NuxtLayout name="game">
    <body>
      <canvas id="canvas" width="640" height="480"></canvas>
    </body>
  </NuxtLayout>
</template>


<style>
.center {}
</style>