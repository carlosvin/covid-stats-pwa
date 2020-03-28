<script>
import { onMount } from 'svelte';
import { store } from '../store';
import CountrySelector from '../components/CountrySelector.svelte';

let country = store.country;
let countries = store.countries;

onMount(async () => {
	countries = await store.fetchCountries();
});

function handleCountryChange(c) {
	country = c.detail;
	store.setCountry(country);
}
</script>

<style>
</style>

<svelte:head>
	<title>COVID-19 cases</title>
</svelte:head>

<svelte>
	{#if countries}
		<CountrySelector country={country} countries={countries} on:selected={handleCountryChange}/>
	{/if}
	{#if country}
		<p><a href="{country.path}">{country.countryName} ({country.countryCode})</a></p>
		<p>{country.confirmedCases}</p>
		<p>{country.deathsNumber}</p>
		<input type="date" id="start" name="trip-start"
			value="2018-07-22"
			min="2018-01-01" max="2018-12-31">
	{:else}
		<p>...fetching</p>
	{/if}
</svelte>
