import { useState, useEffect } from 'react'
import { usePagos } from '../../hooks/usePagos'
import { ESTADOS_PAGO, METODOS_PAGO, ESTADOS_COLORS } from '../../utils/constants'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { FaEye, FaDownload, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa'
import ModalImagen from './ModalImagen'
import toast from 'react-hot-toast'
import './ListaPagos.css'

const ListaPagos = () => {
  const { pagos, loading, cargarPagos, aprobarPago, rechazarPago, descargarImagen } = usePagos()
  const [filtros, setFiltros] = useState({ estado: '', metodoPago: '' })
  const [modalOpen, setModalOpen] = useState(false)
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null)

  useEffect(() => {
    cargarPagos(filtros)
  }, [filtros])

  const handleFiltroChange = (e) => {
    const { name, value } = e.target
    setFiltros((prev) => ({ ...prev, [name]: value }))
  }

  const handleAprobar = async (id) => {
    if (window.confirm('¿Estás seguro de aprobar este pago?')) {
      await aprobarPago(id)
    }
  }

  const handleRechazar = async (id) => {
    if (window.confirm('¿Estás seguro de rechazar este pago?')) {
      await rechazarPago(id)
    }
  }

  const handleVerImagen = (pago) => {
    setPagoSeleccionado(pago)
    setModalOpen(true)
  }

  const handleDescargarImagen = async (pago) => {
    const nombreArchivo = `comprobante_${pago.referencia || pago.id}.png`
    await descargarImagen(pago.id, nombreArchivo)
  }

  const getEstadoBadge = (estado) => {
    const colorMap = {
      [ESTADOS_PAGO.PENDIENTE]: 'badge-warning',
      [ESTADOS_PAGO.APROBADO]: 'badge-success',
      [ESTADOS_PAGO.RECHAZADO]: 'badge-danger',
    }
    return `badge ${colorMap[estado] || 'badge-secondary'}`
  }

  const getMetodoLabel = (metodo) => {
    return metodo.replace('_', ' ')
  }

  return (
    <div className="lista-pagos-container">
      <div className="lista-pagos-header">
        <h2>Mis Pagos</h2>
        <div className="filtros-container">
          <select
            name="estado"
            value={filtros.estado}
            onChange={handleFiltroChange}
            className="filtro-select"
          >
            <option value="">Todos los estados</option>
            {Object.values(ESTADOS_PAGO).map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          <select
            name="metodoPago"
            value={filtros.metodoPago}
            onChange={handleFiltroChange}
            className="filtro-select"
          >
            <option value="">Todos los métodos</option>
            {Object.values(METODOS_PAGO).map((metodo) => (
              <option key={metodo} value={metodo}>
                {metodo.replace('_', ' ')}
              </option>
            ))}
          </select>
          <button className="btn-refresh" onClick={() => cargarPagos(filtros)} disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : '🔄 Actualizar'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <FaSpinner className="spinner-large" />
          <p>Cargando pagos...</p>
        </div>
      ) : pagos.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h3>No hay pagos</h3>
          <p>No se encontraron pagos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="pagos-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Monto</th>
                <th>Método</th>
                <th>Estado</th>
                <th>Cliente</th>
                <th>Referencia</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago) => (
                <tr key={pago.id}>
                  <td className="id-cell">{pago.id.substring(0, 8)}...</td>
                  <td className="monto-cell">
                    ${pago.monto.toFixed(2)} {pago.moneda}
                  </td>
                  <td>
                    <span className="metodo-badge">{getMetodoLabel(pago.metodoPago)}</span>
                  </td>
                  <td>
                    <span className={getEstadoBadge(pago.estado)}>{pago.estado}</span>
                  </td>
                  <td>{pago.idCliente}</td>
                  <td>{pago.referencia || '-'}</td>
                  <td className="fecha-cell">
                    {format(new Date(pago.fechaCreacion), 'dd/MM/yyyy HH:mm', { locale: es })}
                  </td>
                  <td className="acciones-cell">
                    <button
                      className="btn-action btn-view"
                      onClick={() => handleVerImagen(pago)}
                      title="Ver imagen"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn-action btn-download"
                      onClick={() => handleDescargarImagen(pago)}
                      title="Descargar imagen"
                    >
                      <FaDownload />
                    </button>
                    {pago.estado === ESTADOS_PAGO.PENDIENTE && (
                      <>
                        <button
                          className="btn-action btn-approve"
                          onClick={() => handleAprobar(pago.id)}
                          title="Aprobar pago"
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="btn-action btn-reject"
                          onClick={() => handleRechazar(pago.id)}
                          title="Rechazar pago"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagoSeleccionado && (
        <ModalImagen
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          pago={pagoSeleccionado}
          onDownload={handleDescargarImagen}
        />
      )}
    </div>
  )
}

export default ListaPagos
