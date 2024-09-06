import Particle from "particle-api-js";
const particle = new Particle();
console.log(particle);

// Obtener el token y el deviceId desde el servidor
fetch('/api/get-token')
  .then(response => response.json())
  .then(function(data) {
    const token = data.token;  // Se obtiene el token de la respuesta del servidor
    const deviceId = data.deviceId;  // Se obtiene el deviceId del servidor
    console.log('Token obtenido:', token);
    console.log('Device ID obtenido:', deviceId);

    // Verificación adicional para asegurarse de que deviceId no es undefined
    if (!deviceId || !token) {
        console.error("Error: el token o el deviceId es undefined");
        return;
    }

    // Función que actualiza el valor en la salida y realiza la llamada a particle.function
    function updateTMSValue() {
        var Ktms = document.getElementById('Ktms').value;
        document.getElementById('Kvaluetms').innerText = Ktms; // Actualiza el valor del slider

        particle.callFunction({
          deviceId: deviceId,
          name: 'TMS_2',
          argument: Ktms,
          auth: token
        }).then(
          function(data) {
            console.log("Valor aplicado con éxito", data);
            document.getElementById('status').innerText = "Valor actualizado: " + Ktms*5;
          },
          function(err) {
            console.log("Error al aplicar el valor", err);
            document.getElementById('status').innerText = "Error al aplicar el valor";
          }
        );
    }

    // Asociar el evento oninput del slider a la función updateTMSValue
    document.getElementById('Ktms').oninput = function() {
      updateTMSValue(); // Llamar a la función cuando el valor del slider cambie
    };

    // Aplicar el valor al hacer clic en el botón
    document.getElementById('applyTMS').onclick = function() {
      updateTMSValue(); // Aplicar el valor cuando se presiona el botón
    };

  })
  .catch(function(err) {
    console.error('Error al obtener el token o deviceId:', err);
  });
