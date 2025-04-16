# Instrucciones para el Despliegue de Tienda Peluditos

Este documento proporciona instrucciones detalladas para desplegar la aplicación "Tienda Peluditos" en producción, incluyendo el frontend, backend y base de datos.

## 1. Despliegue de la Aplicación Cliente en Netlify (2 puntos)

### Preparación

1. Asegúrate de que tu código está en un repositorio de GitHub.
2. Confirma que tienes el archivo `netlify.toml` en la raíz del proyecto.

### Pasos para el Despliegue

1. Crea una cuenta en [Netlify](https://app.netlify.com/) si aún no tienes una.
2. Haz clic en "New site from Git".
3. Selecciona GitHub como tu proveedor de repositorios.
4. Autoriza a Netlify para acceder a tus repositorios.
5. Selecciona el repositorio de tu aplicación cliente.
6. En la configuración del despliegue:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Haz clic en "Deploy site".
8. Una vez completado el despliegue, ve a "Site settings" > "Environment variables" y verifica que `VITE_API_URL` está configurado como `https://tienda-peluditos-api.onrender.com/api`.

## 2. Despliegue de la Aplicación Backend en Render (2 puntos)

### Preparación

1. Asegúrate de que tu código backend está en un repositorio separado de GitHub.
2. Confirma que tienes el archivo `render.yaml` en la raíz del proyecto.

### Pasos para el Despliegue

1. Crea una cuenta en [Render](https://render.com/) si aún no tienes una.
2. Haz clic en "New" y selecciona "Blueprint".
3. Conecta tu repositorio de GitHub.
4. Render detectará automáticamente el archivo `render.yaml` y configurará los servicios.
5. Haz clic en "Apply" para crear los servicios definidos en el archivo YAML.
6. Una vez completado el despliegue, ve a la pestaña "Environment" del servicio web y verifica las variables de entorno.

## 3. Despliegue de la Base de Datos (2 puntos)

### Opción 1: MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Haz clic en "Build a Database".
3. Selecciona el plan gratuito (M0).
4. Elige un proveedor de nube y una región cercana a tus usuarios.
5. Crea un nombre para tu clúster y haz clic en "Create Cluster".
6. En la sección "Database Access", crea un usuario con permisos de lectura y escritura.
7. En la sección "Network Access", añade `0.0.0.0/0` para permitir conexiones desde cualquier lugar (para desarrollo).
8. En el panel principal, haz clic en "Connect" en tu clúster y selecciona "Connect your application".
9. Copia la cadena de conexión y reemplaza `<password>` con la contraseña de tu usuario.

### Opción 2: Base de Datos Render (automática con render.yaml)

Si usaste el archivo `render.yaml` proporcionado, Render creará automáticamente una base de datos MongoDB y configurará la variable de entorno `MONGODB_URI` en tu servicio backend.

## 4. Integración de la Aplicación Cliente con el Backend en Producción (4 puntos)

### Verificación de la Integración

1. Despliega primero la base de datos y el backend.
2. Obtén la URL del backend desplegado (por ejemplo, `https://tienda-peluditos-api.onrender.com`).
3. Actualiza la variable de entorno `VITE_API_URL` en el despliegue de Netlify para que apunte a la URL correcta de la API.
4. Despliega la aplicación cliente.
5. Prueba la integración completa:
   - Navega a la URL de tu aplicación cliente desplegada.
   - Intenta realizar operaciones que involucren al backend y la base de datos (por ejemplo, registro de usuario, inicio de sesión, añadir productos al carrito).
   - Verifica que los datos se estén guardando correctamente en la base de datos.

### Uso del Script de Verificación de Despliegue

1. Actualiza las URLs en el archivo `deploy-check.js` con las URLs reales de tu aplicación desplegada.
2. Ejecuta el script con el comando: `npm run deploy-check`.
3. Revisa la salida para confirmar que todos los componentes están conectados correctamente.

## Solución de Problemas Comunes

### Problemas CORS

Si encuentras errores CORS, asegúrate de que tu backend tenga la configuración adecuada de CORS:

```javascript
app.use(cors({
  origin: ['https://tu-app-cliente.netlify.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Errores de Conexión a la Base de Datos

- Verifica que la cadena de conexión es correcta y contiene las credenciales adecuadas.
- Asegúrate de que la IP desde donde se conecta tu backend está en la lista blanca de MongoDB Atlas.

### Problemas de Variables de Entorno

- Verifica que todas las variables de entorno necesarias estén configuradas en las plataformas respectivas.
- Reinicia los servicios después de actualizar las variables de entorno.

## Comprobación Final

Tu aplicación está desplegada correctamente si:

1. La URL de la aplicación cliente carga sin errores.
2. Puedes navegar por todas las páginas.
3. Las funcionalidades que requieren interacción con el backend (como iniciar sesión) funcionan correctamente.
4. Los datos se persisten entre sesiones.

¡Felicidades! Has desplegado exitosamente tu aplicación en producción. 