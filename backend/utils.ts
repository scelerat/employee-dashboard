import { EmployeeRequest, NewEmployee, EmployeeUpdate } from './types'

export function employeeRequestParamsToDb(requestParams: EmployeeRequest): NewEmployee | EmployeeUpdate {
  const cleanedDbParams: Partial<NewEmployee | EmployeeUpdate | EmployeeRequest> = { ...requestParams };
  const numberKeys: Array<keyof (NewEmployee | EmployeeUpdate)> = ['department_id', 'salary'];
  const booleanKeys: Array<keyof (NewEmployee | EmployeeUpdate)> = ['active'];

  numberKeys.forEach(key => {
    if (cleanedDbParams[key] !== undefined) {
      cleanedDbParams[key] = parseInt(cleanedDbParams[key] as string, 10) as any;
    }
  });

  booleanKeys.forEach(key => {
    if (cleanedDbParams[key] !== undefined) {
      // @ts-ignore
      cleanedDbParams[key] = cleanedDbParams[key] === 'true';
    }
  });

  return cleanedDbParams as NewEmployee | EmployeeUpdate;
}
