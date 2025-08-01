// store/authStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      username: null,
      isAuthenticated: false,
      
      // Actions
      login: (username) => {
        set({
          username,
          isAuthenticated: true
        })
      },
      
      logout: () => {
        set({
          username: null,
          isAuthenticated: false
        })
      },
      
      // Getters
      getUsername: () => get().username,
      getIsAuthenticated: () => get().isAuthenticated,
      
      // Update username if needed
      updateUsername: (username) => {
        set({ username })
      }
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      // Only persist necessary fields
      partialize: (state) => ({
        username: state.username,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export default useAuthStore