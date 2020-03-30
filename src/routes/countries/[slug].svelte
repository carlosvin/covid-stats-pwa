<script context="module">
    // import { store } from "../../services/store";
	import { ApiClient } from "../../services/api";

	const api = new ApiClient();

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(api._url.getCountryDates(params.slug));
		const data = await res.json();
		const dates = Object.values(data).map(d => [new Date(d.date).getTime(), d]).sort();
		if (res.status === 200) {
			return { dates, country: params.slug };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let dates;
	export let country;
	let data = {
		labels: dates.map(p => new Date(p[0]).toDateString()),
		datasets: [
		{name: "Confirmed", values: dates.map(d => d[1].confirmedCases)},
		{name: "Deaths", values: dates.map(d => d[1].deathsNumber)}
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
			tooltipOptions={{valuesOverPoints: 1 }}
			axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: true}}
			lineOptions={{
				hideDots: 1, 
				areaFill: 1, 
				heatline: 1, 
				dotSize: 0, 
				hideLine: 0, 
				regionFill: 1 }}/>
	{/await}
</div>
