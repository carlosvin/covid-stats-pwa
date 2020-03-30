<script context="module">
    import { store } from "../../services/store";
	import { Url } from "../../services/url";

	const url = new Url();

	function getDatesFromResponse(data) {
		const tmpDates = Object.values(data).map(d => [new Date(d.date).getTime(), d]).sort();
		const dates = [];
		for (const d of tmpDates) {
			if (d[1].confirmedCases > 0 || d[1].deathsNumber > 0 || dates.length > 0) {
				dates.push(d);
			}
		}
		return dates;
	}

	export async function preload({ params, query }) {
		const res = await this.fetch(url.getCountryDates(params.slug));
		const data = await res.json();

		
		if (res.status === 200) {
			const dates = getDatesFromResponse(data);
			return { dates, country: store.getCountryName(params.slug) };
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
	<title>New cases in {country}</title>
</svelte:head>

<h1>New cases in {country}</h1>

<div>
	{#await import('svelte-frappe-charts') then c}
		<svelte:component 
			this={c.default} 
			data={data}
			type="line"
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
