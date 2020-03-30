<script context="module">
    // import { store } from "../../services/store";
	import { ApiClient } from "../../services/api";

	const api = new ApiClient();

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(api._url.getCountryDates(params.slug));
		const data = await res.json();

		if (res.status === 200) {
			return { dates: data, country: params.slug };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import Stats from '../../components/Stats.svelte';
	export let dates;
	export let country;
	let data = {
		labels: Object.keys(dates),
		datasets: [
		{
			values: Object.values(dates).map(d => d.confirmedCases)
		}
		]
  };

</script>

<style>
	
</style>

<svelte:head>
	<title>{country}</title>
</svelte:head>

<h1>{country}</h1>

<div>
	{#await import('svelte-frappe-charts') then c}
		<svelte:component 
			this={c.default} 
			data={data} 
			type="line"
			axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1}} 
			lineOptions={{
				hideDots: 1, 
				areaFill: 1, 
				heatline: 1, 
				dotSize: 0, 
				hideLine: 0, 
				regionFill: 1 }}/>
	{/await}
	{#each Object.values(dates) as date}
		<Stats data={date}></Stats>
	{/each}
</div>
