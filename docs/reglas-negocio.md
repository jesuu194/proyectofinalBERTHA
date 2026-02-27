
# Reglas de negocio justificadas y ejemplos de validación

Cada regla se valida tanto en backend como en frontend, mostrando mensajes claros al usuario.

---

## 1. No se permiten productos duplicados por nombre
- **Justificación:** Evita confusión y errores de inventario.
- **Validación:**
	- Si se intenta crear un producto con un nombre ya existente:
		- **Error:**
			```json
			{ "error": "Ya existe un producto con ese nombre" }
			```

## 2. Precio y stock no pueden ser negativos
- **Justificación:** Garantiza integridad de datos y lógica de negocio.
- **Validación:**
	- Si el precio o stock es menor que 0:
		- **Error:**
			```json
			{ "error": "El precio y el stock deben ser valores positivos" }
			```

## 3. No se pueden reservar más unidades que el stock disponible
- **Justificación:** Control de inventario y satisfacción del cliente.
- **Validación:**
	- Si la cantidad reservada supera el stock:
		- **Error:**
			```json
			{ "error": "No hay suficiente stock disponible para la reserva" }
			```

## 4. No se permiten reservas en fechas pasadas
- **Justificación:** Sentido temporal y coherencia.
- **Validación:**
	- Si la fecha de la reserva es anterior a hoy:
		- **Error:**
			```json
			{ "error": "No se pueden crear reservas en fechas pasadas" }
			```

## 5. No se permiten reservas duplicadas para el mismo cliente, producto y fecha
- **Justificación:** Evita solapamientos y errores de gestión.
- **Validación:**
	- Si ya existe una reserva igual:
		- **Error:**
			```json
			{ "error": "Ya existe una reserva para ese cliente, producto y fecha" }
			```

---

Estas reglas están implementadas y validadas en los controladores de la API y reflejadas en los formularios del frontend, mostrando feedback inmediato y accesible.
