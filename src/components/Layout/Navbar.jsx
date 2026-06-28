import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaHome, FaPlus, FaList, FaUsers, FaSignOutAlt } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const { isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">💳</span>
          Pasarela de Pagos
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <FaHome /> Inicio
          </Link>
          <Link to="/pagos/nuevo" className="nav-link">
            <FaPlus /> Nuevo Pago
          </Link>
          <Link to="/pagos" className="nav-link">
            <FaList /> Mis Pagos
          </Link>
          {isAdmin && (
            <>
              <Link to="/admin/clientes" className="nav-link admin-link">
                <FaUsers /> Administrar Clientes
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
