const { googleSpreadSheet } = require('google-spreadsheet')
const fs = require('fs');
const cron = require('node-cron');

/**
 * TODO(developer):
 *  1. Uncomment and replace these variables before running the sample.
 *  2. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
 *  3. Make sure you have the necessary permission to list storage buckets "storage.buckets.list"
 *    (https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions)
 */
// const projectId = 'YOUR_PROJECT_ID';

// const {Storage} = require('@google-cloud/storage');
//
// async function authenticateImplicitWithAdc() {
//   // This snippet demonstrates how to list buckets.
//   // NOTE: Replace the client created below with the client required for your application.
//   // Note that the credentials are not specified when constructing the client.
//   // The client library finds your credentials using ADC.
//   const storage = new Storage({
//     projectId,
//   });
//   const [buckets] = await storage.getBuckets();
//   console.log('Buckets:');
//
//   for (const bucket of buckets) {
//     console.log(`- ${bucket.name}`);
//   }
//
//   console.log('Listed all storage buckets.');
// }
//
// authenticateImplicitWithAdc();

// Configura la hoja de cálculo y las credenciales
const doc = new GoogleSpreadSheet ('1SYIlZ3q85xxu6e5J_xh8SeOihLyo37Ef5qDFU75ZvtI');
const creds = require('.apu-json-f1c88f7759ed.json');

// Configura el archivo JSON de salida
const jsonFilePath = '/public/static/json/dataFotosApu.json';

async function actualizarDatos() {
  try {
    // Autenticación con las credenciales
    await doc.useServiceAccountAuth(creds);
    // Cargar la hoja de cálculo
    await doc.loadInfo();

    // Selecciona la primera hoja de cálculo (puedes ajustar esto según tu caso)
    const sheet = doc.sheetsByIndex[0];

    // Lee los datos de la hoja de cálculo
    const rows = await sheet.getRows();

    // Procesa los datos como desees
    const datosProcesados = rows.map(row => ({
      columna1: row.columna1,
      columna2: row.columna2,
      columna3: row.columna3,
      // Agrega más columnas según tu hoja de cálculo
    }));

    // Guarda los datos en un archivo JSON
    fs.writeFileSync(jsonFilePath, JSON.stringify(datosProcesados, null, 2));

    console.log('Datos actualizados correctamente.');
  } catch (error) {
    console.error('Error al actualizar datos:', error.message);
  }
}

// Ejecuta la actualización una vez al día (por ejemplo, todos los días a las 3:00 AM)
// Puedes ajustar el cron según tus necesidades
actualizarDatos();

// // Configura la tarea cron para ejecutar la función cada día a las 3:00 AM
// cron.schedule('0 3 * * *', () => {
//   actualizarDatos();
//   console.log('Tarea programada ejecutada.');
// });
