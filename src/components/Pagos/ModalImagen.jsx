import { useEffect, useRef } from 'react'
import { FaTimes, FaDownload } from 'react-icons/fa'
import './ModalImagen.css'

const ModalImagen = ({ isOpen, onClose, pago, onDownload }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !pago) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h3>Comprobante de pago</h3>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <div className="pago-info">
            <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">{pago.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Monto:</span>
              <span className="info-value">
                ${pago.monto.toFixed(2)} {pago.moneda}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Método:</span>
              <span className="info-value">{pago.metodoPago.replace('_', ' ')}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Estado:</span>
              <span className={`info-value estado-${pago.estado.toLowerCase()}`}>
                {pago.estado}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Referencia:</span>
              <span className="info-value">{pago.referencia || '-'}</span>
            </div>
          </div>

          <div className="imagen-container">
            {pago.imagenUrl ? (
              <img
                src={pago.imagenUrl}
                alt="Comprobante de pago"
                className="modal-imagen"
                onError={(e) => {
                  e.target.src = '/placeholder-image.png'
                  e.target.alt = 'Imagen no disponible'
                }}
              />
            ) : (
              <div className="no-imagen">
                <span>📷</span>
                <p>No hay imagen disponible</p>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-download-modal" onClick={() => onDownload(pago)}>
            <FaDownload /> Descargar imagen
          </button>
          <button className="btn-close-modal" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalImagen
