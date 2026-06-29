// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Verificar si hay sesión de admin activa
    const adminSession = localStorage.getItem('adminAuthenticated')
    setIsAdmin(adminSession === 'true')
  }, [])

  const login = (password) => {
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAdmin(false)
  }

  // Para cerrar sesión sin contraseña (cuando falla la API Key)
  const forceLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, forceLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
