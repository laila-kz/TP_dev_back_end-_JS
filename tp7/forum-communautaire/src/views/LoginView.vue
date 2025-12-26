<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Connexion</h2>
      
      <div v-if="error" class="alert alert-error">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="form-control"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          <span v-if="loading" class="loading">Connexion...</span>
          <span v-else>Se connecter</span>
        </button>

        <div class="auth-links">
          <button type="button" class="btn-link" @click="handleResetPassword">
            Mot de passe oublié ?
          </button>
          
          <router-link :to="{ name: 'register' }" class="btn-link">
            Pas de compte ? Inscription
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push({ name: 'home' })
  } catch (e) {
    // erreur déjà dans store
  }
}

const handleResetPassword = async () => {
  if (!email.value) {
    alert('Veuillez entrer votre e-mail pour réinitialiser le mot de passe.')
    return
  }
  try {
    await authStore.resetPassword(email.value)
    alert('E-mail de réinitialisation envoyé.')
  } catch (e) {
    // erreur déjà dans store
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.auth-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
}

.auth-title {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2d3748;
  font-size: 1.75rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-block {
  width: 100%;
}

.btn-link {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}

.auth-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: center;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.alert-error {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  color: #c53030;
}

.loading {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>