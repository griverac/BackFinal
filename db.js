// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Cargar las variables de entorno

// Crear un pool de conexiones
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Exportar el pool para que pueda ser utilizado en otros módulos
module.exports = pool;
