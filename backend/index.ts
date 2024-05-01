import express, { Request, Response } from 'express';
import {
  findEmployee,
  updateEmployee,
  createEmployee,
  deleteEmployee
} from './EmployeeRepository';
import {
  findDepartment
} from './DepartmentRepository';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];

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

    const query: {
      active?: boolean
      department_id?: number
    } = {}
    console.log(req.query)
    if (typeof req.query.active === 'string') {
      query.active = !!parseInt(req.query.active, 10)
    }
    if (typeof req.query.department_id === 'string') {
      query.department_id = parseInt(req.query.department_id, 10);
    }
    const result = await findEmployee(query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/employees', async (req: Request, res: Response) => {
  const updatedEmployee = req.body;
  try {
    // @ts-ignore
    const result = await createEmployee(updatedEmployee)
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/employees/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { name, department_id, position, salary, bio, active } = req.body;
  try {
    console.log(req.body)
    const updatedEmployee = await updateEmployee(id, req.body)
    if (!updatedEmployee) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      // Succeeded; no content
      res.json(updatedEmployee);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await deleteEmployee(parseInt(id, 10));
    if (!deletedEmployee) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.json({ message: 'Employee deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/departments', async (req: Request, res: Response) => {
  try {
    const result = await findDepartment({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
