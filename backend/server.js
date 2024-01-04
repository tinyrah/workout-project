require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow the frontend domain
  credentials: true, // Allow cookies to be sent
}));



// Connect to PostgreSQL database, its our connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Handles user sessions
app.use(session({
  store: new pgSession({
    pool: pool, // Use the existing pool
    tableName: 'session' // Use the name of the table you wish to store sessions in
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// tells express to parse json
app.use(express.json());

// Test route, just gets server time to show we have connection to database
app.get('/', async (req, res) => {
  try {
    const testQuery = await pool.query('SELECT NOW()');
    res.json(testQuery.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Comments for register route
  1. Takes in email and password from request body
  2. Checks if user exists in database, if so returns 409
  3. Hashes password using bcrypt
  4. Inserts user into database
  5. Returns 201 if successful
*/
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).send('User already exists');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Comments for login route
  1. Takes in email and password from request body
  2. Checks if user exists in database, if not returns 404
  3. Checks if password is valid, if not returns 401
  4. Sets session variables (userId and userEmail)
  5. Returns user ID if successful
*/
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (validPassword) {
        req.session.userId = user.rows[0].user_id;
        req.session.userEmail = user.rows[0].email;
        res.send({ userId: user.rows[0].user_id, email: user.rows[0].email });
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

// Middleware to check if user is logged in

const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send('You must be logged in.');
  }
  next();
};

/* Comments for goals post route
  1. Takes in goals from request body
  2. Inserts goals into database
  3. Returns 200 if successful
*/
app.post('/goals', isAuthenticated, async (req, res) => {
  console.log('Session data:', req.session);

  const userId = req.session.userId; // Use userId from session
  const { goals } = req.body;

  console.log('Received goals for saving:', { userId, goals }); // Log the received data

  try {
    for (const goal of goals) {
      await pool.query('INSERT INTO goals (user_id, name, target) VALUES ($1, $2, $3)', [userId, goal.name, goal.target]);
    }
    res.send('Goals saved successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Comments for goals get route
  1. Gets goals from database
  2. Returns goals if successful
*/
app.get('/goals', isAuthenticated, async (req, res) => {
  console.log('Session data:', req.session); // This will output the session data

  const userId = req.session.userId;
  try {
    const userGoals = await pool.query('SELECT * FROM goals WHERE user_id = $1', [userId]);
    console.log('Fetched goals:', userGoals.rows); // This will output the goals fetched from the database
    res.json(userGoals.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
