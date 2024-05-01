import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, url }) => {
  let department_id = url.searchParams.get('department_id')
  const queryParams: {
    department_id?: number
  } = {}
  if (typeof department_id === 'number') {
    queryParams.department_id = department_id
  }

  const employees = await fetch('http://localhost:3001/employees')
  const departments = await fetch('http://localhost:3001/departments')

  return {
    employees: await employees.json(),
    departments: await departments.json(),
  }
}
