<script>
</script>

<template>

  <link rel="preconnect" href="https://rsms.me/">
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

  <NuxtLoadingIndicator :throttle="0" :height="3" class="bg-orange" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

</template>
<style>
:root {
  font-family: Inter, sans-serif;
  font-feature-settings: 'liga' 1, 'calt' 1;
  /* fix for Chrome */
}

@supports (font-variation-settings: normal) {
  :root {
    font-family: InterVariable, sans-serif;
  }
}

html {

  font-family: Arial, Helvetica, sans-serif;

  margin: 0px 0px 0px 0px;
  padding: 10px 20px 0px 20px;

  height: calc(100% - 1em);
  width: 100%;
  background: radial-gradient(circle at 100% 0%, #000000, transparent 100%), linear-gradient(65deg, #1e2d1c, rgb(18, 18, 18) 50%);
  background-attachment: fixed;


  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

html::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
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
