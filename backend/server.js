require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000; // Use the port from the environment variable or 4000 if not set

app.use(cors()); 


// PostgreSQL pool configuration
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Express session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // The secret key from your .env file
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS, required in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json()); // Middleware for parsing JSON

// Root endpoint to test server availability
app.get('/', async (req, res) => {
  try {
    const testQuery = await pool.query('SELECT NOW()');
    res.json(testQuery.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// User Registration Endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).send('User already exists');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// User Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      // Compare hashed password
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (validPassword) {
        // Set user session
        req.session.userId = user.rows[0].user_id;
        res.send('Logged in successfully');
      } else {
        res.status(401).send('Invalid password');
      }
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
