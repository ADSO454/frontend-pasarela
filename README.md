# 💳 Frontend Pasarela de Pagos

Aplicación frontend para gestionar pagos a través de una pasarela de pagos que soporta Nequi, Bre-B y Bancolombia. Construida con React + Vite.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Endpoints Consumidos](#-endpoints-consumidos)
- [Guía de Uso](#-guía-de-uso)
- [Seguridad](#-seguridad)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## ✨ Características

### Gestión de Pagos

- ✅ **Crear pagos** con comprobante obligatorio (imagen)
- ✅ **Listar pagos** con filtros por estado y método de pago
- ✅ **Aprobar pagos** manualmente
- ✅ **Rechazar pagos** manualmente
- ✅ **Ver imágenes** de comprobantes en modal
- ✅ **Descargar imágenes** de comprobantes
- ✅ Estados: PENDIENTE, APROBADO, RECHAZADO

### Administración de Clientes (Solo Admin)

- ✅ **Listar todos los clientes** registrados
- ✅ **Crear nuevos clientes** con API Key automática
- ✅ **Editar clientes** (nombre, email, teléfono, descripción)
- ✅ **Regenerar API Key** de clientes
- ✅ **Activar/Desactivar** clientes
- ✅ Visualización de estado (Activo/Inactivo)

### Seguridad

- 🔐 **Autenticación por API Key** en todas las peticiones
- 🔐 **Panel de administración** protegido por contraseña
- 🔐 **Rutas protegidas** para administradores
- 🔐 **Aislamiento de datos** por cliente

### UI/UX

- 🎨 Diseño moderno y responsive
- 💬 Notificaciones en tiempo real (Toast)
- 🖼️ Preview de imágenes antes de subir
- 🔄 Feedback visual en acciones (loading states)
- 📱 Mobile-first

---

## 🛠️ Tecnologías

| Tecnología           | Versión | Propósito                |
| -------------------- | ------- | ------------------------ |
| React                | 18.2.0  | Framework UI             |
| Vite                 | 5.0.8   | Build tool y servidor    |
| React Router DOM     | 6.20.1  | Enrutamiento             |
| Axios                | 1.6.2   | Cliente HTTP             |
| React Hook Form      | 7.48.2  | Manejo de formularios    |
| React Hot Toast      | 2.4.1   | Notificaciones           |
| React Icons          | 4.12.0  | Iconos                   |
| TanStack React Query | 5.8.4   | Manejo de estado y caché |
| Date-fns             | 2.30.0  | Manipulación de fechas   |
| Bootstrap            | 5.3.2   | Estilos y componentes    |

### Desarrollo

- ESLint - Linting de código
- Prettier - Formateo de código
- @vitejs/plugin-react - Plugin React para Vite

---

## 📋 Requisitos Previos

- **Node.js** v18.0.0 o superior
- **npm** v9.0.0 o superior
- **Backend** API de Pasarela de Pagos corriendo (ver [backend repository](https://github.com/ADSO454/api-pasarela))

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ADSO454/frontend-pasarela.git
cd frontend-pasarela
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# API Configuration
VITE_API_URL=http://localhost:8080/api
VITE_API_KEY=dev-api-key-12345

# Admin Configuration
VITE_ADMIN_PASSWORD=admin123

# App Configuration
VITE_APP_NAME=Pasarela de Pagos
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 5. Construir para producción

```bash
npm run build
```

### 6. Previsualizar build de producción

```bash
npm run preview
```

---

## ⚙️ Configuración

### Variables de Entorno

| Variable              | Descripción                | Obligatoria | Ejemplo                     |
| --------------------- | -------------------------- | ----------- | --------------------------- |
| `VITE_API_URL`        | URL base de la API         | Sí          | `http://localhost:8080/api` |
| `VITE_API_KEY`        | API Key para autenticación | Sí          | `dev-api-key-12345`         |
| `VITE_ADMIN_PASSWORD` | Contraseña del panel admin | Sí          | `admin123`                  |
| `VITE_APP_NAME`       | Nombre de la aplicación    | No          | `Pasarela de Pagos`         |

### Configuración del Proxy (Desarrollo)

En `vite.config.js` se configura el proxy para evitar CORS:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

---

## 📁 Estructura del Proyecto

```
frontend-pasarela-pagos/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Pagos/
│   │   │   ├── CrearPago.jsx
│   │   │   ├── CrearPago.css
│   │   │   ├── ListaPagos.jsx
│   │   │   ├── ListaPagos.css
│   │   │   ├── ModalImagen.jsx
│   │   │   └── ModalImagen.css
│   │   └── Clientes/
│   │       ├── ListaClientes.jsx
│   │       └── ListaClientes.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── AdminLogin.jsx
│   │   └── AdminLogin.css
│   ├── services/
│   │   ├── api.js
│   │   ├── pagoService.js
│   │   ├── clienteService.js
│   │   └── authService.js
│   ├── hooks/
│   │   ├── usePagos.js
│   │   └── useClientes.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── index.html
├── package.json
├── vite.config.js
├── .eslintrc.cjs
└── README.md
```

---

## 🔗 Endpoints Consumidos

### Pagos

| Método | Endpoint                   | Descripción               |
| ------ | -------------------------- | ------------------------- |
| POST   | `/api/pagos`               | Crear un nuevo pago       |
| GET    | `/api/pagos/{id}`          | Obtener pago por ID       |
| POST   | `/api/pagos/filtrar`       | Filtrar pagos             |
| PUT    | `/api/pagos/{id}/aprobar`  | Aprobar un pago           |
| PUT    | `/api/pagos/{id}/rechazar` | Rechazar un pago          |
| GET    | `/api/pagos/{id}/imagen`   | Descargar imagen del pago |

### Clientes (Solo Admin)

| Método | Endpoint                               | Descripción        |
| ------ | -------------------------------------- | ------------------ |
| GET    | `/api/clientes`                        | Listar clientes    |
| GET    | `/api/clientes/{id}`                   | Obtener cliente    |
| POST   | `/api/clientes`                        | Crear cliente      |
| PUT    | `/api/clientes/{id}`                   | Actualizar cliente |
| PATCH  | `/api/clientes/{id}/regenerar-api-key` | Regenerar API Key  |
| PATCH  | `/api/clientes/{id}/activar`           | Activar cliente    |
| PATCH  | `/api/clientes/{id}/desactivar`        | Desactivar cliente |

---

## 📖 Guía de Uso

### 1. Crear un Pago

1. Navega a **"Nuevo Pago"** en el menú
2. Completa el formulario:
   - **Monto**: valor del pago
   - **Moneda**: COP (por defecto)
   - **Método de Pago**: NEQUI, BRE_B o BANCOLOMBIA
   - **ID Cliente**: identificador del cliente
   - **Referencia**: opcional
   - **Descripción**: descripción del pago
   - **Imagen**: comprobante de pago (obligatorio)
3. Haz clic en **"Crear Pago"**
4. El pago se creará en estado **PENDIENTE**

### 2. Gestionar Pagos

- **Ver pagos**: Navega a **"Mis Pagos"**
- **Filtrar pagos**: Usa los filtros por estado y método de pago
- **Ver imagen**: Haz clic en el ícono de ojo 👁️
- **Descargar imagen**: Haz clic en el ícono de descarga ⬇️
- **Aprobar pago**: Haz clic en ✓ (solo para pagos PENDIENTE)
- **Rechazar pago**: Haz clic en ✗ (solo para pagos PENDIENTE)

### 3. Administrar Clientes (Admin)

1. Accede al panel admin: ve a la página de inicio y haz clic en **"Panel Admin"** o navega a `/admin/login`
2. Ingresa la contraseña configurada en `VITE_ADMIN_PASSWORD`
3. En el panel podrás:
   - **Ver todos los clientes** con sus detalles
   - **Crear nuevos clientes** haciendo clic en "Nuevo Cliente"
   - **Editar clientes** con el ícono ✏️
   - **Regenerar API Key** con el ícono 🔑
   - **Activar/Desactivar clientes** con los botones toggle

---

## 🔒 Seguridad

### API Key

- Todas las peticiones a la API incluyen el header `X-API-Key`
- La API Key se configura en las variables de entorno
- Cada cliente tiene su propia API Key

### Panel de Administración

- Protegido por contraseña configurada en `.env`
- No se almacena en el cliente, solo se valida en el frontend
- Las rutas de administración están protegidas con `AdminRoute`

### Recomendaciones de Seguridad

- **NUNCA** subas el archivo `.env` al repositorio
- Cambia la contraseña por defecto en producción
- Usa diferentes API Keys para desarrollo y producción
- En producción, asegúrate de deshabilitar Swagger en el backend

---

## 🧪 Scripts Disponibles

| Comando           | Descripción                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Inicia servidor de desarrollo    |
| `npm run build`   | Construye para producción        |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint`    | Ejecuta ESLint                   |
| `npm run format`  | Formatea código con Prettier     |

---

## 🤝 Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** tus cambios: `git commit -m 'feat: Agrega nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un **Pull Request**

### Convenciones de Commits

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Documentación
- `style:` - Estilos (formato, puntuación, etc.)
- `refactor:` - Refactorización de código
- `test:` - Tests
- `chore:` - Mantenimiento

---

## 📝 Notas de Desarrollo

### Estructura de Respuesta de la API

**Pago (PagoResponse):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "monto": 15000.0,
  "moneda": "COP",
  "metodoPago": "NEQUI",
  "estado": "PENDIENTE",
  "idCliente": "1143343634",
  "imagenUrl": "https://res.cloudinary.com/.../imagen.png",
  "fechaCreacion": "2026-06-28T16:30:00",
  "fechaActualizacion": "2026-06-28T16:30:00",
  "descripcion": "Pago de servicio",
  "referencia": "FACT-001"
}
```

**Cliente (ClienteResponse):**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "apiKey": "client-zh1j735jmo",
  "nombreCliente": "Mi Empresa SAS",
  "cloudinaryFolder": "clientes/client-zh1j735jmo",
  "activo": true,
  "rol": "ADMIN",
  "fechaCreacion": "2026-06-28T22:59:52.169Z",
  "fechaActualizacion": "2026-06-28T22:59:52.169Z",
  "email": "contacto@miempresa.com",
  "telefono": "3001234567",
  "descripcion": "Cliente para servicios de pasarela"
}
```

### Estados de Pago

- `PENDIENTE`: Estado inicial, esperando aprobación/rechazo
- `APROBADO`: Pago aprobado manualmente
- `RECHAZADO`: Pago rechazado manualmente

---

## 🐛 Problemas Comunes

### Error 401: "API Key inválida o no proporcionada"

**Solución**: Verifica que la variable `VITE_API_KEY` esté correctamente configurada en el archivo `.env`

### Error 413: "El archivo excede el límite de tamaño"

**Solución**: La imagen no debe superar los 10MB. Comprime la imagen o usa una más pequeña.

### Error CORS en desarrollo

**Solución**: Verifica que el proxy esté configurado en `vite.config.js` o usa la extensión CORS en el navegador.

### "No puedo acceder al panel admin"

**Solución**: Verifica que la contraseña en `VITE_ADMIN_PASSWORD` sea correcta. Por defecto es `admin123`.

---

## 📄 Licencia

MIT License - Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

- **Instructor Jeyson David Zuñiga Gomez** - [@JZGSena](https://github.com/JZGSena)

---

## 🙏 Agradecimientos

- Documentación oficial de [React](https://react.dev/)
- Documentación de [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

---

## 📞 Soporte

Para reportar problemas o sugerir mejoras:

- **Email**: jdzunigag@sena.edu.co
- **Issues**: [GitHub Issues](https://github.com/ADSO454/frontend-pasarela-pagos/issues)

---

**¡Gracias por usar la Pasarela de Pagos!** 🚀
