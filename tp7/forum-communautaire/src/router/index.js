import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import CategoryDiscussionsView from '@/views/CategoryDiscussionsView.vue'
import DiscussionView from '@/views/DiscussionView.vue'
import NewDiscussionView from '@/views/NewDiscussionView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/categories', name: 'categories', component: CategoriesView },
  {
    path: '/categories/:id',
    name: 'category-discussions',
    component: CategoryDiscussionsView,
    props: true
  },
  {
    path: '/discussions/:id',
    name: 'discussion',
    component: DiscussionView,
    props: true
  },
  {
    path: '/new-discussion',
    name: 'new-discussion',
    component: NewDiscussionView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard d'auth
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
