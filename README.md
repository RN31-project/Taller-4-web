# Taller 4 web

## Iniciar el proyecto

Desde la carpeta raíz, ejecuta:

```bash
npm run dev
```

Esto inicia la API en `http://localhost:3000` y la interfaz de Vite (normalmente
en `http://localhost:5173`). Abre la dirección que muestra Vite. Mantén esa
terminal abierta mientras usas el proyecto; `Ctrl+C` detiene ambos servicios.

Durante el desarrollo, las solicitudes `/api` de la interfaz se envían a la API
mediante el proxy de Vite. Si la API se despliega en otro origen, configura
`VITE_API_URL` con la URL base de ese servicio.
