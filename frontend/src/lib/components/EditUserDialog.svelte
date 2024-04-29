<script lang="ts">
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  export let employee;
</script>
 
<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ size: "sm", variant: "outline" })}
    >Edit</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit Employee</Dialog.Title>
      <Dialog.Description>
        Make changes to the employee here. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input id="name" value={employee.name} class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="department" class="text-right">Department</Label>
        <Input id="department" value={employee.department_id} class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="position" class="text-right">Position</Label>
        <Input id="position" value={employee.position} class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="salary" class="text-right">Salary</Label>
        <Input id="salary" value={employee.salary} class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="status" class="text-right">Status</Label>
        <Input id="status" value={employee.active?'Active':'Inactive'} class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <Button type="submit">Save changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
