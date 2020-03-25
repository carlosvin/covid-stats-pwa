<script>
import { store } from '../store';
import { onMount } from 'svelte';

let countries = undefined;

onMount(async () => {
	countries = await store.getCountries();
});
</script>

<style>
</style>

<select>
	{#if countries}
		{@debug countries}
		{#each countries as country}
			<option value={country.countryCode}>{country.countryName}</option>
		{/each}
	{/if}
</select>
