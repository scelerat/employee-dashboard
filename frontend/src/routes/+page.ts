import type { PageLoad } from './$types'
import { PUBLIC_API_PORT } from '$env/static/public';

export const load: PageLoad = async ({ fetch, url }) => {
  let department_id = url.searchParams.get('department_id')
  const queryParams: {
    department_id?: number
  } = {}
  if (typeof department_id === 'number') {
    queryParams.department_id = department_id
  }

  const employees = await fetch(`http://localhost:${PUBLIC_API_PORT}/employees`)
  const departments = await fetch(`http://localhost:${PUBLIC_API_PORT}/departments`)

  return {
    departments: await departments.json(),
    employees: await employees.json(),
  }
}
