<script setup>

</script>

<template>
  <nav>
    <div>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/map">Map</NuxtLink>
      <NuxtLink to="/grid">Grid</NuxtLink>
      <NuxtLink to="/game">Game</NuxtLink>
  </div>
  </nav>
</template>

<style>
nav {
  background: linear-gradient(0.25turn, lightgray, white);
  background: linear-gradient(0.25turn, #b8b3b2, white);
  color: seagreen;
  padding: 7px 0px 11px 11px;
  border-radius: 3px;

  text-decoration: none;
  font-weight: bold;

  /*margin: 20px 0px 25px 0px*/

}

a {
  display: inline-block;
  color: inherit;

  font-size: 25px;
  margin: 0px 10px;

  text-decoration: none;

  transition: all .11s ease-in-out;
}


a:hover {
  color: rgb(0, 79, 0);
}

a.router-link-active {
  color: #333333
}
</style>
