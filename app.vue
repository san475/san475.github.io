<script>
</script>

<template>
  <NuxtLoadingIndicator :throttle="0" :height="3" class="bg-orange" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

</template>
<style>
html {

  font-family: Arial, Helvetica, sans-serif;

  margin: 0px 0px 0px 0px;
  padding: 10px 20px 0px 20px;

  height: calc(100% - 1em);
  width: 100%;
  background: radial-gradient(circle at 100% 0%, #000000, transparent 100%), linear-gradient(65deg, #1e2d1c, rgb(18, 18, 18) 50%);

  overflow-x: hidden;
}

.center {
  background-color: white;
  border-radius: 3px 3px 3px 3px;

  margin: auto;
  width: 100%;
  max-width: 1000px;

}

.content {
  padding: 10px 22px 22px 22px;
}

h1 {
  color: gray;
}
</style>
