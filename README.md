# Proyecto Final Integrador — MEAN + Angular + React

## Descripción
Sistema de gestión de productos y reservas. Permite CRUD de productos y reservas, con validaciones y reglas de negocio. Arquitectura profesional, escalable y documentada.

## Estructura del proyecto
- **backend/**: API REST Node.js + Express + MongoDB
- **frontend-angular/**: Cliente Angular (ver sección Angular más abajo)
- **frontend-react/**: Cliente React

## Diagramas
Ver carpeta `/docs` para diagramas de arquitectura y flujo (añadir imágenes o enlaces a draw.io/lucidchart).

## Endpoints documentados

### Productos
- `POST   /api/v1/products` — Crear producto
- `GET    /api/v1/products?page=1&limit=10` — Listar productos (paginado)
- `GET    /api/v1/products/:id` — Obtener producto por ID
- `PUT    /api/v1/products/:id` — Actualizar producto
- `DELETE /api/v1/products/:id` — Eliminar producto

### Reservas
- `POST   /api/v1/reserva/post` — Crear reserva
- `GET    /api/v1/reserva/get/all?page=1&limit=10` — Listar reservas (paginado, filtro por estado)
- `GET    /api/v1/reserva/get/:id` — Obtener reserva por ID
- `PATCH  /api/v1/reserva/update/:id` — Actualizar reserva
- `DELETE /api/v1/reserva/delete/:id` — Eliminar reserva

## Reglas de negocio (justificadas)
- No se permiten productos duplicados por nombre (evita confusión y errores de inventario).
- Precio y stock no pueden ser negativos (garantiza integridad de datos).
- No se pueden reservar más unidades que el stock disponible (control de inventario).
- No se permiten reservas en fechas pasadas (lógica temporal coherente).
- No se permiten reservas duplicadas para el mismo cliente, producto y fecha (evita solapamientos y errores de gestión).

## Despliegue

### Backend/API
1. Instala dependencias:
	```bash
	cd backend
	npm install
	```
2. Configura la base de datos en `.env` o usa la local por defecto.
3. Inicia el servidor:
	```bash
	node server.js
	```
4. Accede a la API en `http://localhost:3000`

### Angular
1. Ve a la carpeta `frontend-angular`.
2. Instala dependencias y ejecuta:
	```bash
	npm install
	ng serve
	```
3. Accede a `http://localhost:4200`

#### Guía Angular CLI

Este frontend fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 21.2.0.

- Para crear componentes: `ng generate component nombre-componente`
- Para construir el proyecto: `ng build`
- Para ejecutar pruebas unitarias: `ng test`
- Para pruebas end-to-end: `ng e2e`

Más información y comandos en la [documentación oficial de Angular CLI](https://angular.dev/tools/cli).

### React
1. Ve a la carpeta `frontend-react`.
2. Instala dependencias y ejecuta:
	```bash
	npm install
	npm start
	```
3. Accede a `http://localhost:3001` (o el puerto configurado)

## Notas finales
- Añade aquí los enlaces de despliegue en la nube si aplica.
- Para más detalles, consulta los diagramas y comentarios en el código.
