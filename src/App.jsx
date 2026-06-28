import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Layout/Navbar'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import CrearPago from './components/Pagos/CrearPago'
import ListaPagos from './components/Pagos/ListaPagos'
import ListaClientes from './components/Clientes/ListaClientes'
import './App.css'

const queryClient = new QueryClient()

// Componente para proteger rutas de admin
const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth()
  return isAdmin ? children : <Navigate to="/admin/login" replace />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/pagos/nuevo" element={<CrearPago />} />
                <Route path="/pagos" element={<ListaPagos />} />
                <Route
                  path="/admin/clientes"
                  element={
                    <AdminRoute>
                      <ListaClientes />
                    </AdminRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
