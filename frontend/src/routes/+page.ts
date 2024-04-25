import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  const response = await fetch('http://localhost:3001/employees')

  return {
    employees: await response.json()
  }
}
