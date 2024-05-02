<script lang="ts">
	import { onMount} from 'svelte';
	import type { PageData } from './$types';
  import EditUserDialog from "$lib/components/EditUserDialog.svelte";
  import DashboardTableRow from "$lib/components/DashboardTableRow.svelte";
  import DepartmentDropDown from "$lib/components/DepartmentDropDown.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Table from "$lib/components/ui/table";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { formatCurrency } from "$lib/utils";

	export let data: PageData;
  let employees = data.employees;
  let departments = data.departments;
  let departmentIdSelection = -1;
  let activeSelection = -1;

  async function fetchMoreEmployees() {
    const departmentQuery = departmentIdSelection > -1 ? `department_id=${departmentIdSelection}`:'';
    const activeQuery = activeSelection > -1 ? `active=${activeSelection}`: '';
    const queryString = [departmentQuery, activeQuery].filter(query => query.length > 0).join('&')
    const response = await fetch(`http://localhost:3001/employees?${queryString}`)
    employees = await response.json();
  }
  async function fetchDepartments() {
    const response = await fetch('http://localhost:3001/departments');
    departments = await response.json();
  }

  onMount(async () => {
    await fetchDepartments();
  });
  async function handleClickDepartment(e) {
    departmentIdSelection = e.detail.currentTarget.dataset.departmentId;
    await fetchMoreEmployees()
  }
  async function handleClickStatus(e) {
    activeSelection = e.detail.currentTarget.dataset.active;
    await fetchMoreEmployees()
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
<header>
<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Employee Dashboard</h1>
</header>

<Table.Root>
  <Table.Caption>Employees</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Name</Table.Head>
      <Table.Head>
        <DepartmentDropDown 
          departments={data.departments}
          handleClickDepartment={handleClickDepartment}
          >Department</DepartmentDropDown>
      </Table.Head>
      <Table.Head class="hide-on-small">Position</Table.Head>
      <Table.Head class="text-right hide-on-small">Salary</Table.Head>
      <Table.Head class="hide-on-small">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Status</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Item
                data-active={-1}
                on:click={handleClickStatus}
                >All</DropdownMenu.Item>
              <DropdownMenu.Item
                data-active={1}
                on:click={handleClickStatus}
                >Active</DropdownMenu.Item>
              <DropdownMenu.Item
                data-active={0}
                on:click={handleClickStatus}
                >Inactive</DropdownMenu.Item>

            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Table.Head>
      <Table.Head></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
  {#each employees as employee}
    <DashboardTableRow employee={employee} departments={departments} {onDelete} />
  {/each}
    <Table.Row>
      <Table.Cell colspan=6>
        <EditUserDialog departments={departments} on:updateEmployee={handleOnUpdateEmployee}>
          <img src="/add-to-queue-svgrepo-com.svg" height=16 width=16 alt="Add" />
        </EditUserDialog>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
