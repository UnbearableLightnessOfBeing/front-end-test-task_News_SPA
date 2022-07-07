<template>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/posts">Новости</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
button {
  border: 1px dotted black;
  border-radius: 0.75rem;
  height: 3rem;
  width:10rem;
  background: white;
}
button:hover {
  background: #e7e7e7;
  cursor: pointer;
}
</style>
