import Particle from "particle-api-js";
const particle = new Particle();
console.log(particle);

// Obtener el token y el deviceId desde el servidor
fetch('/api/get-token')
  .then(response => response.json())
  .then(function(data) {
    const token = data.token;  // Se obtiene el token de la respuesta del servidor
    const deviceId = data.deviceId;  // deviceId desde el servidor
    console.log('Token obtenido:', token);
    console.log('Device ID obtenido:', deviceId);

    // Función para escuchar eventos de Particle
    function listenToEvents() {
        particle.getEventStream({ deviceId: deviceId, auth: token })
            .then(function(stream) {
                stream.on('event', function(data) {
                    if (data.name === "TEMP-HUM") {
                        var parts = data.data.split(',');
                        var temperature = parseFloat(parts[0]).toFixed(2);
                        var humidity = parseFloat(parts[1]).toFixed(2);
                        document.getElementById('Temperatura').innerText = temperature + "°C";
                        document.getElementById('Humedad').innerText = humidity + "%";
                    }
                });
            })
            .catch(err => {
                console.error('Error al obtener el stream de eventos:', err);
            });
    }

    listenToEvents();
  })
  .catch(function(err) {
    console.error('Error al obtener el token:', err);
  });
