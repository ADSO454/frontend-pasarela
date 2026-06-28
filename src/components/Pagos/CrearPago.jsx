import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { usePagos } from '../../hooks/usePagos'
import { METODOS_PAGO, MONEDAS } from '../../utils/constants'
import toast from 'react-hot-toast'
import './CrearPago.css'

const CrearPago = () => {
  const navigate = useNavigate()
  const { crearPago, loading } = usePagos()
  const [imagen, setImagen] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('La imagen no puede superar los 10MB')
        e.target.value = ''
        return
      }

      if (!['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)) {
        toast.error('Formato de imagen no soportado. Use JPG, PNG, GIF o BMP')
        e.target.value = ''
        return
      }

      setImagen(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      if (!imagen) {
        toast.error('Debes seleccionar una imagen de comprobante')
        return
      }

      const pagoData = {
        monto: parseFloat(data.monto),
        moneda: data.moneda,
        metodoPago: data.metodoPago,
        idCliente: data.idCliente,
        descripcion: data.descripcion,
        referencia: data.referencia || '',
      }

      await crearPago(pagoData, imagen)
      navigate('/pagos')
    } catch (error) {
      console.error('Error al crear pago:', error)
    }
  }

  return (
    <div className="crear-pago-container">
      <div className="crear-pago-card">
        <h2>Crear Nuevo Pago</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="pago-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="monto">Monto *</label>
              <input
                type="number"
                id="monto"
                step="0.01"
                min="0.01"
                {...register('monto', {
                  required: 'El monto es obligatorio',
                  min: { value: 0.01, message: 'El monto debe ser mayor a 0' },
                })}
                className={errors.monto ? 'error' : ''}
              />
              {errors.monto && <span className="error-message">{errors.monto.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="moneda">Moneda *</label>
              <select
                id="moneda"
                {...register('moneda', { required: 'La moneda es obligatoria' })}
                className={errors.moneda ? 'error' : ''}
              >
                <option value="">Seleccionar moneda</option>
                {Object.values(MONEDAS).map((moneda) => (
                  <option key={moneda} value={moneda}>
                    {moneda}
                  </option>
                ))}
              </select>
              {errors.moneda && <span className="error-message">{errors.moneda.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="metodoPago">Método de Pago *</label>
              <select
                id="metodoPago"
                {...register('metodoPago', { required: 'El método de pago es obligatorio' })}
                className={errors.metodoPago ? 'error' : ''}
              >
                <option value="">Seleccionar método</option>
                {Object.values(METODOS_PAGO).map((metodo) => (
                  <option key={metodo} value={metodo}>
                    {metodo.replace('_', ' ')}
                  </option>
                ))}
              </select>
              {errors.metodoPago && (
                <span className="error-message">{errors.metodoPago.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="idCliente">ID Cliente *</label>
              <input
                type="text"
                id="idCliente"
                {...register('idCliente', { required: 'El ID del cliente es obligatorio' })}
                className={errors.idCliente ? 'error' : ''}
                placeholder="Ej: 1143343634"
              />
              {errors.idCliente && (
                <span className="error-message">{errors.idCliente.message}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="referencia">Referencia</label>
            <input
              type="text"
              id="referencia"
              {...register('referencia')}
              placeholder="Ej: FACT-001"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              {...register('descripcion', { required: 'La descripción es obligatoria' })}
              className={errors.descripcion ? 'error' : ''}
              placeholder="Descripción del pago"
              rows="3"
            />
            {errors.descripcion && (
              <span className="error-message">{errors.descripcion.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="imagen">Comprobante de Pago *</label>
            <div className="file-upload">
              <input
                type="file"
                id="imagen"
                accept="image/jpeg,image/png,image/gif,image/bmp"
                onChange={handleImageChange}
                className="file-input"
              />
              <div className="file-upload-area">
                {previewUrl ? (
                  <div className="preview-container">
                    <img src={previewUrl} alt="Comprobante" className="preview-image" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => {
                        setImagen(null)
                        setPreviewUrl(null)
                        document.getElementById('imagen').value = ''
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">📤</span>
                    <p>Haz clic o arrastra una imagen</p>
                    <span className="upload-hint">JPG, PNG, GIF o BMP (max 10MB)</span>
                  </div>
                )}
              </div>
            </div>
            <div className="file-info">
              {imagen && (
                <span>
                  Archivo: {imagen.name} ({(imagen.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/pagos')}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Pago'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CrearPago
