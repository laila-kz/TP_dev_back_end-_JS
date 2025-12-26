<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section-modern">
      <div class="hero-overlay">
        <div class="container">
          <div class="hero-content-modern">
            <div class="hero-badge">
              <span class="hero-icon">⭐</span>
              Communauté Active
            </div>
            <h1 class="hero-title-modern">
              <span class="hero-title-main">Forum</span>
              <span class="hero-title-sub">Communautaire</span>
            </h1>
            <p class="hero-subtitle-modern">
              Partagez vos idées, trouvez des solutions et connectez-vous avec une communauté passionnée
            </p>
            <div class="hero-actions">
              <router-link
                v-if="authStore.user"
                :to="{ name: 'new-discussion' }"
                class="hero-btn hero-btn-primary"
              >
                <span class="hero-icon">➕</span>
                <span class="fw-bold">Créer une discussion</span>
              </router-link>
              <router-link
                v-else
                :to="{ name: 'login' }"
                class="hero-btn hero-btn-secondary"
              >
                <span class="hero-icon">🔐</span>
                <span>Rejoindre maintenant</span>
              </router-link>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">{{ totalUsers }}</div>
                <div class="stat-label">Membres actifs</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">{{ totalDiscussions }}</div>
                <div class="stat-label">Discussions</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">{{ onlineUsers }}</div>
                <div class="stat-label">En ligne</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-bg-shape shape-1"></div>
      <div class="hero-bg-shape shape-2"></div>
      <div class="hero-bg-shape shape-3"></div>
    </section>

    <!-- Filtres et recherche -->
    <div class="container">
      <div class="filter-card mb-4">
        <div class="filter-row">
          <div class="filter-col">
            <div class="search-group">
              <span class="search-icon">🔍</span>
              <input
                v-model="searchQuery"
                type="text"
                class="search-input"
                placeholder="Rechercher une discussion..."
                @keyup.enter="fetchDiscussions"
              />
              <button class="btn btn-primary" @click="fetchDiscussions">
                Rechercher
              </button>
            </div>
          </div>

          <div class="filter-col">
            <div class="filter-buttons">
              <div class="dropdown">
                <button class="btn btn-outline" @click="toggleSortDropdown">
                  Trier par
                </button>
                <ul class="dropdown-menu" v-show="showSortDropdown">
                  <li><a href="#" @click="changeSort('newest')">
                    <span class="sort-icon">⬇️</span> Plus récentes
                  </a></li>
                  <li><a href="#" @click="changeSort('popular')">
                    <span class="sort-icon">🔥</span> Plus populaires
                  </a></li>
                  <li><a href="#" @click="changeSort('active')">
                    <span class="sort-icon">⚡</span> Plus actives
                  </a></li>
                </ul>
              </div>

              <button class="btn btn-outline" @click="toggleFilters">
                <span class="filter-icon">⚙️</span>
                Filtres
              </button>
            </div>
          </div>
        </div>

        <!-- Filtres avancés -->
        <div v-show="showFilters" class="advanced-filters mt-3">
          <div class="filter-card bg-light">
            <div class="filter-row">
              <div class="filter-col">
                <div class="form-group">
                  <label class="form-label">Catégorie</label>
                  <select v-model="filterCategory" class="form-select">
                    <option value="">Toutes les catégories</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                  </select>
                </div>
              </div>
              <div class="filter-col">
                <div class="form-group">
                  <label class="form-label">Statut</label>
                  <select v-model="filterStatus" class="form-select">
                    <option value="">Tous</option>
                    <option value="resolved">Résolues</option>
                    <option value="unresolved">Non résolues</option>
                    <option value="pinned">Épinglées</option>
                  </select>
                </div>
              </div>
              <div class="filter-col">
                <div class="form-group">
                  <label class="form-label">Période</label>
                  <select v-model="filterPeriod" class="form-select">
                    <option value="all">Toujours</option>
                    <option value="day">Dernières 24h</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="filter-actions">
              <button class="btn btn-outline" @click="resetFilters">
                Réinitialiser
              </button>
              <button class="btn btn-primary" @click="applyFilters">
                Appliquer les filtres
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques rapides -->
      <div class="stats-grid mb-4">
        <div class="stat-card bg-info">
          <h5 class="stat-number">{{ totalDiscussions }}</h5>
          <p class="stat-label">Discussions</p>
        </div>
        <div class="stat-card bg-success">
          <h5 class="stat-number">{{ totalResponses }}</h5>
          <p class="stat-label">Réponses</p>
        </div>
        <div class="stat-card bg-warning">
          <h5 class="stat-number">{{ totalUsers }}</h5>
          <p class="stat-label">Membres</p>
        </div>
        <div class="stat-card bg-primary">
          <h5 class="stat-number">{{ onlineUsers }}</h5>
          <p class="stat-label">En ligne</p>
        </div>
      </div>

      <!-- Discussions -->
      <div class="content-grid">
        <div class="main-content">
          <div class="section-header">
            <h3>Discussions récentes</h3>
            <div class="view-toggle">
              <button 
                :class="['view-btn', viewMode === 'list' ? 'active' : '']" 
                @click="viewMode = 'list'"
              >
                📋
              </button>
              <button 
                :class="['view-btn', viewMode === 'grid' ? 'active' : '']" 
                @click="viewMode = 'grid'"
              >
                🔲
              </button>
            </div>
          </div>

          <!-- Liste des discussions -->
          <div v-if="!loading && filteredDiscussions.length > 0">
            <template v-if="viewMode === 'list'">
              <DiscussionCard
                v-for="d in paginatedDiscussions"
                :key="d.id"
                :discussion="d"
              />
            </template>
            <template v-else>
              <div class="grid-view">
                <div v-for="d in paginatedDiscussions" :key="d.id" class="grid-item">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">
                        <router-link :to="{ name: 'discussion', params: { id: d.id } }">
                          {{ d.title }}
                        </router-link>
                      </h5>
                      <p class="card-text">
                        {{ d.content.substring(0, 100) }}...
                      </p>
                      <div class="card-footer">
                        <span>{{ d.authorName }}</span>
                        <span>{{ d.responsesCount || 0 }} réponses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Aucune discussion -->
          <div v-else-if="!loading" class="empty-state">
            <div class="empty-content">
              <span class="empty-icon">💬</span>
              <h5>Aucune discussion trouvée</h5>
              <p>Soyez le premier à démarrer une discussion !</p>
              <router-link v-if="authStore.user" :to="{ name: 'new-discussion' }" class="btn btn-primary">
                Créer une discussion
              </router-link>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="filteredDiscussions.length > perPage" class="pagination">
            <button 
              v-for="page in totalPages" 
              :key="page"
              :class="['page-btn', currentPage === page ? 'active' : '']"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>

          <!-- Chargement -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Chargement des discussions...</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Actions rapides -->
          <div class="card mb-4">
            <div class="card-header">
              <h5>Actions rapides</h5>
            </div>
            <div class="card-list">
              <div v-if="authStore.user" class="list-item">
                <router-link :to="{ name: 'new-discussion' }" class="list-link">
                  <span class="list-icon">➕</span>
                  Créer une discussion
                </router-link>
              </div>
              <div class="list-item">
                <router-link :to="{ name: 'categories' }" class="list-link">
                  <span class="list-icon">📂</span>
                  Parcourir les catégories
                </router-link>
              </div>
              <div class="list-item">
                <a href="#" @click.prevent="showRulesModal" class="list-link">
                  <span class="list-icon">ℹ️</span>
                  Règles du forum
                </a>
              </div>
              <div class="list-item">
                <a href="#" @click.prevent="showHelpModal" class="list-link">
                  <span class="list-icon">❓</span>
                  Guide du débutant
                </a>
              </div>
            </div>
          </div>

          <!-- Catégories populaires -->
          <div class="card mb-4">
            <div class="card-header">
              <h5>Catégories populaires</h5>
            </div>
            <div class="categories-list">
              <router-link
                v-for="cat in popularCategories"
                :key="cat.id"
                :to="{ name: 'category-discussions', params: { id: cat.id } }"
                class="category-badge"
              >
                <span>{{ cat.name }}</span>
                <span class="badge-count">{{ cat.count }}</span>
              </router-link>
            </div>
          </div>

          <!-- Utilisateurs actifs -->
          <div class="card">
            <div class="card-header">
              <h5>Utilisateurs actifs</h5>
            </div>
            <div class="card-body">
              <div v-for="user in activeUsers" :key="user.id" class="user-item">
                <div class="user-avatar">{{ user.initials }}</div>
                <div class="user-info">
                  <div class="user-name">{{ user.name }}</div>
                  <div class="user-status">Actif {{ user.lastActive }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <div v-if="rulesModal" class="modal-overlay" @click.self="rulesModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Règles du forum</h3>
          <button class="modal-close" @click="rulesModal = false">×</button>
        </div>
        <div class="modal-body">
          <p>1. Respectez les autres membres de la communauté</p>
          <p>2. Pas de contenu offensant ou discriminatoire</p>
          <p>3. Restez dans le sujet des catégories</p>
          <p>4. Pas de spam ou de publicité</p>
          <p>5. Utilisez un langage approprié</p>
        </div>
      </div>
    </div>

    <div v-if="helpModal" class="modal-overlay" @click.self="helpModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Guide du débutant</h3>
          <button class="modal-close" @click="helpModal = false">×</button>
        </div>
        <div class="modal-body">
          <p>1. Choisissez la bonne catégorie pour votre discussion</p>
          <p>2. Donnez un titre clair et descriptif</p>
          <p>3. Fournissez suffisamment de détails dans votre message</p>
          <p>4. Utilisez la fonction de recherche avant de créer</p>
          <p>5. Marquez les réponses comme solutions si elles vous aident</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuthStore } from '@/stores/auth'
