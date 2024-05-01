<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

  export let employee;
  let dialogOpen = false;

	const dispatch = createEventDispatcher();

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const jsonData = {}
    const id = formData.get('id')

    formData.forEach((value, key) => {
      switch (key) {
        case 'id': return;
        case 'status':
          key = 'active';
          value = value === 'Active' ? true : false;
          break;
      }
      jsonData[key] = value;
    });
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      employee = await response.json();
      console.log(employee)
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
    }>Edit</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit Employee</Dialog.Title>
      <Dialog.Description>
        Make changes to the employee here. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <form on:submit={handleSubmit}>
      <input type="hidden" id="id" name="id" value={employee.id}>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" name="name" value={employee.name} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="department" class="text-right">Department</Label>
          <Input id="department" name="department_id" value={employee.department_id} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="position" class="text-right">Position</Label>
          <Input id="position" name="position" value={employee.position} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="salary" class="text-right">Salary</Label>
          <Input id="salary" name="salary" value={employee.salary} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="status" class="text-right">Status</Label>
          <Input id="status" name="status" value={employee.active?'Active':'Inactive'} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="bio" class="text-right">Bio</Label>
          <Textarea id="bio" name="bio" value={employee.bio} class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
