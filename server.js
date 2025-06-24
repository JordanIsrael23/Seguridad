const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres', 
    host: 'database-1.cevxmiitu3w2.us-east-1.rds.amazonaws.com',
    database: 'libros',
    password: 'Jresistencia18', 
    port: 5432,
    ssl: {
        rejectUnauthorized: false 
    }
});

app.use(express.static('public'));

app.get('/books', async (req, res) => {
    try {
        console.log('Intentando conectar a la base de datos...');
        const client = await pool.connect();
        console.log('Conexión exitosa, intentando consulta...');
        const result = await client.query('SELECT * FROM libros');
        console.log('Consulta exitosa, filas:', result.rows.length);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error('Error detallado:', err.stack);
        res.status(500).send('Error al consultar los libros: ' + err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});