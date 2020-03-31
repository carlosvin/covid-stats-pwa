<script>
import { onMount } from "svelte";
import { store } from "../services/store";
import { getIsoDate } from "../services/dates";
import CountrySelector from "../components/CountrySelector.svelte";
import Stats from "../components/Stats.svelte";
import Spinner from "../components/Spinner.svelte";
import Error from "../components/Error.svelte";
import TimeSerieChart from "../components/TimeSerieChart.svelte";
import DatePicker from "../components/DatePicker.svelte";

let countries = store.countries;
let country = store.country;
let dates = store.dates;

let isFetching = false;
let error = undefined;

onMount(async () => {
    try {
        isFetching = true;
        error = undefined;
        countries = await store.fetchCountries();
    } catch (e) {
        console.warn(e);
    }
    isFetching = false;
    if (countries && !country) {
        country = Object.values(countries)[0];
    }
    fetchDates();
});

async function fetchDates(){
    isFetching = true;
    error = undefined;
    try {
        dates = await store.fetchDates(country.countryCode);
    } catch (e) {
        if (e.status === 404) {
            error = `There is no information for ${country.countryName}`;
        }
        dates = undefined;
        console.warn(e);
    }
    isFetching = false;
}

function handleCountryChange(c) {
    country = c.detail;
    store.setCountry(country);
    dates = undefined;//store.dates;
    fetchDates();
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
        <Stats
            caption='Totals'
            data={{ Deaths: country.deathsNumber, Confirmed: country.confirmedCases }} />
    {/if}

    {#if dates}
        <TimeSerieChart
            caption={country.countryName}
            datesMap={dates} />
    {/if}

    <Error msg={error}/>

    {#if isFetching}
        <p><Spinner>Fetching...</Spinner></p>
    {/if}
</svelte>
