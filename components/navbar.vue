
<script setup>

</script>

<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>
   <!-- <NuxtLink to="/game">Game</NuxtLink> -->
    <NuxtLink to="/grid">Grid</NuxtLink>
  </nav>
</template>

<style>
nav {
  display: inline-block;
  background-color: lightgray;
  color: seagreen;
  padding: 7px 0px 11px 22px;
  border-radius: 3px;

  display: grid;
  grid-row-end:span;
  grid-template: 25px/repeat(auto-fit, 25px);
  grid-gap: 60px;
  text-decoration: none;
  font-weight: bold;

  /*margin: 20px 0px 25px 0px*/

}
a{
  display: block;
  font-size: 25px;
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
