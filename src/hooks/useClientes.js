import { useState } from 'react'
import { clienteService } from '../services/clienteService'
import { isAuthError } from '../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useClientes = () => {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleAuthError = (error) => {
    if (isAuthError(error)) {
      toast.error('⚠️ No tienes permisos de administrador. API Key incorrecta.')
      navigate('/')
      return true
    }
    return false
  }

  const listarClientes = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await clienteService.listarClientes()
      setClientes(data)
      return data
    } catch (err) {
      if (handleAuthError(err)) return
      setError(err.message)
      toast.error('Error al listar clientes: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const crearCliente = async (datos) => {
    try {
      const nuevoCliente = await clienteService.crearCliente(datos)
      toast.success('✅ Cliente creado exitosamente')
      await listarClientes()
      return nuevoCliente
    } catch (err) {
      if (handleAuthError(err)) throw err
      toast.error('Error al crear cliente: ' + err.message)
      throw err
    }
  }

  const actualizarCliente = async (id, datos) => {
    try {
      const clienteActualizado = await clienteService.actualizarCliente(id, datos)
      toast.success('✅ Cliente actualizado exitosamente')
      await listarClientes()
      return clienteActualizado
    } catch (err) {
      if (handleAuthError(err)) throw err
      toast.error('Error al actualizar cliente: ' + err.message)
      throw err
    }
  }

  const regenerarApiKey = async (id) => {
    try {
      const nuevaApiKey = await clienteService.regenerarApiKey(id)
      toast.success('✅ API Key regenerada exitosamente')
      await listarClientes()
      return nuevaApiKey
    } catch (err) {
      if (handleAuthError(err)) throw err
      toast.error('Error al regenerar API Key: ' + err.message)
      throw err
    }
  }

  const desactivarCliente = async (id) => {
    try {
      await clienteService.desactivarCliente(id)
      toast.success('✅ Cliente desactivado exitosamente')
      await listarClientes()
    } catch (err) {
      if (handleAuthError(err)) throw err
      toast.error('Error al desactivar cliente: ' + err.message)
      throw err
    }
  }

  const activarCliente = async (id) => {
    try {
      await clienteService.activarCliente(id)
      toast.success('✅ Cliente activado exitosamente')
      await listarClientes()
    } catch (err) {
      if (handleAuthError(err)) throw err
      toast.error('Error al activar cliente: ' + err.message)
      throw err
    }
  }

  return {
    clientes,
    loading,
    error,
    listarClientes,
    crearCliente,
    actualizarCliente,
    regenerarApiKey,
    desactivarCliente,
    activarCliente,
  }
}
