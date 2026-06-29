import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaHome, FaPlus, FaList, FaUsers, FaSignOutAlt } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const { isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const appName = import.meta.env.VITE_APP_NAME || 'Pasarela de pagos'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">💳</span>
          {appName}
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <FaHome /> Inicio
          </Link>
          <Link to="/pagos/nuevo" className="nav-link">
            <FaPlus /> Nuevo pago
          </Link>
          <Link to="/pagos" className="nav-link">
            <FaList /> Mis pagos
          </Link>
          {isAdmin && (
            <>
              <Link to="/admin/clientes" className="nav-link admin-link">
                <FaUsers /> Administrar clientes
              </Link>
            </>
          )}
          {isAdmin && (
            <button onClick={handleLogout} className="nav-link logout-btn">
              <FaSignOutAlt /> Salir
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
