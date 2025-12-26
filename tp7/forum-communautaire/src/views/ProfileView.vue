<template>
  <b-row class="justify-content-center">
    <b-col cols="12" md="6">
      <b-card title="Profil utilisateur">
        <div v-if="user">
          <b-form @submit.prevent="handleSave">
            <b-form-group label="Nom d'affichage">
              <b-form-input v-model="displayName" required />
            </b-form-group>

            <b-form-group label="E-mail">
              <b-form-input :value="user.email" disabled />
            </b-form-group>

            <b-form-group label="Bio">
              <b-form-textarea v-model="bio" rows="3" />
            </b-form-group>

            <b-form-group label="Rôle">
              <b-form-input :value="user.role" disabled />
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="saving">
              <span v-if="saving">
                <b-spinner small class="me-2" /> Sauvegarde...
              </span>
              <span v-else>
                Enregistrer
              </span>
            </b-button>
          </b-form>
        </div>
        <div v-else>
          <p>Utilisateur non connecté.</p>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

const authStore = useAuthStore()

const user = authStore.user

const displayName = ref(user?.displayName || '')
const bio = ref(user?.bio || '')
const saving = ref(false)

watch(
  () => authStore.user,
  (newUser) => {
    if (newUser) {
      displayName.value = newUser.displayName || ''
      bio.value = newUser.bio || ''
    }
  },
  { immediate: true }
)

const handleSave = async () => {
  if (!authStore.user) return
  saving.value = true
  try {
    await updateDoc(doc(db, 'users', authStore.user.uid), {
      displayName: displayName.value,
      bio: bio.value
    })
    // mettre à jour dans le store
    authStore.user.displayName = displayName.value
    authStore.user.bio = bio.value
  } finally {
    saving.value = false
  }
}
</script>
