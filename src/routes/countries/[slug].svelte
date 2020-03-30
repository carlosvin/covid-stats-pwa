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
	export let dates;
	export let country;
</script>

<style>
	
</style>

<svelte:head>
	<title>{country}</title>
</svelte:head>

<h1>{country}</h1>

<div>
	{dates}
</div>
