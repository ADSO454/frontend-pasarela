const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

export const authService = {
  login: (password) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true')
      return true
    }
    return false
  },

  logout: () => {
    localStorage.removeItem('adminAuthenticated')
  },

  isAuthenticated: () => {
    return localStorage.getItem('adminAuthenticated') === 'true'
  },
}
