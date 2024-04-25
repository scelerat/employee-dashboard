import { db } from './database'
import { DepartmentUpdate, Department, NewDepartment } from './types'

export async function findDepartmentById(id: number) {
  return await db.selectFrom('department')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findDepartment(criteria: Partial<Department>) {
  let query = db.selectFrom('department')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.name) {
    query = query.where('name', '=', criteria.name)
  }

  return await query.selectAll().execute()
}

export async function updateDepartment(id: number, updateWith: DepartmentUpdate) {
  await db.updateTable('department').set(updateWith).where('id', '=', id).execute()
}

export async function createDepartment(department: NewDepartment) {
  return await db.insertInto('department')
    .values(department)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deleteDepartment(id: number) {
  return await db.deleteFrom('department').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}
