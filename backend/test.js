import express from 'express';
import https from 'https';
import fs from 'fs';
import sql from 'mssql';
import process from 'process';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

// Database configuration
const dbConfig = {
    server: 'localhost',
    //database: 'default',  //Replace with your database name
    options: {
        encrypt: false,  // Use encryption
        trustServerCertificate: false // If you are using a self-signed certificate
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'SA', // Replace with your SQL Server username
            password: ''  // Replace with your SQL Server password
        }
    }
};

// HTTPS Server configuration
const port = process.env.PORT || 443;
const httpsOptions = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
};

// Connect to SQL Server
sql.connect(dbConfig)
    // eslint-disable-next-line no-unused-vars
    .then(_pool => {
        console.log('Connected to SQL Server');

        // Start HTTPS server
        https.createServer(httpsOptions, app)
            .listen(port, () => {
                console.log(`Server is running on https://localhost:${port}`);
            });
    })
    .catch(err => {
        console.error('Error connecting to SQL Server:', err);
    });

// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
