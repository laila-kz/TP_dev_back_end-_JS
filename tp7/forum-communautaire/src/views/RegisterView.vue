<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="register-title">Inscription</h2>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="displayName" class="form-label">Nom d'affichage</label>
          <input
            id="displayName"
            v-model="displayName"
            type="text"
            class="form-control"
            required
            placeholder="Votre pseudo"
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Adresse e-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            required
            placeholder="exemple@mail.com"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-control"
            required
            minlength="6"
            placeholder="Au moins 6 caractères"
          />
        </div>

        <button type="submit" class="btn btn-primary register-btn" :disabled="loading">
          <span v-if="loading" class="loading-spinner"></span>
          <span v-else>S'inscrire</span>
        </button>

        <router-link
          :to="{ name: 'login' }"
          class="login-link"
        >
          Déjà un compte ? Connexion
        </router-link>
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
const displayName = ref('')

const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const handleRegister = async () => {
  try {
    await authStore.register(email.value, password.value, displayName.value)
    router.push({ name: 'home' })
  } catch (e) {
    // l'erreur est déjà stockée dans authStore.error
  }
}
</script>
<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.register-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 3rem 2rem;
  width: 100%;
  max-width: 400px;
  animation: slideInUp 0.5s ease-out;
}

.register-title {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.register-btn {
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
}

.login-link {
  text-align: center;
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  margin-top: 1rem;
  display: block;
}

.login-link:hover {
  color: var(--secondary-color);
  text-decoration: underline;
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.alert-danger {
  background-color: #fed7d7;
  border: 1px solid #fc8181;
  color: #c53030;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .register-container {
    padding: 1rem;
  }

  .register-card {
    padding: 2rem 1.5rem;
  }

  .register-title {
    font-size: 1.75rem;
  }
}
</style>
