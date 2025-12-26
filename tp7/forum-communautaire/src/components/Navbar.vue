<template>
  <nav class="navbar" :class="{ 'hidden': isHidden, 'scrolled': isScrolled }">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-brand">
        <router-link to="/" class="logo-link">
          <div class="logo-icon">💬</div>
          <div class="logo-text">
            <span class="logo-main">Formularia</span>
            <span class="logo-sub">Communaute</span>
          </div>
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="navbar-toggle" 
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
      >
        <span v-if="isMenuOpen">✕</span>
        <span v-else>☰</span>
      </button>

      <!-- Navigation Links -->
      <div class="navbar-links" :class="{ 'show': isMenuOpen }">
        <div class="nav-center">
          <router-link 
            :to="{ name: 'home' }" 
            class="nav-link"
            :class="{ 'active': $route.name === 'home' }"
            @click="closeMenu"
          >
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Accueil</span>
          </router-link>
          
          <router-link 
            :to="{ name: 'categories' }" 
            class="nav-link"
            :class="{ 'active': $route.name === 'categories' }"
            @click="closeMenu"
          >
            <span class="nav-icon">📊</span>
            <span class="nav-text">Catégories</span>
          </router-link>
          
          <router-link 
            :to="{ name: 'new-discussion' }" 
            class="nav-link"
            :class="{ 'active': $route.name === 'new-discussion' }"
            @click="closeMenu"
          >
            <span class="nav-icon">➕</span>
            <span class="nav-text">Nouvelle discussion</span>
          </router-link>
        </div>

        <!-- User/Auth Section -->
        <div class="nav-right">
          <template v-if="authStore.user">
            <div class="user-menu" :class="{ 'open': isDropdownOpen }">
              <button 
                class="user-button" 
                @click="toggleDropdown"
                :aria-expanded="isDropdownOpen"
              >
                <div class="user-avatar">
                  {{ userInitials }}
                </div>
                <div class="user-info">
                  <div class="user-name">{{ userDisplayName }}</div>
                  <div class="user-role">Membre actif</div>
                </div>
                <span class="dropdown-arrow">▼</span>
              </button>
              
              <div class="dropdown-menu">
                <router-link 
                  :to="{ name: 'profile' }" 
                  class="dropdown-item"
                  @click="closeAllMenus"
                >
                  <span class="dropdown-icon">👤</span>
                  Mon profil
                </router-link>
                <router-link 
                  :to="{ name: 'my-discussions' }" 
                  class="dropdown-item"
                  @click="closeAllMenus"
                >
                  <span class="dropdown-icon">📄</span>
                  Mes discussions
                </router-link>
                <div class="dropdown-divider"></div>
                <button 
                  class="dropdown-item logout"
                  @click="handleLogout"
                >
                  <span class="dropdown-icon">🚪</span>
                  Déconnexion
                </button>
              </div>
            </div>
          </template>
          
          <template v-else>
            <router-link 
              :to="{ name: 'login' }" 
              class="nav-link auth-link"
              @click="closeMenu"
            >
              <span class="nav-icon">🔐</span>
              <span class="nav-text">Connexion</span>
            </router-link>
            
            <router-link 
              :to="{ name: 'register' }" 
              class="btn btn-register"
              @click="closeMenu"
            >
              <span class="btn-icon">👤</span>
              Inscription
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)
const isHidden = ref(false)
const isScrolled = ref(false)

// Scroll handling variables
let lastScrollTop = 0
let ticking = false

const userDisplayName = computed(() => {
  return authStore.user?.displayName || authStore.user?.email?.split('@')[0] || 'Utilisateur'
})

const userInitials = computed(() => {
  if (!authStore.user?.displayName) return '?'
  return authStore.user.displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    isDropdownOpen.value = false
  }
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
  isDropdownOpen.value = false
}

const closeAllMenus = () => {
  isMenuOpen.value = false
  isDropdownOpen.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  closeAllMenus()
}

