
# Diagramas del sistema

## Diagrama de arquitectura

```mermaid
flowchart TD
	subgraph Frontend
		A1[Angular SPA] 
		A2[React SPA]
	end
	subgraph Backend
		B1[Node.js + Express API]
		B2[MongoDB]
	end
	A1 -- REST API --> B1
	A2 -- REST API --> B1
	B1 -- ODM/Mongoose --> B2
	style A1 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
	style A2 fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
	style B1 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
	style B2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
```

**Descripción:**
Ambos frontends (Angular y React) consumen la misma API REST Node.js/Express, que a su vez gestiona la persistencia en MongoDB mediante Mongoose. Esto permite desacoplar la lógica de presentación y negocio, facilitando la escalabilidad y el mantenimiento.

## Diagrama de flujo: creación de reserva

```mermaid
flowchart TD
	U[Usuario] -->|Crea reserva| F[Formulario Reserva]
	F -->|Valida datos| V[Validaciones]
	V -- OK --> API[POST /api/v1/reserva/post]
	V -- Error --> FE[Feedback usuario]
	API -->|Reglas negocio| BN[Backend: Controlador]
	BN -- OK --> DB[MongoDB]
	BN -- Error --> FE
	DB -->|Reserva creada| FE
	FE -->|Mensaje éxito o error| U

	style F fill:#e3f2fd,stroke:#1976d2
	style V fill:#fffde7,stroke:#fbc02d
	style API fill:#fff3e0,stroke:#f57c00
	style BN fill:#f3e5f5,stroke:#7b1fa2
	style DB fill:#e8f5e9,stroke:#388e3c
	style FE fill:#ffcdd2,stroke:#c62828
	style U fill:#bbdefb,stroke:#1976d2
```

**Descripción:**
El usuario completa el formulario de reserva. El frontend valida los datos y muestra feedback inmediato. Si todo es correcto, se envía la petición a la API, donde se aplican reglas de negocio (stock, fechas, duplicados). El backend responde con éxito o error, y el frontend informa al usuario.