import DiscussionCard from '@/components/DiscussionCard.vue'

const authStore = useAuthStore()

// Données
const discussions = ref([])
const loading = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = ref(10)
const viewMode = ref('list')
const showFilters = ref(false)
const showSortDropdown = ref(false)

// Filtres
const filterCategory = ref('')
const filterStatus = ref('')
const filterPeriod = ref('all')
const sortBy = ref('newest')

// Modales
const rulesModal = ref(false)
const helpModal = ref(false)

// Statistiques
const totalDiscussions = ref(0)
const totalResponses = ref(0)
const totalUsers = ref(0)
const onlineUsers = ref(0)

// Catégories
const categories = ref([])
const popularCategories = ref([
  { id: '1', name: 'Général', count: 45 },
  { id: '2', name: 'Aide', count: 32 },
  { id: '3', name: 'Projets', count: 28 },
  { id: '4', name: 'Feedback', count: 19 }
])

// Utilisateurs actifs
const activeUsers = ref([
  { id: 1, name: 'Jean Dupont', initials: 'JD', lastActive: 'il y a 5 min' },
  { id: 2, name: 'Marie Curie', initials: 'MC', lastActive: 'il y a 15 min' },
  { id: 3, name: 'Pierre Martin', initials: 'PM', lastActive: 'il y a 30 min' }
])