// Handle scroll to hide/show navbar
const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const navbarHeight = 70
      
      // Show shadow when scrolled
      isScrolled.value = scrollTop > 10
      
      // Hide navbar when scrolling down, show when scrolling up
      if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        // Scrolling down
        isHidden.value = true
      } else {
        // Scrolling up or at top
        isHidden.value = false
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
      ticking = false
    })
    
    ticking = true
  }
}

// Handle touch/mobile scroll
const handleTouchStart = (e) => {
  lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      isDropdownOpen.value = false
    }
    if (!e.target.closest('.navbar-toggle') && !e.target.closest('.navbar-links')) {
      isMenuOpen.value = false
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('touchstart', handleTouchStart)
})
</script>

<style scoped>
/* Navbar Base */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s ease,
              background 0.3s ease;
}

/* Scrolled state - add shadow */
.navbar.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%);
}

/* Hidden state - hide navbar */
.navbar.hidden {
  transform: translateY(-100%);
  box-shadow: none;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* Logo */
.navbar-brand {
  flex-shrink: 0;
  z-index: 1001; /* Keep logo above mobile menu */
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.02);
}

.logo-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.logo-link:hover .logo-icon {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-main {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.logo-sub {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

/* Mobile Toggle */
.navbar-toggle {
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  width: 44px;
  height: 44px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1001; /* Keep toggle above mobile menu */
}

.navbar-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Navigation Links */
.navbar-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: 3rem;
}

.nav-center {
  display: flex;
  gap: 1rem;
  margin: 0 auto;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-text {
  letter-spacing: 0.3px;
}

/* User Menu */
.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.user-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.user-info {
  text-align: left;
  flex: 1;
}

.user-name {
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1.2;
  margin-bottom: 2px;
}

.user-role {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}

.dropdown-arrow {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease;
}

.user-menu.open .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  min-width: 220px;
  padding: 0.5rem 0;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.user-menu.open .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
  margin: 0 0.25rem;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateX(4px);
}

.dropdown-item.logout {
  color: #ff6b6b;
}

.dropdown-item.logout:hover {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
}

.dropdown-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0.5rem 0;
}

.dropdown-icon {
  font-size: 1rem;
}

/* Auth Buttons */
.auth-link {
  padding: 0.5rem 1rem;
}

.btn-register {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

.btn-register:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  text-decoration: none;
}

.btn-icon {
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .navbar-container {
    padding: 0 1.5rem;
  }
  
  .navbar-links {
    margin-left: 2rem;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
    height: 60px;
  }

  .navbar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    order: 2;
  }

  .navbar-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin: 0;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(20px);
    z-index: 1000;
    overflow-y: auto;
  }

  .navbar-links.show {
    transform: translateX(0);
  }

  .nav-center {
    flex-direction: column;
    margin: 0;
    width: 100%;
    max-width: 300px;
  }

  .nav-right {
    flex-direction: column;
    margin: 0;
    width: 100%;
    max-width: 300px;
  }

  .nav-link {
    justify-content: center;
    padding: 1rem;
    width: 100%;
    font-size: 1.1rem;
  }

  .user-button {
    min-width: auto;
    width: 100%;
    max-width: 300px;
    justify-content: center;
    padding: 1rem;
    font-size: 1.1rem;
  }

  .user-info {
    display: block;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    background: transparent;
    opacity: 1;
    visibility: visible;
    transform: none;
    padding: 0;
    margin-top: 0.5rem;
    width: 100%;
  }

  .dropdown-item {
    justify-content: center;
    padding: 1rem;
    font-size: 1rem;
  }

  .btn-register {
    justify-content: center;
    width: 100%;
    max-width: 300px;
    padding: 1rem;
    font-size: 1.1rem;
  }
  
  /* Close button in mobile menu */
  .navbar-links::before {
    content: '✕';
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    z-index: 1001;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 0.75rem;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .logo-main {
    font-size: 1.2rem;
  }

  .logo-sub {
    font-size: 0.65rem;
  }
}
</style>