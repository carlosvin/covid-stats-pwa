<script>
  import { onMount } from "svelte";
  import { store } from "../services/store";
  import { getIsoDate } from "../services/dates";
  import CountrySelector from "../components/CountrySelector.svelte";
  import Stats from "../components/Stats.svelte";
  import Error from "../components/Error.svelte";
  import TimeSeriesChart from "../components/TimeSeriesChart.svelte";
  import DatePicker from "../components/DatePicker.svelte";
  import { localization } from "../services/localization";
  import { fetching } from "../services/status";

  let countries = store.countries;
  let country = store.country;
  let dates = store.dates;

  let isFetching = false;
  let error = undefined;
  let loc;
  const unsubscribe = localization.subscribe(value => {
    loc = value;
  });

  function setFetching (fetchingStatus) {
    fetching.set(isFetching = fetchingStatus);
  }

  onMount(async () => {
    try {
      setFetching(true);
      error = undefined;
      countries = await store.fetchCountries();
    } catch (e) {
      console.warn(e);
    }
    setFetching(false);
    country = store.country;
    if (country) {
      fetchDates(country.countryCode);
    } else {
      error = loc.get('Error fetching countries stats');
    }
  });

  async function fetchDates(countryCode) {
    setFetching(true);
    error = undefined;
    dates = store.getDates(countryCode);
    try {
      dates = await store.fetchDates(countryCode);
    } catch (e) {
      if (e.status === 404) {
        error = loc.placeholders("There is no information for {countryCode}", {
          countryCode
        });
      }
      console.warn(e);
    }
    setFetching(false);
  }

  function handleCountryChange({ detail }) {
    country = detail;
    store.setCountry(country);
    dates = undefined;
    fetchDates(country.countryCode);
  }
</script>

<style>
  .grid-container-row {
    display: grid;
    grid-template-columns: 40% auto;
    justify-self: stretch;
    grid-gap: 2%;
  }

  .grid-container-col {
    display: grid;
    grid-gap: 1rem;
  }

  @media screen and (max-width: 520px) {
    .grid-container-row {
      display: block;
    }

    .countries {
      margin-bottom: 1em;
    }
  }
</style>

<svelte:head>
  <title>COVID-19 cases</title>
</svelte:head>

<div class="grid-container-col">
  <div class="grid-container-row">
    {#if countries}
      <div class="countries">
        <CountrySelector
          {country}
          {countries}
          on:selected={handleCountryChange}
          disabled={isFetching} />
      </div>
    {/if}

    {#if country}
      <Stats
        caption={loc.get('Totals')}
        data={{ [loc.get('Confirmed')]: country.confirmedCases, [loc.get('Deaths')]: country.deathsNumber }} />
    {/if}
  </div>

  {#if dates}
    <TimeSeriesChart
      {dates}
      caption={loc.get('Last update') + ' ' + store
          .getLastUpdate(country.countryCode)
          .toLocaleString()}
      disabled={isFetching} />
  {/if}

  <Error msg={error} />
</div>
