<script lang="ts">
	import type { PageData } from './$types';
  import EditUserDialog from "$lib/components/EditUserDialog.svelte";
  import DashboardTableRow from "$lib/components/DashboardTableRow.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Table from "$lib/components/ui/table";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { formatCurrency } from "$lib/utils";

	export let data: PageData;

  async function fetchMore() {

    const response = await fetch('http://localhost:3001/employees?department_id=1')
    return {
      employees: await response.json()
    }
  }
  async function onClickDepartment() {
    console.log('onClickDepartment')
    data = await fetchMore()
  }
  function onDelete(employeeId) {
    const idx = data.employees.findIndex(empl => empl.id === employeeId)
    if (idx < 0) return;
    data = {
      employees: [...data.employees.slice(0, idx), ...data.employees.slice(idx+1)]
    } 
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
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
              <DropdownMenu.Item>Billing</DropdownMenu.Item>
              <DropdownMenu.Item>Team</DropdownMenu.Item>
              <DropdownMenu.Item>Subscription</DropdownMenu.Item>
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
  {#each data.employees as employee}
    <DashboardTableRow employee={employee} {onDelete} />
  {/each}
    <Table.Row>
      <Table.Cell colspan=6>
        <EditUserDialog triggerText='Add' />
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
