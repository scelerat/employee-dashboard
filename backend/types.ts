import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable
} from 'kysely'

// Employee ID, Name, Department, Position, Salary, Bio, and Status (Active/Inactive).

export interface Database {
  employee: EmployeeTable
  department: DepartmentTable
}
/**
 * Employee
 */
export interface EmployeeTable {
  id: Generated<number>

  name: string
  department_id: number
  position: string
  salary: number
  bio: string
  active: boolean
  created_at: ColumnType<Date, string | undefined, never>
}

export type Employee = Selectable<EmployeeTable>
export type NewEmployee = Insertable<EmployeeTable>
export type EmployeeUpdate = Updateable<EmployeeTable>

/**
 * Department
 */
export interface DepartmentTable {
  id: Generated<number>
  name: string
  created_at: ColumnType<Date, string | undefined, never>
}

export type Department = Selectable<DepartmentTable>
export type NewDepartment = Insertable<DepartmentTable>
export type DepartmentUpdate = Updateable<DepartmentTable>
