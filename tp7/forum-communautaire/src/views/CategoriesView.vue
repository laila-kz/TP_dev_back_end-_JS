<template>
  <div>
    <h2>Catégories</h2>
    <b-row class="mt-3">
      <b-col
        v-for="cat in categories"
        :key="cat.id"
        cols="12"
        md="4"
        class="mb-3"
      >
        <CategoryCard :category="cat" />
      </b-col>
    </b-row>

    <div v-if="loading" class="text-center">
      <b-spinner />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/firebase/config'
import CategoryCard from '@/components/CategoryCard.vue'

const categories = ref([])
const loading = ref(false)

const fetchCategories = async () => {
  loading.value = true
  try {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'))
    const snapshot = await getDocs(q)
    categories.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } finally {
    loading.value = false
  }
}

onMounted(fetchCategories)
</script>
