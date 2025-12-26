<template>
  <div class="app-root">
    <Navbar />
    <main class="app-main">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>


<style>
.app-root {
  min-height: 100vh;
  background: #f5f7fb;
}

.app-main {
  padding: 2rem 0 3rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
.app-main {
  padding: calc(70px + 2rem) 0 3rem;
}

/* For mobile */
@media (max-width: 768px) {
  .app-main {
    padding: calc(60px + 2rem) 0 3rem;
  }
}
</style>