// src/services/pagoService.js
import userApi from './api'

export const pagoService = {
  // Crear un nuevo pago
  crearPago: async (datos, imagen) => {
    const formData = new FormData()
    formData.append('datos', JSON.stringify(datos))
    if (imagen) {
      formData.append('imagen', imagen)
    }

    const response = await userApi.post('/pagos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Obtener un pago por ID
  obtenerPago: async (id) => {
    const response = await userApi.get(`/pagos/${id}`)
    return response.data
  },

  // Listar pagos con filtros
  filtrarPagos: async (filtros = {}) => {
    const response = await userApi.post('/pagos/filtrar', filtros)
    return response.data
  },

  // Aprobar un pago
  aprobarPago: async (id) => {
    const response = await userApi.put(`/pagos/${id}/aprobar`)
    return response.data
  },

  // Rechazar un pago
  rechazarPago: async (id) => {
    const response = await userApi.put(`/pagos/${id}/rechazar`)
    return response.data
  },

  // Descargar imagen de un pago
  descargarImagen: async (id) => {
    const response = await userApi.get(`/pagos/${id}/imagen`, {
      responseType: 'blob',
    })
    return response
  },
}
