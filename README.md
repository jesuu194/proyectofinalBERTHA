
# Proyecto Final Integrador — Elexia Reservas para Negocios

## Descripción del proyecto
Sistema profesional para la gestión de reservas en negocios (restaurantes, clínicas, talleres, belleza, gimnasios, eventos y más). Permite crear, consultar, editar y eliminar productos y reservas, con validaciones y reglas de negocio avanzadas. Arquitectura escalable, visual moderna y despliegue en la nube.

---

## Reglas de negocio (justificadas)
- No se permiten productos duplicados por nombre (evita confusión y errores de inventario).
- Precio y stock no pueden ser negativos (garantiza integridad de datos).
- No se pueden reservar más unidades que el stock disponible (control de inventario y satisfacción del cliente).
- No se permiten reservas en fechas pasadas (lógica temporal coherente).
- No se permiten reservas duplicadas para el mismo cliente, producto y fecha (evita solapamientos y errores de gestión).

Las reglas se validan tanto en backend como en frontend, mostrando mensajes claros y accesibles al usuario.

---

## Endpoints documentados

### Productos
- `POST   /api/v1/products` — Crear producto
- `GET    /api/v1/products?page=1&limit=10` — Listar productos (paginado)
- `GET    /api/v1/products/:id` — Obtener producto por ID
- `PUT    /api/v1/products/:id` — Actualizar producto
- `DELETE /api/v1/products/:id` — Eliminar producto

### Reservas
- `POST   /api/v1/reserva/post` — Crear reserva
- `GET    /api/v1/reserva/get/all?page=1&limit=10&estado=pendiente` — Listar reservas (paginado, filtro por estado)
- `GET    /api/v1/reserva/get/:id` — Obtener reserva por ID
- `PATCH  /api/v1/reserva/update/:id` — Actualizar reserva
- `DELETE /api/v1/reserva/delete/:id` — Eliminar reserva

Ejemplos de respuesta y errores están documentados en la API y en los controladores.

---

## URLs de despliegue

- **API Backend:** [https://api.elexiareservas.com](https://api.elexiareservas.com)
- **Frontend Angular:** [https://elexia-angular.vercel.app](https://elexia-angular.vercel.app)
- **Frontend React:** [https://elexia-react.vercel.app](https://elexia-react.vercel.app)

---

## Capturas de pantalla

![Inicio Elexia Reservas](docs/captura-inicio.png)
![Formulario Reserva](docs/captura-reserva.png)
![Listado Productos](docs/captura-productos.png)
![Chatbot IA](docs/captura-chatbot.png)

---

## Instrucciones de despliegue

### Backend/API
1. Instala dependencias:
    ```bash
    cd backend
    npm install
    ```
2. Configura la base de datos en `.env` (ejemplo):
    ```env
    MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/elexia
    PORT=3002
    ```
3. Inicia el servidor:
    ```bash
    node server.js
    ```
4. Accede a la API en `https://api.elexiareservas.com` o en local `http://localhost:3002`

### Angular
1. Ve a la carpeta `frontend-angular`.
2. Instala dependencias y ejecuta:
    ```bash
    npm install
    ng serve
    ```
3. Accede a `http://localhost:4200` o [https://elexia-angular.vercel.app](https://elexia-angular.vercel.app)

### React
1. Ve a la carpeta `frontend-react`.
2. Instala dependencias y ejecuta:
    ```bash
    npm install
    npm start
    ```
3. Accede a `http://localhost:3001` o [https://elexia-react.vercel.app](https://elexia-react.vercel.app)

---

## Notas finales
- Toda la documentación, reglas, endpoints y despliegue están centralizados aquí como exige la rúbrica.
- Para más detalles, consulta los diagramas, capturas y comentarios en el código.
