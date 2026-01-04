<template>
  <div class="filter-nav">
    <h3>Filter Jobs</h3>
    <input v-model="q" placeholder="Search title or company..." @input="emitFilter" />
    <select v-model="category" @change="emitFilter">
      <option value="">All categories</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>

    <select v-model="type" @change="emitFilter">
      <option value="">All types</option>
      <option value="full-time">Full-time</option>
      <option value="part-time">Part-time</option>
      <option value="remote">Remote</option>
      <option value="on-site">On-site</option>
      <option value="internship">Internship</option>
    </select>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  name: "FilterNav",
  props: {
    jobs: { type: Array, default: () => [] }
  },
  setup(props, { emit }) {
    const q = ref('')
    const category = ref('')
    const type = ref('')

    const categories = computed(() => {
      const set = new Set(props.jobs.map(j => j.category).filter(Boolean))
      return Array.from(set)
    })

    function emitFilter() {
      emit('filter', { q: q.value, category: category.value, type: type.value })
    }

    // watch for jobs change to refresh categories
    watch(() => props.jobs, () => {}, { deep: true })

    return { q, category, type, categories, emitFilter }
  }
}
</script>