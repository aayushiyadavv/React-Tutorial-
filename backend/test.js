import express from 'express';
import sql  from 'mssql';



const app = express();

// Database configuration
const config = {
    server: 'localhost',    
    database: 'React tut',  // Replace with your database name
    options: {
        trustedConnection: true,   
    },
};

// Connect to SQL Server
sql.connect(config)
    .then(pool => {
        console.log('Connected to SQL Server');

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Error connecting to SQL Server:', err);
    });

// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});