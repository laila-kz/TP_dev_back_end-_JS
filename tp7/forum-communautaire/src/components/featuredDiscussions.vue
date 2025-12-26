<template>
  <b-card class="trending-tags">
    <b-card-title>Tags populaires</b-card-title>
    <div class="tags-container">
      <b-badge 
        v-for="tag in trendingTags" 
        :key="tag.name"
        :variant="tag.variant"
        pill
        class="tag-badge me-2 mb-2"
        :to="tag.link"
      >
        {{ tag.name }}
        <b-badge variant="light" pill class="ms-1">{{ tag.count }}</b-badge>
      </b-badge>
    </div>
  </b-card>
</template>

<script setup>
const trendingTags = [
  { name: 'vuejs', variant: 'primary', count: 128, link: '#' },
  { name: 'firebase', variant: 'success', count: 95, link: '#' },
  { name: 'javascript', variant: 'warning', count: 156, link: '#' },
  { name: 'webdev', variant: 'info', count: 87, link: '#' },
  { name: 'bootstrap', variant: 'danger', count: 42, link: '#' },
  { name: 'pinia', variant: 'dark', count: 31, link: '#' },
  { name: 'composition-api', variant: 'primary', count: 58, link: '#' },
  { name: 'firestore', variant: 'success', count: 72, link: '#' }
]
</script>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
}

.tag-badge {
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>