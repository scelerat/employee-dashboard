<script lang="ts">
	import type { PageData } from './$types';
  import { Button } from "$lib/components/ui/button";
  import * as Table from "$lib/components/ui/table";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  import EditUserDialog from "$lib/components/EditUserDialog.svelte";

	export let data: PageData;

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      value
    )
  }
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
          <button on:click={onClickDepartment}>Department</button>
      </Table.Head>
      <Table.Head>Position</Table.Head>
      <Table.Head class="text-right">Salary</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
{#each data.employees as employee}
    <Table.Row>
      <Table.Cell class="font-medium">{employee.name}</Table.Cell>
      <Table.Cell>{employee.department_id}</Table.Cell>
      <Table.Cell>{employee.position}</Table.Cell>
      <Table.Cell class="text-right">{formatCurrency(employee.salary)}</Table.Cell>
      <Table.Cell>{employee.active?'Active':'Inactive'}</Table.Cell>
      <Table.Cell>
        {#if employee}<EditUserDialog employee={employee} />{/if}</Table.Cell>
    </Table.Row>
{/each}
  </Table.Body>
</Table.Root>
