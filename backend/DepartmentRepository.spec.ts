import { describe, it, before, afterEach, after } from 'node:test'
import { sql } from 'kysely'
import { db } from './database'
import * as DepartmentRepository from './DepartmentRepository'

describe('DepartmentRepository', () => {
  before(async () => {
    // Create DB
    // Run migrations before running tests
  })

  afterEach(async () => {
    await sql`truncate table ${sql.table('department')}`.execute(db)
  })

  after(async () => {
    await db.schema.dropTable('department').execute()
  })

  it('should find a department with a given id', async () => {
    await DepartmentRepository.findDepartmentById(123)
  })

  it('should find all departments named Sales', async () => {
    await DepartmentRepository.findDepartment({ name: 'Sales' })
  })

  it('should update name of a department with a given id', async () => {
    await DepartmentRepository.updateDepartment(123, { name: 'Finance' })
  })

  it('should create a department', async () => {
    await DepartmentRepository.createDepartment({
      name: 'Accounting',
    })
  })

  it('should delete an employee with a given id', async () => {
    await DepartmentRepository.deleteDepartment(123)
  })
})
