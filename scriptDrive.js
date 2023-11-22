//const fs = require('fs').promises;
const { promises: fsPromises } = require('fs');
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const {googleSpreadSheet} = require('google-spreadsheet')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive'];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fsPromises.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fsPromises.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fsPromises.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}


/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function reloadFile(authClient) {
    const drive = google.drive({version: 'v3', auth: authClient});
    console.log('ahora vamos a actualizar datos del drive sheets de nuevo0');
    const fileDriveId='1cuhoAuE5RFA7I2ETHfhH8hVhl_RbFyyJ'
        console.log('ahora vamos a actualizar datos del drive sheets de nuevo');
    await drive.files.update({
      fileId: fileDriveId,
      media: {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Cambia el tipo MIME según el tipo de archivo que estés utilizando
        //body: fsPromises.createReadStream('public/static/json/dataFotosAp.xlsx'), // Reemplaza con el path a tu archivo local
      },
        viewedByMe: true, // Esta propiedad intentará abrir el archivo en segundo plano
    }, (err, res) => {
      if (err) return console.error('Error al recargar el archivo:', err);
    console.log('Archivo recargado con éxito:', res.data);
  });
  }





/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function listFiles(authClient) {
  const drive = google.drive({version: 'v3', auth: authClient});
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return files;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
  //console.log("Hello world!!");
//try {
  console.log('ahora vamos a actualizar datos del drive sheets');
  // const doc = new googlespreadsheet ('1cuhoAuE5RFA7I2ETHfhH8hVhl_RbFyyJ');
  //     await doc.loadInfo();
  //
  //     console.log('Datos actualizados correctamente.');
  //   } catch (error) {
  //     console.error('Error al actualizar datos:', error.message);
  //   }

  // Función para recargar el archivo



  const fileId='1cuhoAuE5RFA7I2ETHfhH8hVhl_RbFyyJ' // https://docs.google.com/spreadsheets/d/1SYIlZ3q85xxu6e5J_xh8SeOihLyo37Ef5qDFU75ZvtI/edit?usp=sharing
  //const realFileId=res.data.files.name["datosFotosAPU.json"]; //estoy intentando que lea el arhivo por su nombre y no por su id
  console.log("viene la exportacion");
  //fileId = realFileId;
    const archivoJson = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    });


    //console.log(archivoJson);
    // Configura el archivo JSON de salida
    const jsonFilePath = 'public/static/json/dataFotosApu.json';
  //  fsPromises.writeFileSync(jsonFilePath, JSON.stringify(archivoJson));

  try {
      await fsPromises.writeFile(jsonFilePath, JSON.stringify(archivoJson));
      console.log('Archivo JSON escrito exitosamente.');
    } catch (err) {
      console.error('Error al escribir el archivo JSON:', err);
    }
    return archivoJson;
  // } catch (err) {
  //   // TODO(developer) - Handle error
  //   throw err;
  // }
}
authorize().then(reloadFile).catch(console.error);
authorize().then(listFiles).catch(console.error);
