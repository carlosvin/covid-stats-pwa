<script>
import { onMount } from "svelte";
import { store } from "../store";
import { getIsoDate } from "../services/dates";
import CountrySelector from "../components/CountrySelector.svelte";
import Stats from "../components/Stats.svelte";
import Spinner from "../components/Spinner.svelte";

let countries = store.countries;
let country = store.country;
const today = getIsoDate();

onMount(async () => {
	countries = await store.fetchCountries();
	if (countries && !country) {
		country = Object.values(countries)[0];
	}
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
    <CountrySelector
      countryCode={country && country.countryCode}
      {countries}
      on:selected={handleCountryChange} />
  {/if}
  {#if country}
    <p>
      <a href={country.path}>{country.countryName} ({country.countryCode})</a>
    </p>
    <Stats
      data={{ Deaths: country.deathsNumber, Confirmed: country.confirmedCases }} />
    <input
      type="date"
      id="when"
      name="when"
      value={today}
      min="2019-12-01"
      max={today} />
  {:else}
    <Spinner>Fetching...</Spinner>
  {/if}
</svelte>
