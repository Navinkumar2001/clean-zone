import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  state?: string
  city?: string
  address?: string
  joinedDate?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = (userData: User) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const updateUser = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  const initAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  const signupUser = (name: string, email: string, password: string): User => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists')
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      joinedDate: new Date().toISOString()
    }
    
    users.push({ ...newUser, password })
    localStorage.setItem('users', JSON.stringify(users))
    
    return newUser
  }

  const loginUser = (email: string, password: string): User => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    console.log('Stored users:', users)
    console.log('Login attempt:', { email, password })
    
    const user = users.find((u: any) => u.email === email && u.password === password)
    console.log('Found user:', user)
    
    if (!user) {
      throw new Error('Invalid credentials')
    }
    
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    initAuth,
    signupUser,
    loginUser
  }
})