import { describe, it, before, afterEach, after } from 'node:test'
import { sql } from 'kysely'
import { db } from './database'
import * as EmployeeRepository from './EmployeeRepository'

describe('EmployeeRepository', () => {
  before(async () => {
    // Create DB
    await db.schema.createTable('employee')
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('name', 'varchar(90)', (cb) => cb.notNull())
      .addColumn('department_id', 'integer')
      .addColumn('position', 'varchar(50)', (cb) => cb.notNull())
      .addColumn('bio', 'text', (cb) => cb.notNull())
      .addColumn('active', 'boolean', (cb) => cb.notNull())
      .addColumn('salary', 'integer', (cb) => cb.notNull())
      .addColumn('created_at', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .execute()
  })

  afterEach(async () => {
    await sql`truncate table ${sql.table('employee')}`.execute(db)
  })

  after(async () => {
    await db.schema.dropTable('employee').execute()
  })

  it('should find an employee with a given id', async () => {
    await EmployeeRepository.findEmployeeById(123)
  })

  it('should find all people named Arnold', async () => {
    await EmployeeRepository.findEmployee({ name: 'Arnold' })
  })

  it('should update salary of an employee with a given id', async () => {
    await EmployeeRepository.updateEmployee(123, { salary: 100000 })
  })

  it('should create an employee', async () => {
    await EmployeeRepository.createEmployee({
      name: 'Jennifer',
      department_id: 321,
      position: 'Actor',
      bio: 'A successful actor',
      salary: 50000,
      active: true
    })
  })

  it('should delete an employee with a given id', async () => {
    await EmployeeRepository.deleteEmployee(123)
  })
})
