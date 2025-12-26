<template>
  <b-card class="mb-3 discussion-card">
    <div class="d-flex">
      <div class="discussion-stats text-center me-3">
        <div class="stat-item mb-2">
          <b-icon icon="eye" variant="info"></b-icon>
          <div class="stat-value">{{ discussion.views || 0 }}</div>
          <div class="stat-label">vues</div>
        </div>
        <div class="stat-item">
          <b-icon icon="chat-dots" variant="danger"></b-icon>
          <div class="stat-value">{{ discussion.responsesCount || 0 }}</div>
          <div class="stat-label">réponses</div>
        </div>
      </div>
      
      <div class="flex-grow-1">
        <b-card-title class="mb-2">
          <router-link :to="{ name: 'discussion', params: { id: discussion.id } }" class="discussion-title">
            {{ discussion.title }}
          </router-link>
        </b-card-title>
        
        <b-card-subtitle class="mb-2">
          <div class="d-flex align-items-center flex-wrap">
            <div class="user-info me-3 mb-1">
              <b-icon icon="person-circle" class="me-1"></b-icon>
              {{ discussion.authorName }}
            </div>
            <div class="date-info mb-1">
              <b-icon icon="clock" class="me-1"></b-icon>
              {{ formattedDate }}
            </div>
            <template v-if="discussion.categoryName">
              <b-badge variant="primary" class="ms-2 mb-1">
                {{ discussion.categoryName }}
              </b-badge>
            </template>
          </div>
        </b-card-subtitle>
        
        <b-card-text class="text-muted mb-3">
          {{ truncatedContent }}
        </b-card-text>
        
        <div class="discussion-tags">
          <b-badge v-if="discussion.isResolved" variant="success" class="me-2">
            <b-icon icon="check-circle" class="me-1"></b-icon>
            Résolu
          </b-badge>
          <b-badge v-if="discussion.isPinned" variant="warning" class="me-2">
            <b-icon icon="pin-angle" class="me-1"></b-icon>
            Épinglé
          </b-badge>
          <b-badge v-if="discussion.lastActivity" variant="info">
            <b-icon icon="activity" class="me-1"></b-icon>
            Actif {{ lastActivityTime }}
          </b-badge>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  discussion: {
    type: Object,
    required: true
  }
})

const userInitials = computed(() => {
  const name = props.discussion.authorName || ''
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
})

const formattedDate = computed(() => {
  if (!props.discussion.createdAt?.toDate) return ''
  const date = props.discussion.createdAt.toDate()
  const now = new Date()
  const diff = now - date

  // Moins d'une heure
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
  }

  // Moins d'un jour
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `il y a ${hours} heure${hours > 1 ? 's' : ''}`
  }

  // Moins d'une semaine
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000)
    return `il y a ${days} jour${days > 1 ? 's' : ''}`
  }

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const truncatedContent = computed(() => {
  const content = props.discussion.content || ''
  if (content.length > 250) {
    return content.substring(0, 250) + '...'
  }
  return content
})

const lastActivityTime = computed(() => {
  if (!props.discussion.lastActivity?.toDate) return ''
  const date = props.discussion.lastActivity.toDate()
  const now = new Date()
  const diff = now - date

  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `il y a ${minutes} min`
  }

  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `il y a ${hours} h`
  }

  const days = Math.floor(diff / 86400000)
  return `il y a ${days} j`
})
</script>

<style scoped>
.discussion-card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  position: relative;
  overflow: hidden;
}

.discussion-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.discussion-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.discussion-card:hover::before {
  width: 6px;
}

.discussion-title {
  color: #1a202c;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.4;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.discussion-title:hover {
  color: #667eea;
  transform: translateX(4px);
  text-decoration: none;
}

.discussion-stats {
  min-width: 90px;
  margin-right: 1rem;
}

.stat-item {
  padding: 0.75rem 0.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.stat-item:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
}

.stat-value {
  font-weight: 800;
  font-size: 1.25rem;
  color: #2d3748;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.7rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 600;
}

.user-info {
  color: #4a5568;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}

.date-info {
  color: #718096;
  font-size: 0.85rem;
  font-weight: 500;
}

.discussion-tags {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.discussion-tags .badge {
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  transition: all 0.3s ease;
}

.discussion-tags .badge:hover {
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .discussion-card {
    margin-bottom: 1rem;
  }

  .discussion-stats {
    min-width: 70px;
    margin-right: 0.75rem;
  }

  .stat-item {
    padding: 0.5rem 0.25rem;
  }

  .stat-value {
    font-size: 1.1rem;
  }

  .stat-label {
    font-size: 0.65rem;
  }
}

/* Animation for new discussions */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.discussion-card {
  animation: slideInUp 0.5s ease-out;
}
</style>
