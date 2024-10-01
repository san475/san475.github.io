<script setup>
import navbar from '~/components/navbar.vue';

</script>

<template>
  <div class="center">
    <navbar />
    <div class="content">
    <slot />
    </div>
  </div>
</template>

<style>
</style>
