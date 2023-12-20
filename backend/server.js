require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 4000;

// Replace 'myappuser' and 'mypassword' with your actual username and password
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
  

app.use(express.json()); // This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.

app.get('/', async (req, res) => {
  try {
    const testQuery = await pool.query('SELECT NOW()');
    res.json(testQuery.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Example endpoint for user registration (This is just a placeholder and will not work until you create the logic)
app.post('/register', async (req, res) => {
  // Here you will handle the user registration logic
  // For example, you will get user details from req.body and insert them into the users table
  // Remember to hash the password before storing it
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});