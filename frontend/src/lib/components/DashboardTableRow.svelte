<script lang="ts">
  import EditUserDialog from "$lib/components/EditUserDialog.svelte";
  import * as Table from "$lib/components/ui/table";
  import { formatCurrency } from "$lib/utils";

  export let employee;

  function handleEmployeeUpdate(updatedEmployee) {
    employee = updatedEmployee.detail;
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
        employee={employee}
        on:updateEmployee={handleEmployeeUpdate}/>
    {/if}</Table.Cell>
</Table.Row>
