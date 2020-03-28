<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

function selected (e) {
	dispatch('selected', countries[e.target.value]);
}

export let countries = undefined;
export let country = {countryCode: undefined};

</script>

<style>
</style>

{#if countries}
	<select bind:value={country.countryCode} on:change={selected}>
		{#each [...Object.values(countries)] as country}
			<option value={country.countryCode}>{country.countryName}</option>
		{/each}
	</select>
{/if}
