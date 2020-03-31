<script context="module">
    import { store } from "../../services/store";
	import { Url } from "../../services/url";

	const url = new Url();

	export async function preload({ params, query }) {
		const res = await this.fetch(url.getCountryDates(params.slug));
		const data = await res.json();
		
		if (res.status === 200) {
			return { dates: data, country: store.countries[params.slug] };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import Stats from '../../components/Stats.svelte';
	import TimeSerieChart from '../../components/TimeSerieChart.svelte';
	
	export let dates;
	export let country;
</script>

<style>
	
</style>

<svelte:head>
	<title>New cases in {country.countryName}</title>
</svelte:head>

<h1>New cases in {country.countryName}</h1>

<div>
	<Stats 
		caption='Totals' 
		data={{ Deaths: country.deathsNumber, Confirmed: country.confirmedCases }} />
	
	<TimeSerieChart datesMap={dates} caption={country.countryName}/>
</div>
