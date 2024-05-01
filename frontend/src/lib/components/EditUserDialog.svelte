<script lang="ts">
	import { createEventDispatcher, onMount} from 'svelte';
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button";
  
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import DepartmentDropDown from "$lib/components/DepartmentDropDown.svelte";

  export let id = null;
  export let bio = null;
  export let department_id = null;
  export let name = null;
  export let position = null;
  export let salary = null;
  export let active = null;
  export let triggerText = 'Edit';
  export let created_at = null;
  export let departments = [];
  let selectedDepartmentName = (department_id && departments.length) ?
    departments.find(d => d.id === department_id).name
    : 'Choose Department'; 
  let dialogOpen = false;
  let titleText = id ?
      "Edit Employee" 
    : "Add New Employee"
  let description = id ?
      "Make changes to the employee here. Click save when you're done."
    : "Enter information for a new employee. Click save when you're done."

	const dispatch = createEventDispatcher();

  function handleClickDepartment(e) {
    department_id = parseInt(e.detail.currentTarget.dataset.departmentId, 10);
    if (department_id < 0) return;
    selectedDepartmentName = departments.find(dept => dept.id === department_id).name;
  }
  async function handleSubmit(e) {
    const formData = new FormData(e.target);
    const jsonData = {};
    const id = formData.get('id');
    let  url = `http://localhost:3001/employees`;
    let  method = 'POST';
    if (id) {
      url = `http://localhost:3001/employees/${id}`;
      method = 'PUT';
    }

    e.preventDefault()

    formData.forEach((value, key) => {
      let newValue;
      switch (key) {
        case 'id': return;
        case 'department_id':
        case 'salary':
          newValue = parseInt(value, 10);
          break;
        case 'status':
          key = 'active';
          newValue = (value == 'Active');
          break;
        default:
          newValue = value;
      }
      jsonData[key] = newValue;
    });
    if (!'active' in jsonData) jsonData['active'] = false;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const jsonEmployee = await response.json();
      dispatch('updateEmployee', jsonEmployee)
      dialogOpen = false;
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
</script>
 
<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger 
    on:click={() => (dialogOpen = true)}
    class={buttonVariants({ 
      size: "sm",
      variant: "outline" })
    }>{triggerText}</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>{titleText}</Dialog.Title>
      <Dialog.Description> {description} </Dialog.Description>
    </Dialog.Header>
    <form on:submit={handleSubmit}>

      {#if id}
      <input type="hidden" id="id" name="id" value={id}>
      {/if}

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" name="name" value={name} required={true} placeholder="Full name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="department" class="text-right">Department</Label>
          <input type="hidden" id="department" name="department_id" value={department_id} required={true} class="col-span-3" />
          <div class="col-span-3">
          <DepartmentDropDown 
            checkedIndex={department_id}
            bind:departments={departments}
            handleClickDepartment={handleClickDepartment}
            >
      <div class="relative grid border-black border select-none items-center whitespace-nowrap rounded-lg py-1.5 px-3 font-sans text-xs font-bold uppercase ">
      <span class="">{selectedDepartmentName}</span>
    </div></DepartmentDropDown> 
        </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="position" class="text-right">Position</Label>
          <Input id="position" name="position" value={position} required={true} placeholder="Title or position of the employee" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="salary" class="text-right">Salary</Label>
          <Input id="salary" name="salary" value={salary} required={true} placeholder="Enter whole numbers; no symbols" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label
            id="status-label"
            for="status"
            class="text-sm text-right font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >Active</Label>
          <input 
            class={"peer box-content h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50"}
            type="checkbox"
            id="status"
            name="status"
            checked={active}
            value="Active"
            aria-labelledby="status-label"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="bio" class="text-right">Bio</Label>
          <Textarea id="bio" name="bio" value={bio} required={true} placeholder="A paragraph or two about the employee" class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
