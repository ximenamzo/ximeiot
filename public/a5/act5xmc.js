var particle = new Particle();
var token;

// Iniciar sesión en Particle
particle.login({ username: 'ximenamzo1994@gmail.com', password: 'P-XimeMzoCast357!*' }).then(
    function(data) {
        token = data.body.access_token;
        console.log('Logged in successfully!');
    },
    function(err) {
        console.log('Could not log in.', err);
    }
);

// Función para controlar el LED con el interruptor
document.getElementById('Breaker1').onchange = function() {
    var estado = this.checked ? '1' : '0';

    // Llamada a la función remota para controlar el LED 1
    particle.callFunction({ 
        deviceId: '190033000947313037363132', 
        name: 'led',
        argument: estado, 
        auth: token 
    }).then(
        function(data) {
            console.log('Function called successfully:', data);
        },
        function(err) {
            console.log('An error occurred:', err);
        }
    );
};

// Función para controlar el LED con el interruptor
document.getElementById('Breaker2').onchange = function() {
    var estado = this.checked ? '1' : '0';

    // Llamada a la función remota para controlar el LED 2
    particle.callFunction({ 
        deviceId: '190033000947313037363132', 
        name: 'led2',
        argument: estado, 
        auth: token 
    }).then(
        function(data) {
            console.log('Function called successfully:', data);
        },
        function(err) {
            console.log('An error occurred:', err);
        }
    );
};