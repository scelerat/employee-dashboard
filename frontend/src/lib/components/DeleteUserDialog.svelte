<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

  export let employee = {};
  let dialogOpen = false;

	const dispatch = createEventDispatcher();

  async function handleDelete(e) {
    const id = employee.id;
    const url = `http://localhost:3001/employees/${id}`;

    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      employee = await response.json();
      dispatch('deleteEmployee', employee)
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
    }>Delete</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Delete Employee</Dialog.Title>
      <Dialog.Description>Are you sure you want to delete the employee named "{employee.name}"?</Dialog.Description>
    </Dialog.Header>

    <Dialog.Footer>
      <Button variant="destructive" class="flex-initial" on:click={handleDelete}>Delete</Button>
      <Button variant="outline" class="flex-initial" on:click={() => (dialogOpen = false)}>Cancel</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
