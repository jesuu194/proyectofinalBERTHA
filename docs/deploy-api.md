# Instrucciones de despliegue Backend/API

1. Instala Node.js y MongoDB en tu máquina o usa MongoDB Atlas.
2. Clona el repositorio y entra en la carpeta `backend`.
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Configura la base de datos en `.env` (opcional, por defecto usa local):
   ```env
   MONGO_URI=mongodb://localhost:27017/proyecto
   PORT=3000
   ```
5. Inicia el servidor:
   ```bash
   node server.js
   ```
6. Accede a la API en `http://localhost:3000`

Para despliegue en la nube, usar servicios como Render, Railway, Heroku, etc. y configurar variables de entorno.
