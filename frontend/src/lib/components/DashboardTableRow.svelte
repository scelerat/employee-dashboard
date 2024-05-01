<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import EditUserDialog from "$lib/components/EditUserDialog.svelte";
  import DeleteUserDialog from "$lib/components/DeleteUserDialog.svelte";
  import * as Table from "$lib/components/ui/table";
  import { formatCurrency } from "$lib/utils";

  export let employee;
  export let onDelete;
  export let departments;
  function handleEmployeeUpdate(updatedEmployee) {
    employee = updatedEmployee.detail;
  }
  function handleDeleteEmployee(event) {
    if (onDelete) {
      onDelete(employee.id)
    }
  }
  function departmentName(departmentId) {
    const department = departments.find(d => d.id === departmentId)
    let departmentName = 'unknown';
    if (department) {
      departmentName = department.name;
    }
    return departmentName;
  }
</script>

<Table.Row>
  <Table.Cell class="font-medium">{employee.name}</Table.Cell>
  <Table.Cell>{departmentName(employee.department_id)}</Table.Cell>
  <Table.Cell>{employee.position}</Table.Cell>
  <Table.Cell class="text-right">{formatCurrency(employee.salary)}</Table.Cell>
  <Table.Cell>{employee.active?'Active':'Inactive'}</Table.Cell>
  <Table.Cell>
    {#if employee}
      <EditUserDialog 
        {...employee}
        departments={departments}
        on:updateEmployee={handleEmployeeUpdate}/>
      <DeleteUserDialog employee={employee} on:deleteEmployee={handleDeleteEmployee} />

    {/if}
  </Table.Cell>
</Table.Row>
