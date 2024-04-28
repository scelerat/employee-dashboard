import { db } from './database'
import { EmployeeUpdate, Employee, NewEmployee } from './types'

export async function findEmployeeById(id: number) {
  return await db.selectFrom('employee')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findEmployee(criteria: Partial<Employee>) {
  let query = db.selectFrom('employee')

  if (criteria.department_id) {
    query = query.where('department_id', '=', criteria.department_id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.active) {
    query = query.where('active', '=', criteria.active)
  }

  return await query.selectAll().execute()
}

export async function updateEmployee(id: number, updateWith: EmployeeUpdate) {
  await db.updateTable('employee').set(updateWith).where('id', '=', id).execute()
}

export async function createEmployee(employee: NewEmployee) {
  return await db.insertInto('employee')
    .values(employee)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deleteEmployee(id: number) {
  return await db.deleteFrom('employee').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}
