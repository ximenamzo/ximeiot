const express = require('express');
const path = require('path');
const auth = require('./auth');  // El archivo auth.js sigue en el servidor
const app = express();
const port = 3000;

// Trae los archivos estáticos de la carpeta Public
app.use(express.static('public'));

// Middleware para asegurar que los archivos .js se sirvan con el MIME type correcto
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// **Nuevo endpoint para obtener el token**
app.get("/api/get-token", async (req, res) => {
  try {
    const { token, deviceId } = await auth.login();  // Llama a la función de autenticación
    res.json({ token, deviceId });  // Devuelve el token en formato JSON
  } catch (error) {
    console.error('Error al obtener el token:', error);
    res.status(500).json({ error: 'Error al obtener el token' });
  }
});

// Rutas para servir los archivos HTML de las actividades
app.get("/a3", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/a3/index.html'));
});

app.get("/a5", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/a5/index.html'));
});

app.get("/a6", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/a6/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