const totalPages = computed(() => {
  return Math.ceil(filteredDiscussions.value.length / perPage.value)
})

const filteredDiscussions = computed(() => {
  let filtered = discussions.value
  
  // Recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(d =>
      d.title.toLowerCase().includes(query) ||
      d.content.toLowerCase().includes(query) ||
      d.authorName.toLowerCase().includes(query)
    )
  }
  
  // Filtre catégorie
  if (filterCategory.value) {
    filtered = filtered.filter(d => d.categoryId === filterCategory.value)
  }
  
  // Filtre statut
  if (filterStatus.value === 'resolved') {
    filtered = filtered.filter(d => d.isResolved)
  } else if (filterStatus.value === 'unresolved') {
    filtered = filtered.filter(d => !d.isResolved)
  } else if (filterStatus.value === 'pinned') {
    filtered = filtered.filter(d => d.isPinned)
  }
  
  // Tri
  if (sortBy.value === 'popular') {
    filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
  } else if (sortBy.value === 'active') {
    filtered.sort((a, b) => {
      const dateA = a.lastActivity?.toDate?.() || a.createdAt?.toDate?.()
      const dateB = b.lastActivity?.toDate?.() || b.createdAt?.toDate?.()
      return dateB - dateA
    })
  } else {
    filtered.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.()
      const dateB = b.createdAt?.toDate?.()
      return dateB - dateA
    })
  }
  
  return filtered
})

const paginatedDiscussions = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredDiscussions.value.slice(start, end)
})

