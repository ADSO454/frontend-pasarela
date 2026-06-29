import { useState, useEffect } from 'react'
import { useClientes } from '../../hooks/useClientes'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaKey, FaToggleOn, FaToggleOff, FaPlus, FaSpinner } from 'react-icons/fa'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import toast from 'react-hot-toast'
import './ListaClientes.css'

const ListaClientes = () => {
  const { clientes, loading, listarClientes, regenerarApiKey, desactivarCliente, activarCliente } =
    useClientes()

  const { forceLogout } = useAuth()
  const navigate = useNavigate()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [clienteEditando, setClienteEditando] = useState(null)

  useEffect(() => {
    const loadClientes = async () => {
      try {
        await listarClientes()
      } catch (error) {
        // Si el error es de autenticación, redirigir
        if (error?.status === 401 || error?.status === 403) {
          toast.error('⚠️ No tienes permisos de administrador')
          forceLogout()
          navigate('/')
        }
      }
    }

    loadClientes()
  }, [])

  const handleRegenerarKey = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de regenerar la API Key de "${nombre}"?`)) {
      try {
        const nuevaKey = await regenerarApiKey(id)
        if (nuevaKey) {
          toast.success(`✅ Nueva API Key: ${nuevaKey}`)
        }
      } catch (error) {
        if (error?.status === 401 || error?.status === 403) {
          toast.error('⚠️ No tienes permisos para esta acción')
          forceLogout()
          navigate('/')
        }
      }
    }
  }

  const handleToggleActivo = async (id, activo, nombre) => {
    const accion = activo ? 'desactivar' : 'activar'
    if (window.confirm(`¿Estás seguro de ${accion} al cliente "${nombre}"?`)) {
      try {
        if (activo) {
          await desactivarCliente(id)
        } else {
          await activarCliente(id)
        }
      } catch (error) {
        if (error?.status === 401 || error?.status === 403) {
          toast.error('⚠️ No tienes permisos para esta acción')
          forceLogout()
          navigate('/')
        }
      }
    }
  }

  return (
    <div className="lista-clientes-container">
      <div className="lista-clientes-header">
        <h2>Administrar clientes</h2>
        <button className="btn-crear-cliente" onClick={() => setShowCreateForm(true)}>
          <FaPlus /> Nuevo cliente
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <FaSpinner className="spinner-large" />
          <p>Cargando clientes...</p>
        </div>
      ) : clientes.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">👥</span>
          <h3>No hay clientes</h3>
          <p>Comienza creando tu primer cliente.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="clientes-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>API Key</th>
                <th>Estado</th>
                <th>Fecha creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="nombre-cell">{cliente.nombreCliente}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td className="api-key-cell">
                    <code>{cliente.apiKey}</code>
                  </td>
                  <td>
                    <span className={`badge ${cliente.activo ? 'badge-success' : 'badge-danger'}`}>
                      {cliente.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="fecha-cell">
                    {format(new Date(cliente.fechaCreacion), 'dd/MM/yyyy HH:mm', { locale: es })}
                  </td>
                  <td className="acciones-cell">
                    <button
                      className="btn-action btn-edit"
                      onClick={() => setClienteEditando(cliente)}
                      title="Editar cliente"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-action btn-key"
                      onClick={() => handleRegenerarKey(cliente.id, cliente.nombreCliente)}
                      title="Regenerar API Key"
                    >
                      <FaKey />
                    </button>
                    <button
                      className={`btn-action ${cliente.activo ? 'btn-toggle-off' : 'btn-toggle-on'}`}
                      onClick={() =>
                        handleToggleActivo(cliente.id, cliente.activo, cliente.nombreCliente)
                      }
                      title={cliente.activo ? 'Desactivar cliente' : 'Activar cliente'}
                    >
                      {cliente.activo ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Crear Cliente */}
      {showCreateForm && (
        <ModalCliente
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false)
            listarClientes()
          }}
        />
      )}

      {/* Modal Editar Cliente */}
      {clienteEditando && (
        <ModalCliente
          cliente={clienteEditando}
          onClose={() => setClienteEditando(null)}
          onSuccess={() => {
            setClienteEditando(null)
            listarClientes()
          }}
        />
      )}
    </div>
  )
}

// Componente Modal para Crear/Editar Cliente
const ModalCliente = ({ cliente, onClose, onSuccess }) => {
  const { crearCliente, actualizarCliente } = useClientes()
  const [formData, setFormData] = useState({
    nombreCliente: cliente?.nombreCliente || '',
    email: cliente?.email || '',
    telefono: cliente?.telefono || '',
    descripcion: cliente?.descripcion || '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Validar campos obligatorios
      if (!formData.nombreCliente || !formData.email || !formData.telefono) {
        toast.error('Todos los campos son obligatorios')
        return
      }

      if (cliente) {
        await actualizarCliente(cliente.id, formData)
      } else {
        await crearCliente(formData)
      }
      onSuccess()
    } catch (error) {
      console.error('Error al guardar cliente:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{cliente ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Nombre del Cliente *</label>
              <input
                type="text"
                name="nombreCliente"
                value={formData.nombreCliente}
                onChange={handleChange}
                required
                placeholder="Ej: Mi Empresa SAS"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="contacto@empresa.com"
              />
            </div>
            <div className="form-group">
              <label>Teléfono *</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="3001234567"
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción del cliente"
                rows="3"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-close-modal" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit-modal" disabled={loading}>
              {loading ? 'Guardando...' : cliente ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ListaClientes
