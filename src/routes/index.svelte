<script>
    import { onMount } from "svelte";
    import { store } from "../services/store";
    import { getIsoDate } from "../services/dates";
    import CountrySelector from "../components/CountrySelector.svelte";
    import Stats from "../components/Stats.svelte";
    import Spinner from "../components/Spinner.svelte";
    import Error from "../components/Error.svelte";

    let countries = store.countries;
    let country = store.country;
    let today = getIsoDate();
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

    function handleDateChange(d) {
        selectedDateStr = d.target.value;
        fetchSelectedCountryDate();
    }

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
      on:change={handleDateChange} />
  {/if}

  {#if dateStats}
    <Stats
      data={{ Deaths: dateStats.deathsNumber, Confirmed: dateStats.confirmedCases }} />
  {/if}

  {#if isFetching}
    <p><Spinner>Fetching...</Spinner></p>
  {/if}
  <Error msg={error}/>
</svelte>
