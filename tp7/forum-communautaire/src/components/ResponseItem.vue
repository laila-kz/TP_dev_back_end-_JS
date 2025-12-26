<template>
  <b-card class="mb-2">
    <b-card-subtitle class="mb-1 text-muted">
      {{ response.authorName }} •
      {{ response.createdAt?.toDate ? response.createdAt.toDate().toLocaleString() : '' }}
    </b-card-subtitle>

    <div v-if="editing">
      <b-form-textarea v-model="editContent" rows="3" />
      <b-button size="sm" variant="primary" class="mt-2 me-2" @click="saveEdit">
        Enregistrer
      </b-button>
      <b-button size="sm" variant="secondary" class="mt-2" @click="cancelEdit">
        Annuler
      </b-button>
    </div>
    <div v-else>
      <b-card-text>
        {{ response.content }}
      </b-card-text>
      <div v-if="canEdit" class="small">
        <b-button size="sm" variant="link" @click="editing = true">
          Modifier
        </b-button>
        <b-button size="sm" variant="link" class="text-danger" @click="deleteResponse">
          Supprimer
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import { ref } from 'vue'
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase/config'

const props = defineProps({
  response: {
    type: Object,
    required: true
  },
  canEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['updated', 'deleted'])

const editing = ref(false)
const editContent = ref(props.response.content)

const saveEdit = async () => {
  await updateDoc(doc(db, 'responses', props.response.id), {
    content: editContent.value,
    updatedAt: serverTimestamp()
  })
  editing.value = false
  emit('updated')
}

const cancelEdit = () => {
  editContent.value = props.response.content
  editing.value = false
}

const deleteResponse = async () => {
  if (!confirm('Supprimer cette réponse ?')) return
  await deleteDoc(doc(db, 'responses', props.response.id))
  emit('deleted')
}
</script>
