<script>
import { onMount } from 'svelte';
import { store } from '../store';
import CountrySelector from '../components/CountrySelector.svelte';

let country = store.country;
let countries = store.countries;

onMount(async () => {
	countries = await store.fetchCountries();
});
</script>

<style>
</style>

<svelte:head>
	<title>COVID-19 cases</title>
</svelte:head>

<svelte>
	{#if countries}
		<CountrySelector countries={countries}/>
	{/if}
	{#if country}
		<p>{country.countryName}</p>
		<p>{country.confirmedCases}</p>
		<p>{country.deathsNumber}</p>
		<input type="date" id="start" name="trip-start"
		value="2018-07-22"
		min="2018-01-01" max="2018-12-31">
	{:else}
		<p>...fetching</p>		
	{/if}
</svelte>
