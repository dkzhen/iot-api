const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Menambahkan CORS
app.use(bodyParser.json()); // Menggunakan body-parser untuk data JSON
app.use(bodyParser.urlencoded({ extended: true })); // Menggunakan body-parser untuk data URL-encoded

// config
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Convert escaped newlines to actual newlines
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://earthquake-41704-default-rtdb.firebaseio.com",
});

// Reference to the Firebase database
const db = admin.database();

// Contoh endpoint GET
app.get("/", (req, res) => {
  // Logika untuk mengambil data

  res.send("Server running...");
});

// Contoh endpoint POST
app.post("/api", (req, res) => {
  // Mendapatkan data dari body request
  const newData = req.body;

  const newKey = 1;

  const updates = {};
  updates[`limit/${newKey}`] = newData;

  db.ref().update(newData);

  // Lakukan sesuatu dengan newData (simpan ke database, dll)
  // Contoh sederhana, hanya merespons dengan data yang diterima
  res.status(200).json("data sended");
});

// Menjalankan server di port tertentu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
