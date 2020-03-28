<script>

export let countries = undefined;

</script>

<style>
</style>

<select>
	{#if countries}
		{#each [...Object.values(countries)] as country}
			<option value={country.countryCode}>{country.countryName}</option>
		{/each}
	{/if}
</select>
