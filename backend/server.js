// import express  from "express"
// import cors from "cors"
// import bodyParser from "body-parser"
// const app = express()
// const port = 3000

// app.use(cors()) 
// app.use(bodyParser.json())

// app.get('/', (req, res) => { 
//     res.send('Hello World!')
// })

// app.post('/', (req, res) => { 
//     console.log(req.body)
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// Import necessary modules
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQL Server configuration for Windows authentication
const config = {
  host: 'localhost',
  database: 'React tut',
  options: {
    trustedConnection: true, // Use Windows authentication
    enableArithAbort: true,
    trustServerCertificate: true
  }
};

// Create connection pool
const poolPromise = mysql.createPool(config);

// Test the connection (optional)
poolPromise.getConnection()
  .then(connection => {
    console.log('Connected to SQL Server as ID:', connection.threadId);
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to SQL Server:', error.stack);
  });

// Routes
app.get('/', (req, res) => { 
  res.send('Hello World!');
});

app.post('/users', async (req, res) => { 
  const { username, password } = req.body;

  try {
    // Get a connection from the pool
    const pool = await poolPromise;
    
    // Insert into 'users' table
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    
    console.log('Inserted new user with ID:', result[0].insertId);
    res.status(201).json({ message: 'User inserted successfully' });
  } catch (error) {
    console.error('Error inserting into users:', error.stack);
    res.status(500).json({ error: 'Error inserting into users' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
