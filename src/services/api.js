import axios from 'axios'

const API_URL = '/api'

// Obtener las API Keys
const USER_API_KEY = import.meta.env.VITE_API_KEY
const ADMIN_API_KEY = import.meta.env.VITE_API_KEY_ADMIN

// Función para crear una instancia de axios con una API Key específica
const createApiInstance = (apiKey) => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
  })

  // Interceptor para manejar errores
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response
        const errorMessage = data?.message || data || 'Error en la solicitud'

        if (status === 401) {
          console.error('❌ API Key inválida o no proporcionada')
        } else if (status === 403) {
          console.error('❌ No tienes permisos para realizar esta acción')
        } else if (status === 404) {
          console.error('❌ Recurso no encontrado')
        } else if (status === 413) {
          console.error('❌ El archivo excede el límite de tamaño (10MB)')
        }

        // Lanzar el error con el status para manejarlo específicamente
        const errorObj = new Error(errorMessage)
        errorObj.status = status
        throw errorObj
      }
      throw new Error('Error de conexión con el servidor')
    }
  )

  return instance
}

// Instancias separadas
export const userApi = createApiInstance(USER_API_KEY)
export const adminApi = createApiInstance(ADMIN_API_KEY)

// Exportar la instancia por defecto (usuario normal)
export default userApi

// Función auxiliar para verificar si un error es de autenticación
export const isAuthError = (error) => {
  return error?.status === 401 || error?.status === 403
}
