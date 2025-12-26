<template>
  <b-card>
    <b-card-title>
      <router-link :to="{ name: 'category-discussions', params: { id: category.id } }">
        {{ category.name }}
      </router-link>
    </b-card-title>
    <b-card-text>
      {{ category.description }}
    </b-card-text>
  </b-card>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>
