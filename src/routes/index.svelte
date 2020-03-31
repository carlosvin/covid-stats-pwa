<script>
import { onMount } from "svelte";
import { store } from "../services/store";
import { getIsoDate } from "../services/dates";
import CountrySelector from "../components/CountrySelector.svelte";
import Stats from "../components/Stats.svelte";
import Spinner from "../components/Spinner.svelte";
import Error from "../components/Error.svelte";
import IconLink from "../components/IconLink.svelte";
import DatePicker from "../components/DatePicker.svelte";

let countries = store.countries;
let country = store.country;
let dateStats = undefined;
let selectedDateStr = getIsoDate();
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
    fetchSelectedCountryDate();
});

async function fetchSelectedCountryDate(){
    isFetching = true;
    error = undefined;
    try {
        dateStats = await store.fetchCountryDate(
            country.countryCode,
            selectedDateStr
        );
    } catch (e) {
        if (e.status === 404) {
            error = `There is no information for ${country.countryName} on ${selectedDateStr}`;
        }
        dateStats = undefined;
        console.log(e);
    }
    isFetching = false;
}

function handleCountryChange(c) {
    country = c.detail;
    store.setCountry(country);
    dateStats = undefined;
    fetchSelectedCountryDate();
}

function handleDateChange(ev) {
    selectedDateStr = ev.detail;
    fetchSelectedCountryDate();
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
        <IconLink 
            href={country.path}
            rel='prefetch'
            src='/bar_chart-24px.svg'
            title='Chart for {country.countryName}'/>
        <Stats
            caption='Totals'
            data={{ Deaths: country.deathsNumber, Confirmed: country.confirmedCases }} />
        <DatePicker on:dateChanged={handleDateChange} />
    {/if}

    {#if dateStats}
        <Stats
            caption={dateStats.date}
            data={{ Deaths: dateStats.deathsNumber, Confirmed: dateStats.confirmedCases }} />
    {/if}

    <Error msg={error}/>

    {#if isFetching}
        <p><Spinner>Fetching...</Spinner></p>
    {/if}
</svelte>
