<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import EditUserDialog from "$lib/components/EditUserDialog.svelte";
  import DeleteUserDialog from "$lib/components/DeleteUserDialog.svelte";
  import * as Table from "$lib/components/ui/table";
  import { formatCurrency } from "$lib/utils";

  export let employee;
  export let onDelete;
  function handleEmployeeUpdate(updatedEmployee) {
    employee = updatedEmployee.detail;
  }
  function handleDeleteEmployee(event) {
    if (onDelete) {
      onDelete(employee.id)
    }
  }
</script>

<Table.Row>
  <Table.Cell class="font-medium">{employee.name}</Table.Cell>
  <Table.Cell>{employee.department_id}</Table.Cell>
  <Table.Cell>{employee.position}</Table.Cell>
  <Table.Cell class="text-right">{formatCurrency(employee.salary)}</Table.Cell>
  <Table.Cell>{employee.active?'Active':'Inactive'}</Table.Cell>
  <Table.Cell>
    {#if employee}
      <EditUserDialog 
        {...employee}
        on:updateEmployee={handleEmployeeUpdate}/>
      <DeleteUserDialog employee={employee} on:deleteEmployee={handleDeleteEmployee} />

    {/if}
  </Table.Cell>
</Table.Row>
