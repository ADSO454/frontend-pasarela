import api from './api'

export const clienteService = {
  // Listar todos los clientes
  listarClientes: async () => {
    const response = await api.get('/clientes')
    return response.data
  },

  // Obtener cliente por ID
  obtenerCliente: async (id) => {
    const response = await api.get(`/clientes/${id}`)
    return response.data
  },

  // Crear nuevo cliente
  crearCliente: async (datos) => {
    const response = await api.post('/clientes', datos)
    return response.data
  },

  // Actualizar cliente
  actualizarCliente: async (id, datos) => {
    const response = await api.put(`/clientes/${id}`, datos)
    return response.data
  },

  // Regenerar API Key
  regenerarApiKey: async (id) => {
    const response = await api.patch(`/clientes/${id}/regenerar-api-key`)
    return response.data
  },

  // Desactivar cliente
  desactivarCliente: async (id) => {
    const response = await api.patch(`/clientes/${id}/desactivar`)
    return response
  },

  // Activar cliente
  activarCliente: async (id) => {
    const response = await api.patch(`/clientes/${id}/activar`)
    return response
  },
}
