const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

app.get("/a5", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/a5/index.html'));
});

app.get("/a6", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/a6/index.html'));
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send(
    `<h1>Bienvenido a la página principal</h1>
    <p>Actividades IoT:</p>
    <ul>
      <li><a href="/a5">Actividad A5</a></li>
      <li><a href="/a6">Actividad A6</a></li>
    </ul>`
  );
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});