<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<h1>Employee Dashboard</h1>
{#each data.employees as employee}
<div>{employee.name}</div>
{/each}
