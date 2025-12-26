<template>
  <div>
    <h2>Catégorie : {{ category?.name }}</h2>
    <p class="text-muted">{{ category?.description }}</p>

    <b-button
      variant="success"
      class="mb-3"
      :to="{ name: 'new-discussion' }"
    >
      Nouvelle discussion
    </b-button>

    <DiscussionCard
      v-for="d in discussions"
      :key="d.id"
      :discussion="d"
    />

    <p v-if="!loading && discussions.length === 0">
      Aucune discussion dans cette catégorie.
    </p>

    <div v-if="loading" class="text-center">
      <b-spinner />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import DiscussionCard from '@/components/DiscussionCard.vue'

const route = useRoute()
const categoryId = route.params.id

const category = ref(null)
const discussions = ref([])
const loading = ref(false)

const fetchCategory = async () => {
  const snap = await getDoc(doc(db, 'categories', categoryId))
  if (snap.exists()) {
    category.value = { id: snap.id, ...snap.data() }
  }
}

const fetchDiscussions = async () => {
  loading.value = true
  try {
    const q = query(
      collection(db, 'discussions'),
      where('categoryId', '==', categoryId)
    )
    const snapshot = await getDocs(q)
    discussions.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchCategory()
  await fetchDiscussions()
})
</script>
