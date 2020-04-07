<script>
  import Chart from "svelte-frappe-charts";
  import Stats from "./Stats.svelte";
  import DateRange from "./DateRange.svelte";
  import { filterByDate, getIsoDate } from "../services/dates";
  import { COLORS } from "../constants";
  import { localization } from "../services/localization";

  export let caption;
  export let dates;
  export let disabled = false;
  let selectedStart;
  let selectedEnd;
  let loc;

  const unsubscribe = localization.subscribe(value => (loc = value));

  $: datesMap = filterByDate(dates, selectedStart, selectedEnd);

  function getData(datesMap, loc) {
    const values = [...datesMap.values()];
    let totalC = 0;
    let totalD = 0;
    const confirmedList = values.map(v => v.confirmedCases);
    const deathsList = values.map(v => v.deathsNumber);
    const confirmedTxt = loc.get("Confirmed");
    const deathsTxt = loc.get("Deaths");
    return {
      labels: [...datesMap.keys()].map(d => loc.formatDateStr(d)),
      datasets: [
        { name: confirmedTxt, values: confirmedList },
        { name: deathsTxt, values: deathsList }
      ],
      totals: {
        [confirmedTxt]: confirmedList.reduce((a, b) => a + b),
        [deathsTxt]: deathsList.reduce((a, b) => a + b)
      }
    };
  }
</script>

<style>
figure {
  margin: 0 0;
  padding: 0 0;
}

figcaption {
  color: #504f4f;
  font-size: small;
}

</style>

<figure>

  <DateRange
    {disabled}
    bind:selectedStart={selectedStart}
    bind:selectedEnd={selectedEnd}
    labelStart={loc.get('Start date')}
    labelEnd={loc.get('End date')}
    titleStart={loc.get('Choose the start date for the time series')}
    titleEnd={loc.get('Choose the end date for the time series')} />
  {#if selectedStart && selectedEnd}
    <Chart
      data={getData(datesMap, loc)}
      type="line"
      axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: true }}
      lineOptions={{ hideDots: 1, areaFill: 1, heatline: 0, dotSize: 0, hideLine: 0, regionFill: 0}}
      colors={[...COLORS, 'red', 'blue']} />
    <Stats
      data={getData(datesMap, loc).totals}
      caption={`${loc.formatDateStr(selectedStart)} → ${loc.formatDateStr(selectedEnd)}`} />
  {/if}
  {#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>