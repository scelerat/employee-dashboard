import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  const queryParams = {};
  if (typeof department_id === 'number') {
    queryParams.department_id = department_id
  }

  const response = await fetch('http://localhost:3001/employees')

  return {
    employees: await response.json()
  }
}
