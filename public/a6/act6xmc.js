// Importa la biblioteca Particle API JS para interactuar con dispositivos Particle
import Particle from "particle-api-js";  
// Crea una nueva instancia de la API de Particle
const particle = new Particle(); 
// Imprime en la consola la instancia de Particle para ver sus propiedades
console.log(particle);  


// Obtener el token y el deviceId desde el servidor
fetch('/api/get-token') 
  // Realiza una solicitud para obtener el token y el deviceId desde un endpoint '/api/get-token'
  .then(response => response.json())
  // Convierte la respuesta del servidor en formato JSON
  .then(function(data) {
    // Se obtiene el token y el device IDde la respuesta del servidor
    const token = data.token;
    const deviceId = data.deviceId;
    // Imprime el token y el device ID en la consola del navegador para verificar
    console.log('Token obtenido:', token);
    console.log('Device ID obtenido:', deviceId);

    // Verificación adicional para asegurarse de que deviceId no es undefined
    if (!deviceId || !token) {
        console.error("Error: el token o el deviceId es undefined");
        return;
    }

    // Función que actualiza el valor en la salida y realiza la llamada a particle.function
    function updateTMSValue() {
        // Obtiene el valor actual del slider (input de tipo range)
        var Ktms = document.getElementById('Ktms').value;
        // Actualiza el valor del slider en la pagina
        document.getElementById('Kvaluetms').innerText = Ktms; 

        // Llama a la función Particle para enviar el valor TMS a la nube
        particle.callFunction({
          deviceId: deviceId, // DeviceId llegado del servidor
          name: 'TMS_2', // Nombre de la función registrada en particle
          argument: Ktms, // Envía el valor del slider como argumento a la función
          auth: token // El token de autenticación para autorizar la llamada a Particle
        }).then(
          function(data) {
            // Si la llamada fue exitosa imprime el valor
            console.log("Valor aplicado con éxito", data);
            document.getElementById('status').innerText = "Valor actualizado: " + Ktms*5;
          },
          function(err) {
            // Si ocurrió un error durante la llamada
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
    // Si hubo un error en la solicitud fetch para obtener el token o deviceId
    console.error('Error al obtener el token o deviceId:', err);
  });
