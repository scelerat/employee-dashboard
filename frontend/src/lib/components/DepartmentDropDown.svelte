<script lang='ts'>
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  export let departments = [];
  export let handleClickDepartment ;
  export let checkedIndex = -1;

  function internalHandleClick(e) {
    checkedIndex = parseInt(e.detail.currentTarget.dataset.departmentId)
    handleClickDepartment(e);
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger><slot /></DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.CheckboxItem
        data-department-id={-1}
        checked={checkedIndex === -1}
        on:click={internalHandleClick}>Any</DropdownMenu.CheckboxItem>
      {#each departments as department}
      <DropdownMenu.CheckboxItem
        checked={checkedIndex === department.id}
        data-department-id={department.id}
        on:click={internalHandleClick}>{department.name}</DropdownMenu.CheckboxItem>
    {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
