<script>
import Error from './Error.svelte';
import Flex from './Flex.svelte';

export let id;
export let label;
export let error = undefined;
</script>

<style>
.field {
	display: grid;
	width: 100%;
}

label {
	grid-row: 2 / 3;
	text-align: left;
	padding-left: 0.2em;
}

.input {
	grid-row: 1 / 1;
	text-align: left;
}
</style>

<div class='field'>
    <div class='input'>
        <slot></slot>
    </div>
	<label for={id}>
		{#if error}
			<Error msg={`${label}: ${error}`}/>
		{:else}
			{label}
		{/if}
	</label>
</div>


	
	
	