<template>
  <div v-if="discussion">
    <b-card class="mb-3">
      <b-card-title>{{ discussion.title }}</b-card-title>
      <b-card-sub-title class="mb-2 text-muted">
        Par {{ discussion.authorName }} •
        {{ formattedDate }}
      </b-card-sub-title>
      <b-card-text>
        {{ discussion.content }}
      </b-card-text>
    </b-card>

    <b-card class="mb-3">
      <b-card-title>Réponses ({{ responses.length }})</b-card-title>
      <ResponseItem
        v-for="r in responses"
        :key="r.id"
        :response="r"
        :can-edit="canEdit(r)"
        @updated="fetchResponses"
        @deleted="fetchResponses"
      />
      <p v-if="!loadingResponses && responses.length === 0">
        Aucune réponse pour le moment.
      </p>
    </b-card>

    <b-card v-if="authStore.user">
      <b-card-title>Ajouter une réponse</b-card-title>
      <b-form @submit.prevent="handleAddResponse">
        <b-form-textarea
          v-model="newResponse"
          rows="3"
          placeholder="Écrire une réponse..."
          required
        />
        <b-button type="submit" variant="primary" class="mt-2" :disabled="adding">
          <span v-if="adding">
            <b-spinner small class="me-2" /> Envoi...
          </span>
          <span v-else>
            Répondre
          </span>
        </b-button>
      </b-form>
    </b-card>
    <b-alert v-else variant="info" show class="mt-3">
      Connectez-vous pour répondre à cette discussion.
    </b-alert>
  </div>

  <div v-else-if="loadingDiscussion" class="text-center">
    <b-spinner />
  </div>
  <div v-else>
    <p>Discussion introuvable.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  increment
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuthStore } from '@/stores/auth'
import ResponseItem from '@/components/ResponseItem.vue'

const route = useRoute()
const authStore = useAuthStore()

const discussionId = route.params.id
const discussion = ref(null)
const loadingDiscussion = ref(false)

const responses = ref([])
const loadingResponses = ref(false)

const newResponse = ref('')
const adding = ref(false)

const formattedDate = computed(() => {
  if (!discussion.value?.createdAt?.toDate) return ''
  return discussion.value.createdAt.toDate().toLocaleString()
})

const fetchDiscussion = async () => {
  loadingDiscussion.value = true
  try {
    const snap = await getDoc(doc(db, 'discussions', discussionId))
    if (snap.exists()) {
      discussion.value = { id: snap.id, ...snap.data() }
      // Incrémenter le nombre de vues
      await updateDoc(doc(db, 'discussions', discussionId), {
        views: increment(1)
      })
    }
  } finally {
    loadingDiscussion.value = false
  }
}

const fetchResponses = async () => {
  loadingResponses.value = true
  try {
    const q = query(
      collection(db, 'responses'),
      where('discussionId', '==', discussionId)
    )
    const snapshot = await getDocs(q)
    responses.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } finally {
    loadingResponses.value = false
  }
}

const handleAddResponse = async () => {
  if (!newResponse.value.trim()) return
  if (!authStore.user) return

  adding.value = true
  try {
    await addDoc(collection(db, 'responses'), {
      content: newResponse.value.trim(),
      discussionId,
      authorId: authStore.user.uid,
      authorName: authStore.user.displayName || authStore.user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    await updateDoc(doc(db, 'discussions', discussionId), {
      responsesCount: increment(1)
    })

    newResponse.value = ''
    await fetchResponses()
  } finally {
    adding.value = false
  }
}

const canEdit = (response) => {
  return authStore.user && response.authorId === authStore.user.uid
}

onMounted(async () => {
  await fetchDiscussion()
  await fetchResponses()
})
</script>
