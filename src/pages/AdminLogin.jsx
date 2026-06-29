import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { adminApi } from '../services/api'
import { FaLock } from 'react-icons/fa'
import toast from 'react-hot-toast'
import './AdminLogin.css'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Primero verificar la contraseña del admin
      const success = login(password)
      if (!success) {
        toast.error('❌ Contraseña incorrecta')
        setLoading(false)
        return
      }

      // Luego verificar que la API Key de admin es válida
      try {
        // Hacer una petición de prueba al endpoint de clientes
        await adminApi.get('/clientes')

        toast.success('✅ Acceso concedido')
        navigate('/admin/clientes')
      } catch (apiError) {
        // Si la API Key es inválida o no tiene permisos
        if (apiError?.status === 401 || apiError?.status === 403) {
          toast.error('❌ API Key de administrador incorrecta o sin permisos')
          // Cerrar sesión del admin
          login(false) // O logout
          navigate('/')
        } else {
          toast.error('❌ Error al verificar permisos de administrador')
        }
      }
    } catch (error) {
      toast.error('❌ Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔒</div>
          <h2>Panel de administración</h2>
          <p>Ingresa la contraseña para acceder</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña de administrador"
                required
                className="password-input"
              />
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Verificando...' : 'Acceder al Panel'}
          </button>
        </form>

        <div className="login-footer">
          <p>⚠️ Esta área es solo para administradores autorizados</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
