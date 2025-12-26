<template>
  <b-row class="justify-content-center">
    <b-col cols="12" md="8">
      <b-card title="Nouvelle discussion">
        <b-form @submit.prevent="handleCreate">
          <b-form-group label="Titre" label-for="title">
            <b-form-input
              id="title"
              v-model="title"
              required
            />
          </b-form-group>

          <b-form-group label="Catégorie" label-for="category">
            <b-form-select
              id="category"
              v-model="categoryId"
              :options="categoryOptions"
              required
            />
          </b-form-group>

          <b-form-group label="Contenu" label-for="content">
            <b-form-textarea
              id="content"
              v-model="content"
              rows="5"
              required
            />
          </b-form-group>

          <b-button type="submit" variant="success" :disabled="loading">
            <span v-if="loading">
              <b-spinner small class="me-2" /> Création...
            </span>
            <span v-else>
              Créer la discussion
            </span>
          </b-button>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '@/firebase/config'

const router = useRouter()
const authStore = useAuthStore()

const title = ref('')
const content = ref('')
const categoryId = ref('')
const categories = ref([])
const loading = ref(false)

const categoryOptions = computed(() => [
  { value: '', text: 'Sélectionner une catégorie' },
  ...categories.value.map(c => ({ value: c.id, text: c.name }))
])

const fetchCategories = async () => {
  const snapshot = await getDocs(collection(db, 'categories'))
  categories.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

const handleCreate = async () => {
  if (!authStore.user) return

  loading.value = true
  try {
    const docRef = await addDoc(collection(db, 'discussions'), {
      title: title.value,
      content: content.value,
      categoryId: categoryId.value,
      authorId: authStore.user.uid,
      authorName: authStore.user.displayName || authStore.user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0,
      responsesCount: 0
    })
    router.push({ name: 'discussion', params: { id: docRef.id } })
  } finally {
    loading.value = false
  }
}

onMounted(fetchCategories)
</script>
