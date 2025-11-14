<template>
  <div id="app">
    <header class="header">
      <h1 @click="$router.push('/')">Jobs App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/add">Add Job</router-link>
      </nav>
    </header>
    <main class="container">
      <router-view />
    </main>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
