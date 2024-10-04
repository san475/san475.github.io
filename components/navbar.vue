<script setup>

</script>

<template>
  <nav>
    <div>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/resume" prefetch>Resume</NuxtLink>
      <NuxtLink to="/grid">Grid</NuxtLink>
      <NuxtLink to="/game">Game</NuxtLink>
  </div>
  </nav>
</template>

<style>
nav {
  background: linear-gradient(0.25turn, lightgray, white);
  color: seagreen;
  padding: 7px 0px 11px 11px;
  border-radius: 3px;

  text-decoration: none;
  font-weight: bold;

  /*margin: 20px 0px 25px 0px*/

}

a {
  display: inline-block;
  font-size: 25px;
  margin: 0px 10px;
  color: inherit;
  text-decoration: none;
  transition: all .11s ease-in-out;
}


a:hover {
  color: black;
}

a.router-link-active {
  color: #333333
}
</style>
