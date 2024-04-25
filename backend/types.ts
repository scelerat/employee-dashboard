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
}

export interface EmployeeTable {
  id: Generated<number>

  name: string
  department: string
  position: string
  salary: number
  bio: string
  active: boolean
}

export type Employee = Selectable<EmployeeTable>
export type NewEmployee = Insertable<EmployeeTable>
export type EmployeeUpdate = Updateable<EmployeeTable>

