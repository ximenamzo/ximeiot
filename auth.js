require('dotenv').config();
const Particle = require('particle-api-js');
const particle = new Particle();

const deviceId = process.env.PARTICLE_DEVICE_ID;

async function login() {
    try {
        const loginData = await particle.login({
            username: process.env.PARTICLE_EMAIL,
            password: process.env.PARTICLE_PASSWORD
        });
        const token = loginData.body.access_token;
        console.log('Login exitoso!');
        return { token, deviceId };
    } catch (error) {
        console.error('No se pudo iniciar sesión: ', error);
        throw error;
    }
}

module.exports = { login };
