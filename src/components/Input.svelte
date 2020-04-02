<script>
import Error from './Error.svelte';

export let id;
export let label;
export let error = undefined;
</script>

<style>
div {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    justify-items: left;
}
</style>

<div>
    <slot></slot>
    <label for={id}>
		{#if error}
			<Error msg={`${label}: ${error}`}/>
		{:else}
			{label}
		{/if}
	</label>
</div>


	
	
	