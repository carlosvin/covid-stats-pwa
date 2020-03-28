<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

function selected (e) {
	dispatch('selected', countries[e.target.value]);
}

export let countries = undefined;
export let countryCode = undefined;
</script>

<style>
</style>

{#if countries}
	<select bind:value={countryCode} on:change={selected}>
		{#each [...Object.values(countries)] as c}
			<option value={c.countryCode}>{c.countryName}</option>
		{/each}
	</select>
{/if}
