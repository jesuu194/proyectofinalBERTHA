# Instrucciones de despliegue Angular

1. Instala Node.js y Angular CLI (`npm install -g @angular/cli`).
2. Entra en la carpeta `frontend-angular`.
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Ejecuta la app:
   ```bash
   ng serve
   ```
5. Accede a `http://localhost:4200`

Para producción:
- Ejecuta `ng build --prod` y sube la carpeta `dist/` a un hosting estático (Vercel, Netlify, Firebase Hosting, etc).
