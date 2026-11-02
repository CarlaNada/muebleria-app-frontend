# Mueblería Arboleda — Frontend

Frontend de la Evaluación Final Integradora (EFI) de Programación III, desarrollado con Next.js y conectado a una API REST de Django REST Framework.

## Integrantes

- Carla Nadalig
- Mateo Urquiza
- Sebastián Maldonado

## Tecnologías

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- React Hook Form y Zod
- Context API
- JWT mediante cookies HttpOnly
- API REST con Django REST Framework

## Funcionalidades implementadas

- Página de inicio y navegación.
- Catálogo de productos conectado con Django.
- Búsqueda, ordenamiento y paginación de productos.
- Vista de detalle de cada producto.
- Inicio y cierre de sesión.
- Recuperación de sesión mediante refresh token.
- Protección de rutas administrativas.
- Validación de permisos de administrador mediante `is_staff`.
- Páginas de carga, error y recurso no encontrado.

## Requisitos

- Node.js y npm.
- Backend Django configurado y ejecutándose.

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/CarlaNada/muebleria-app-frontend.git
cd muebleria-app-frontend
npm install
```

## Variables de entorno

Crear un archivo `.env.local` en la raíz del frontend:

```env
API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

El backend debe estar ejecutándose en el puerto 8000.

## Ejecución

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Acceder desde el navegador:

http://localhost:3000

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/productos` | Catálogo de productos |
| `/productos/[id]` | Detalle de producto |
| `/login` | Autenticación |
| `/admin` | Panel inicial exclusivo para administradores |

## Verificación del proyecto

```bash
npm run lint
npm run build
```

## Integración con Django

El frontend consume los productos desde `/api/catalogo/productos/`.

La autenticación utiliza los endpoints JWT del backend y las rutas internas `/api/auth/` de Next.js.

El acceso administrativo se valida mediante el campo `is_staff` del usuario autenticado.

## Repositorios

- Frontend: https://github.com/CarlaNada/muebleria-app-frontend
- Backend: https://github.com/CarlaNada/muebleria-app-backend

## Estado del proyecto

Integración local comprobada con Django. El panel administrativo cuenta con control de acceso, pero todavía no incluye funcionalidades de gestión de productos.
