Este repositorio contiene el frontend de la EFI de Programación III, desarrollado con Next.js App Router y Tailwind CSS. La aplicación consume la API REST del proyecto de Ingeniería de Software.

# Flujo de ramas
Usamos GitFlow simplificado:
- main: versión estable y desplegada en Vercel. Solo recibe cambios mediante PR desde develop.
- develop: rama de integración. Recibe funcionalidades terminadas mediante PR.
- feature/front-<nombre-componente>: nuevas funcionalidades o componentes. Ejemplos: feature/front-product-list, feature/front-login.
- fix/front-<bug>: correcciones. Ejemplos: fix/front-token-expired, fix/front-product-form.

Antes de comenzar una tarea, actualizá tu rama base y creá una rama propia:
```bash
git switch develop
git pull origin develop
git switch -c feature/front-product-list
```

Mantené cada rama enfocada en una tarea. No trabajes directamente sobre main ni develop.

# Convención de commits
Usamos Conventional Commits con el formato:
<tipo>(<área>): <descripción breve en infinitivo>

Tipos habituales:
- feat: funcionalidad nueva.
- fix: corrección de un error.
- test: pruebas.
- docs: documentación.
- style: cambios de formato o estilos sin cambiar lógica.
- refactor: reorganización interna sin cambiar comportamiento.
- build: dependencias o configuración de compilación.

Ejemplos:
```bash
feat(front): crear listado de productos con búsqueda
feat(auth): agregar login con React Hook Form
fix(api): mostrar errores devueltos por el servidor
test(auth): agregar prueba unitaria para el esquema de Zod
docs(front): documentar variables de entorno
```

No incluyas secrets keys, tokens ni datos personales en los commits. Usá mensajes claros y específicos, con la descripción en infinitivo y en minúscula después de los dos puntos.

# Pull Requests
- Todo cambio que llegue a develop o main debe entrar mediante Pull Request.
- Está prohibido hacer push directo a main o develop.
- Cada PR hacia develop requiere la aprobación de al menos un integrante distinto del autor antes del merge.
- Los PR hacia main también deben revisarse y aprobarse antes del merge.
- El autor debe describir qué cambió, cómo probarlo y enlazar la tarea del tablero Kanban.
- Revisá que la aplicación compile y que los tests relevantes pasen antes de pedir revisión.
- Resolvé las conversaciones de revisión y actualizá la rama antes de mergear.
- Preferimos PR pequeños, con un único objetivo y capturas cuando el cambio visual lo amerite.

#Integración con la API
- La URL base se configura mediante NEXT_PUBLIC_API_URL en .env.local y en el entorno de despliegue.
- No subas .env.local ni credenciales al repositorio. Mantené actualizado .env.example con nombres de variables y valores de ejemplo no sensibles.
- Coordiná los endpoints, formatos de respuesta, autenticación y permisos con el equipo del backend antes de cerrar la integración.