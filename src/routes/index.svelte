<script>
import { onMount } from "svelte";
import { store } from "../services/store";
import { getIsoDate } from "../services/dates";
import CountrySelector from "../components/CountrySelector.svelte";
import Stats from "../components/Stats.svelte";
import Spinner from "../components/Spinner.svelte";

let countries = store.countries;
let country = store.country;
let today = getIsoDate();
let dateStats = undefined;
let selectedDateStr = getIsoDate();
let isFetching = false;

onMount(async () => {
  try {
    isFetching = true;
  	countries = await store.fetchCountries();
  }catch (e) {
    console.log(e);
  }
  isFetching = false;
	if (countries && !country) {
		country = Object.values(countries)[0];
	}
});

async function handleDateChange(d) {
  selectedDateStr = d.target.value;
  isFetching = true;
  try {
    dateStats = await store.fetchCountryDate(country.countryCode, selectedDateStr);
  } catch (e) {
    dateStats = undefined;
    console.log(e);
  }
  isFetching = false;
}

function handleCountryChange(c) {
	country = c.detail;
  store.setCountry(country);
  selectedDateStr = getIsoDate();
  dateStats = undefined;
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
      max={today}
      on:change={handleDateChange}/>
  {/if}

  {#if dateStats}
     <Stats
      data={{ Deaths: dateStats.deathsNumber, Confirmed: dateStats.confirmedCases }} />
  {/if}

  {#if isFetching}
      <Spinner>Fetching...</Spinner>
  {/if}
</svelte>
