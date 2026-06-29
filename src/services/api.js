// src/services/api.js
import axios from 'axios'

// Detectar el entorno
const isDevelopment = import.meta.env.MODE === 'development'

// En desarrollo usa proxy, en producción usa la URL completa
const API_URL = isDevelopment
  ? '/api' // Desarrollo: usa el proxy de Vite
  : import.meta.env.VITE_API_TARGET // Producción: URL completa del backend

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
    timeout: 30000,
  })

  // Interceptor para manejar errores
  instance.interceptors.response.use(
    (response) => {
      // 🔴 LOG: Ver la respuesta exitosa
      console.log('✅ [API] Respuesta exitosa:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      })
      return response
    },
    (error) => {
      // 🔴 LOG: Ver el error completo
      console.error('❌ [API] Error completo:', error)

      if (error.response) {
        const { status, data, config } = error.response

        // 🔴 LOG: Ver detalles del error
        console.error('📄 [API] Detalles del error:', {
          url: config?.url,
          method: config?.method,
          status: status,
          data: data,
          headers: error.response.headers,
        })

        // 🔴 Si es error 500, mostrar el mensaje completo del backend
        if (status === 500) {
          console.error('🔥 [API] ERROR 500 - Detalle del backend:', data)
          // Si el backend devuelve un mensaje de error, mostrarlo
          const errorMessage = data?.message || data?.error || data || 'Error interno del servidor'
          const errorObj = new Error(errorMessage)
          errorObj.status = status
          errorObj.details = data
          throw errorObj
        }

        const errorMessage = data?.message || data || 'Error en la solicitud'

        if (status === 401) {
          console.error('❌ API Key inválida o no proporcionada')
        } else if (status === 403) {
          console.error('❌ No tienes permisos para realizar esta acción')
        } else if (status === 404) {
          console.error('❌ Recurso no encontrado')
        } else if (status === 405) {
          console.error('❌ Método no permitido')
        } else if (status === 413) {
          console.error('❌ El archivo excede el límite de tamaño (10MB)')
        }

        const errorObj = new Error(errorMessage)
        errorObj.status = status
        errorObj.details = data
        throw errorObj
      }
      throw new Error('Error de conexión con el servidor')
    }
  )

  return instance
}

// Crear instancias
export const userApi = createApiInstance(USER_API_KEY)
export const adminApi = createApiInstance(ADMIN_API_KEY)

// Exportar la instancia por defecto (usuario normal)
export default userApi

// Función auxiliar para verificar si un error es de autenticación
export const isAuthError = (error) => {
  return error?.status === 401 || error?.status === 403
}
