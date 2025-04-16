import fetch from 'node-fetch';

// URLs de producción
const FRONTEND_URL = 'https://[tu-app-en-netlify].netlify.app';
const BACKEND_URL = 'https://tienda-peluditos-api.onrender.com';
const API_URL = `${BACKEND_URL}/api`;

async function checkConnectivity() {
  console.log('🚀 Verificando conectividad de despliegue...');

  try {
    // Verificar frontend
    console.log('Verificando frontend...');
    const frontendResponse = await fetch(FRONTEND_URL);
    console.log(`Frontend responde con status: ${frontendResponse.status}`);

    // Verificar backend
    console.log('\nVerificando backend...');
    const backendResponse = await fetch(`${API_URL}/health`);
    if (backendResponse.ok) {
      const data = await backendResponse.json();
      console.log(`Backend responde: ${JSON.stringify(data)}`);
    } else {
      console.error(`Error al conectar con el backend: ${backendResponse.status}`);
    }

    // Verificar conexión DB a través del backend
    console.log('\nVerificando conexión a la base de datos...');
    const dbCheckResponse = await fetch(`${API_URL}/db-check`);
    if (dbCheckResponse.ok) {
      const data = await dbCheckResponse.json();
      console.log(`Estado de la base de datos: ${JSON.stringify(data)}`);
    } else {
      console.error(`Error en la conexión con la base de datos: ${dbCheckResponse.status}`);
    }

    console.log('\n✅ Verificación completa.');
  } catch (error) {
    console.error('\n❌ Error durante la verificación:', error.message);
  }
}

checkConnectivity(); 