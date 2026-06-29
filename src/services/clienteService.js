// src/services/clienteService.js
import { adminApi } from './api'

export const clienteService = {
  // Listar todos los clientes
  listarClientes: async () => {
    const response = await adminApi.get('/clientes')
    return response.data
  },

  // Obtener cliente por ID
  obtenerCliente: async (id) => {
    const response = await adminApi.get(`/clientes/${id}`)
    return response.data
  },

  // Crear nuevo cliente
  crearCliente: async (datos) => {
    const response = await adminApi.post('/clientes', datos)
    return response.data
  },

  // Actualizar cliente
  actualizarCliente: async (id, datos) => {
    const response = await adminApi.put(`/clientes/${id}`, datos)
    return response.data
  },

  // Regenerar API Key
  regenerarApiKey: async (id) => {
    const response = await adminApi.patch(`/clientes/${id}/regenerar-api-key`)
    return response.data
  },

  // Desactivar cliente
  desactivarCliente: async (id) => {
    const response = await adminApi.patch(`/clientes/${id}/desactivar`)
    return response
  },

  // Activar cliente
  activarCliente: async (id) => {
    const response = await adminApi.patch(`/clientes/${id}/activar`)
    return response
  },
}
