import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
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
      const success = login(password)
      if (success) {
        toast.success('Acceso concedido')
        navigate('/admin/clientes')
      } else {
        toast.error('Contraseña incorrecta')
      }
    } catch (error) {
      toast.error('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔒</div>
          <h2>Panel de Administración</h2>
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
