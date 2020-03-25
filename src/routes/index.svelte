<script>
import { onMount } from 'svelte';
import CountrySelector from '../components/CountrySelector.svelte';

let country = undefined;

onMount(async () => {
	// country = await (await fetch(getCountryTodayStatsUrl('ES'), { mode: "cors"})).json();
});
</script>

<style>
</style>

<svelte:head>
	<title>COVID-19 cases</title>
</svelte:head>

<svelte>
	<CountrySelector/>
	
	{#if country}
		<p>{country.countryName}</p>
		<p>{country.confirmedCases}</p>
		<p>{country.deathsNumber}</p>
	{:else}
		<p>...fetching</p>		
	{/if}
</svelte>
