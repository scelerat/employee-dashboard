import express, { Request, Response } from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];

// PostgreSQL connection configuration
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Connect to PostgreSQL
client.connect();

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}))

// Routes
app.get('/employees', async (req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM employee');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/employees', async (req: Request, res: Response) => {
  const { name, department, position, salary, bio, status } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO employees (name, department, position, salary, bio, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, department, position, salary, bio, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM employees WHERE id = $1', [
      id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, department, position, salary, bio, status } = req.body;
  try {
    const result = await client.query(
      'UPDATE employees SET name = $1, department = $2, position = $3, salary = $4, bio = $5, status = $6 WHERE id = $7 RETURNING *',
      [name, department, position, salary, bio, status, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      'DELETE FROM employees WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.json({ message: 'Employee deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
