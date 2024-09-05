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

    // Verificación adicional para asegurarse de que deviceId no es undefined
    if (!deviceId) {
        console.error("Error: deviceId es undefined");
        return;
      }

    // Función para controlar los LEDs
    function controlLED(ledNumber, estado) {
        const ledFunction = ledNumber === 1 ? 'led' : 'led2';  // Función remota dependiendo del LED
        particle.callFunction({
          deviceId: deviceId,
          name: ledFunction,
          argument: estado,
          auth: token
        }).then(
          function(data) {
            console.log(`Función ${ledNumber} llamada exitosamente:`, data);
          },
          function(err) {
            console.log(`Error al llamar a la función ${ledNumber}:`, err);
          }
        );
      }
  
      // Asignar los eventos a los interruptores (Breaker1 y Breaker2)
      document.getElementById('Breaker1').onchange = function() {
        const estado = this.checked ? '1' : '0';  // Determina si está encendido o apagado
        controlLED(1, estado);  // Controla el LED 1
      };
  
      document.getElementById('Breaker2').onchange = function() {
        const estado = this.checked ? '1' : '0';  // Determina si está encendido o apagado
        controlLED(2, estado);  // Controla el LED 2
      };
  
    })
    .catch(function(err) {
      console.error('Error al obtener el token o deviceId:', err);
    });