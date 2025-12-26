import { defineStore } from 'pinia'
import { ref } from 'vue'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  // Inscription
  const register = async (email, password, displayName) => {
    try {
      error.value = null
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Créer le profil utilisateur dans Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName,
        email,
        role: 'user',
        createdAt: new Date(),
        photoURL: '',
        bio: ''
      })

      return userCredential.user
    } catch (err) {
      // Personnaliser les messages d'erreur
      if (err.code === 'auth/email-already-in-use') {
        error.value = 'Cette adresse e-mail est déjà utilisée. Essayez de vous connecter ou utilisez une autre adresse e-mail.'
      } else if (err.code === 'auth/weak-password') {
        error.value = 'Le mot de passe est trop faible. Il doit contenir au moins 6 caractères.'
      } else if (err.code === 'auth/invalid-email') {
        error.value = 'L\'adresse e-mail n\'est pas valide.'
      } else {
        error.value = err.message
      }
      throw err
    }
  }

  // Connexion
  const login = async (email, password) => {
    try {
      error.value = null
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Déconnexion
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Réinitialisation du mot de passe
  const resetPassword = async (email) => {
    try {
      error.value = null
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Récupérer les données utilisateur depuis Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        return userDoc.data()
      }
      return null
    } catch (err) {
      console.error('Erreur lors de la récupération des données utilisateur:', err)
      return null
    }
  }

  // Observer l'état d'authentification
  const initAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await fetchUserData(firebaseUser.uid)
        user.value = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userData
        }
      } else {
        user.value = null
      }
      loading.value = false
    })
  }

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword,
    initAuth,
    fetchUserData
  }
})