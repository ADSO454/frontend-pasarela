import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaCreditCard, FaList, FaUsers, FaLock } from 'react-icons/fa'
import './Home.css'

const Home = () => {
  const { isAdmin } = useAuth()

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>💳 Pasarela de pagos</h1>
        <p className="hero-subtitle">Gestiona tus pagos de manera fácil y segura</p>
      </div>

      <div className="features-grid">
        <Link to="/pagos/nuevo" className="feature-card">
          <div className="feature-icon">📤</div>
          <h3>Crear pago</h3>
          <p>Registra un nuevo pago con comprobante</p>
        </Link>

        <Link to="/pagos" className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Mis pagos</h3>
          <p>Consulta y gestiona todos tus pagos</p>
        </Link>

        {isAdmin && (
          <Link to="/admin/clientes" className="feature-card admin-card">
            <div className="feature-icon">👥</div>
            <h3>Administrar clientes</h3>
            <p>Gestiona los clientes de la pasarela</p>
          </Link>
        )}

        {!isAdmin && (
          <Link to="/admin/login" className="feature-card admin-card">
            <div className="feature-icon">🔒</div>
            <h3>Panel admin</h3>
            <p>Accede al panel de administración</p>
          </Link>
        )}
      </div>

      <div className="info-section">
        <div className="info-card">
          <h4>¿Cómo funciona?</h4>
          <ol>
            <li>Crea un pago con tu comprobante</li>
            <li>Espera la aprobación o rechazo</li>
            <li>Consulta el estado en cualquier momento</li>
            <li>Descarga los comprobantes cuando necesites</li>
          </ol>
        </div>
        <div className="info-card">
          <h4>Métodos de pago</h4>
          <ul>
            <li>🏦 Nequi</li>
            <li>🏦 Bre-B</li>
            <li>🏦 Bancolombia</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
