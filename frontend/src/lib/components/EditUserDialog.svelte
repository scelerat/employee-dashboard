<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

  export let employee = {};
  export let triggerText = 'Edit';
  let dialogOpen = false;
  let titleText = employee.id ?
      "Edit Employee" 
    : "Add New Employee"
  let description = employee.id ?
      "Make changes to the employee here. Click save when you're done."
    : "Enter information for a new employee. Click save when you're done."

  let statusChecked = employee.active?'Active':'Inactive';
	const dispatch = createEventDispatcher();

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
          console.log([value, key])
          key = 'active';
          newValue = (value == 'Active');
          break;
        default:
          newValue = value;
      }
      jsonData[key] = newValue;
    });

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

      employee = await response.json();
      dispatch('updateEmployee', employee)
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

      {#if employee.id}
      <input type="hidden" id="id" name="id" value={employee.id}>
      {/if}

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" name="name" value={employee.name} required={true} placeholder="Full name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="department" class="text-right">Department</Label>
          <Input id="department" name="department_id" value={employee.department_id} required={true} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="position" class="text-right">Position</Label>
          <Input id="position" name="position" value={employee.position} required={true} placeholder="Title or position of the employee" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="salary" class="text-right">Salary</Label>
          <Input id="salary" name="salary" value={employee.salary} required={true} placeholder="Enter whole numbers; no symbols" class="col-span-3" />
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
            checked={employee?.active}
            value="Active"
            aria-labelledby="status-label"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="bio" class="text-right">Bio</Label>
          <Textarea id="bio" name="bio" value={employee.bio} required={true} placeholder="A paragraph or two about the employee" class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
