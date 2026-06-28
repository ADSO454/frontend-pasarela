import { useState, useEffect } from 'react'
import { pagoService } from '../services/pagoService'
import toast from 'react-hot-toast'

export const usePagos = () => {
  const [pagos, setPagos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const cargarPagos = async (filtros = {}) => {
    setLoading(true)
    setError(null)
    try {
      const data = await pagoService.filtrarPagos(filtros)
      setPagos(data)
      return data
    } catch (err) {
      setError(err.message)
      toast.error('Error al cargar los pagos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const crearPago = async (datos, imagen) => {
    try {
      const nuevoPago = await pagoService.crearPago(datos, imagen)
      toast.success('Pago creado exitosamente')
      await cargarPagos()
      return nuevoPago
    } catch (err) {
      toast.error('Error al crear el pago: ' + err.message)
      throw err
    }
  }

  const aprobarPago = async (id) => {
    try {
      const pagoAprobado = await pagoService.aprobarPago(id)
      toast.success('Pago aprobado exitosamente')
      await cargarPagos()
      return pagoAprobado
    } catch (err) {
      toast.error('Error al aprobar el pago: ' + err.message)
      throw err
    }
  }

  const rechazarPago = async (id) => {
    try {
      const pagoRechazado = await pagoService.rechazarPago(id)
      toast.success('Pago rechazado exitosamente')
      await cargarPagos()
      return pagoRechazado
    } catch (err) {
      toast.error('Error al rechazar el pago: ' + err.message)
      throw err
    }
  }

  const descargarImagen = async (id, nombreArchivo) => {
    try {
      const response = await pagoService.descargarImagen(id)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', nombreArchivo || `pago_${id}.png`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('Imagen descargada exitosamente')
    } catch (err) {
      toast.error('Error al descargar la imagen: ' + err.message)
      throw err
    }
  }

  return {
    pagos,
    loading,
    error,
    cargarPagos,
    crearPago,
    aprobarPago,
    rechazarPago,
    descargarImagen,
  }
}
