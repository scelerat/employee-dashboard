<script lang="ts">
	import type { PageData } from './$types';
  import EditUserDialog from "$lib/components/EditUserDialog.svelte";
  import DashboardTableRow from "$lib/components/DashboardTableRow.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Table from "$lib/components/ui/table";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { formatCurrency } from "$lib/utils";

	export let data: PageData;
  let employees = data.employees;
  async function fetchMoreEmployees( departmentId ) {
    const departmentQuery = departmentId > -1 ? `?department_id=${departmentId}`:'';
    const response = await fetch(`http://localhost:3001/employees${departmentQuery}`)
    employees = await response.json();
  }
  async function handleClickDepartment(e) {
    await fetchMoreEmployees(e.detail.currentTarget.dataset.departmentId)
  }
  function onDelete(employeeId) {
    const idx = data.employees.findIndex(empl => empl.id === employeeId)
    if (idx < 0) return;
    employees = [...employees.slice(0, idx), ...employees.slice(idx+1)]
  }
  function handleOnUpdateEmployee({ detail: newEmployee }) {
    employees = [...employees, newEmployee]
  }
</script>

<h1>Employee Dashboard</h1>

<Table.Root>
  <Table.Caption>Employees</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Name</Table.Head>
      <Table.Head>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Department</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Item
                data-department-id={-1}
                on:click={handleClickDepartment}>Any</DropdownMenu.Item>
              {#each data.departments as department}
              <DropdownMenu.Item
                data-department-id={department.id}
                on:click={handleClickDepartment}>{department.name}</DropdownMenu.Item>
            {/each}
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Table.Head>
      <Table.Head>Position</Table.Head>
      <Table.Head class="text-right">Salary</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
  {#each employees as employee}
    <DashboardTableRow employee={employee} {onDelete} />
  {/each}
    <Table.Row>
      <Table.Cell colspan=6>
        <EditUserDialog triggerText='Add' on:updateEmployee={handleOnUpdateEmployee} />
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
