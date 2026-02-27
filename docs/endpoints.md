
# Documentación de Endpoints API

Todos los endpoints devuelven JSON. Ejemplos de uso y respuesta incluidos para cada recurso.

## Productos

### Crear producto
- **POST** `/api/v1/products`
- **Body:**
	```json
	{
		"nombre": "Bot IA",
		"descripcion": "Asistente virtual para ventas",
		"precio": 99.99,
		"stock": 10
	}
	```
- **Respuesta 201:**
	```json
	{
		"_id": "abc123",
		"nombre": "Bot IA",
		"descripcion": "Asistente virtual para ventas",
		"precio": 99.99,
		"stock": 10
	}
	```
- **Errores:** 400 si existe producto o datos inválidos

### Listar productos
- **GET** `/api/v1/products?page=1&limit=10`
- **Respuesta 200:**
	```json
	{
		"products": [
			{ "_id": "abc123", "nombre": "Bot IA", "precio": 99.99, "stock": 10 },
			{ "_id": "def456", "nombre": "Chatbot Pro", "precio": 149.99, "stock": 5 }
		],
		"total": 2,
		"page": 1,
		"limit": 10
	}
	```

### Obtener producto por ID
- **GET** `/api/v1/products/:id`
- **Respuesta 200:**
	```json
	{
		"_id": "abc123",
		"nombre": "Bot IA",
		"descripcion": "Asistente virtual para ventas",
		"precio": 99.99,
		"stock": 10
	}
	```
- **Errores:** 404 si no existe

### Actualizar producto
- **PUT** `/api/v1/products/:id`
- **Body:**
	```json
	{
		"precio": 120.00,
		"stock": 8
	}
	```
- **Respuesta 200:**
	```json
	{
		"_id": "abc123",
		"nombre": "Bot IA",
		"precio": 120.00,
		"stock": 8
	}
	```
- **Errores:** 404 si no existe

### Eliminar producto
- **DELETE** `/api/v1/products/:id`
- **Respuesta 200:**
	```json
	{ "message": "Producto eliminado" }
	```
- **Errores:** 404 si no existe

---

## Reservas

### Crear reserva
- **POST** `/api/v1/reserva/post`
- **Body:**
	```json
	{
		"cliente": "Juan Pérez",
		"producto": "abc123",
		"fecha": "2026-03-01",
		"cantidad": 2
	}
	```
- **Respuesta 201:**
	```json
	{
		"_id": "res789",
		"cliente": "Juan Pérez",
		"producto": "abc123",
		"fecha": "2026-03-01T00:00:00.000Z",
		"cantidad": 2,
		"estado": "pendiente"
	}
	```
- **Errores:** 400 validación, 404 producto no existe

### Listar reservas
- **GET** `/api/v1/reserva/get/all?page=1&limit=10&estado=pendiente`
- **Respuesta 200:**
	```json
	{
		"reservas": [
			{ "_id": "res789", "cliente": "Juan Pérez", "producto": "abc123", "fecha": "2026-03-01T00:00:00.000Z", "cantidad": 2, "estado": "pendiente" }
		],
		"total": 1,
		"page": 1,
		"limit": 10
	}
	```

### Obtener reserva por ID
- **GET** `/api/v1/reserva/get/:id`
- **Respuesta 200:**
	```json
	{
		"_id": "res789",
		"cliente": "Juan Pérez",
		"producto": "abc123",
		"fecha": "2026-03-01T00:00:00.000Z",
		"cantidad": 2,
		"estado": "pendiente"
	}
	```
- **Errores:** 404 si no existe

### Actualizar reserva
- **PATCH** `/api/v1/reserva/update/:id`
- **Body:**
	```json
	{
		"estado": "confirmada"
	}
	```
- **Respuesta 200:**
	```json
	{
		"_id": "res789",
		"estado": "confirmada"
	}
	```
- **Errores:** 404 si no existe

### Eliminar reserva
- **DELETE** `/api/v1/reserva/delete/:id`
- **Respuesta 200:**
	```json
	{ "message": "Reserva eliminada" }
	```
- **Errores:** 404 si no existe

---

Para más detalles, ver comentarios en los controladores.
