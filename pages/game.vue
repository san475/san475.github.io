<script setup>
import wasm_bindgen from '@/rustlike';


definePageMeta({
  layout: false,
});

onMounted(async () => {
    await wasm_bindgen("/rustlike_bg.wasm");
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
.center {
}

</style>