const fetchDiscussions = async () => {
  loading.value = true
  try {
    let q
    if (sortBy.value === 'popular') {
      q = query(
        collection(db, 'discussions'),
        orderBy('views', 'desc'),
        limit(50)
      )
    } else if (sortBy.value === 'active') {
      q = query(
        collection(db, 'discussions'),
        orderBy('lastActivity', 'desc'),
        limit(50)
      )
    } else {
      q = query(
        collection(db, 'discussions'),
        orderBy('createdAt', 'desc'),
        limit(50)
      )
    }
    
    const snapshot = await getDocs(q)
    discussions.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    totalDiscussions.value = discussions.value.length
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  const snapshot = await getDocs(collection(db, 'categories'))
  categories.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

const changeSort = (sort) => {
  sortBy.value = sort
  fetchDiscussions()
}

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const toggleSortDropdown = () => {
  showSortDropdown.value = !showSortDropdown.value
}

const applyFilters = () => {
  currentPage.value = 1
  fetchDiscussions()
}

const resetFilters = () => {
  filterCategory.value = ''
  filterStatus.value = ''
  filterPeriod.value = 'all'
  searchQuery.value = ''
}

const showRulesModal = () => {
  rulesModal.value = true
}

const showHelpModal = () => {
  helpModal.value = true
}

onMounted(async () => {
  await fetchCategories()
  await fetchDiscussions()
  
  // Statistiques factices (à remplacer par des données réelles)
  totalResponses.value = 245
  totalUsers.value = 156
  onlineUsers.value = 23
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

/* Hero Section */
.hero-section-modern {
  position: relative;
  min-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  overflow: hidden;
  margin-bottom: 3rem;
}

.hero-overlay {
  position: relative;
  z-index: 2;
  padding: 6rem 0;
}

.hero-content-modern {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  animation: fadeInUp 1s ease-out;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out 0.2s both;
}

.hero-title-modern {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-title-main {
  display: block;
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-title-sub {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.hero-subtitle-modern {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.hero-actions {
  margin-bottom: 3rem;
  animation: fadeInUp 1s ease-out 0.8s both;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.hero-btn-primary {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.hero-btn-primary:hover {
  background: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  text-decoration: none;
}

.hero-btn-secondary {
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: #ffffff;
  background: transparent;
}

.hero-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
  transform: translateY(-2px);
  text-decoration: none;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  animation: fadeInUp 1s ease-out 1s both;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

/* Background Shapes */
.hero-bg-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

/* Filters */
.filter-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.filter-col {
  flex: 1;
  min-width: 300px;
}

.search-group {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.5rem;
  border: 1px solid #e9ecef;
}

.search-icon {
  padding: 0 0.75rem;
  color: #6c757d;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.75rem;
  font-size: 1rem;
  outline: none;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
}

.dropdown-menu li {
  margin: 0;
}

.dropdown-menu a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #495057;
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-menu a:hover {
  background: #f8f9fa;
}

/* Advanced Filters */
.advanced-filters .filter-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #495057;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-outline {
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
}

.btn-outline:hover {
  background: rgba(102, 126, 234, 0.1);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  padding: 1.5rem;
  border-radius: 12px;
  color: white;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card.bg-info {
  background: linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%);
}

.stat-card.bg-success {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
}

.stat-card.bg-warning {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
}

.stat-card.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.view-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.view-btn:hover:not(.active) {
  border-color: #667eea;
  color: #667eea;
}

/* Grid View */
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.grid-item .card {
  height: 100%;
  margin: 0;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  margin-bottom: 1rem;
}

.card-title a {
  color: #2d3748;
  text-decoration: none;
  font-weight: 700;
}

.card-title a:hover {
  color: #667eea;
}

.card-text {
  color: #718096;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
  font-size: 0.9rem;
  color: #6c757d;
}

/* Empty State */
.empty-state {
  background: white;
  border: 2px dashed #e9ecef;
  border-radius: 12px;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.page-btn:hover:not(.active) {
  border-color: #667eea;
  color: #667eea;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
}

.card-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.card-header h5 {
  margin: 0;
  color: #2d3748;
}

.card-body {
  padding: 1.5rem;
}

.card-list {
  padding: 0.5rem 0;
}

.list-item {
  padding: 0.75rem 1.5rem;
  transition: background 0.3s;
}

.list-item:hover {
  background: #f8f9fa;
}

.list-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #495057;
  text-decoration: none;
  font-weight: 500;
}

.list-link:hover {
  color: #667eea;
}

.list-icon {
  font-size: 1.25rem;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
}

.category-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.category-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  text-decoration: none;
}

.badge-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.user-status {
  font-size: 0.85rem;
  color: #6c757d;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #2d3748;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #495057;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin-bottom: 0.75rem;
  color: #495057;
}

/* Responsive */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .hero-section-modern {
    min-height: 70vh;
    padding: 4rem 0;
  }

  .hero-stats {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .stat-item {
    flex: 1;
    min-width: 100px;
  }

  .stat-number {
    font-size: 1.8rem;
  }

  .stat-label {
    font-size: 0.75rem;
  }

  .stat-divider {
    height: 30px;
  }

  .hero-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-row {
    flex-direction: column;
  }

  .filter-col {
    min-width: 100%;
  }

  .filter-buttons {
    justify-content: flex-start;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .grid-view {
    grid-template-columns: 1fr;
  }
  
  .hero-title-modern {
    font-size: 2rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>