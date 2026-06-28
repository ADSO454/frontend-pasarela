import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-Key': API_KEY,
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error con respuesta del servidor
      const { status, data } = error.response
      const errorMessage = data?.message || data || 'Error en la solicitud'

      if (status === 401) {
        console.error('API Key inválida o no proporcionada')
      } else if (status === 403) {
        console.error('No tienes permisos para realizar esta acción')
      } else if (status === 404) {
        console.error('Recurso no encontrado')
      } else if (status === 413) {
        console.error('El archivo excede el límite de tamaño (10MB)')
      }

      throw new Error(errorMessage)
    }
    throw new Error('Error de conexión con el servidor')
  }
)

// Funciones para manejar la API Key dinámica
export const setApiKey = (apiKey) => {
  api.defaults.headers['X-API-Key'] = apiKey
}

export const getApiKey = () => {
  return api.defaults.headers['X-API-Key']
}

export default api
