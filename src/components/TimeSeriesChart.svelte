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

  $: data =  getData(filterByDate(dates, selectedStart, selectedEnd), loc);

  function getData(datesMap, loc) {
    const values = [...datesMap.values()];
    let totalC = 0;
    let totalD = 0;
    const confirmedList = values.map(v => v.confirmedCases);
    const positiveRatioList = values.map(v => v.positiveRate);
    const confirmedTxt = loc.get("Confirmed");
    const positiveRatioTxt = loc.get("PositivityRatio");
    return {
      labels: [...datesMap.keys()].map(d => loc.formatDateStr(d)),
      datasets: [
        { name: confirmedTxt, values: confirmedList },
        { name: positiveRatioTxt, values: positiveRatioList }
      ],
      totals: {
        [confirmedTxt]: confirmedList.reduce((a, b) => a + b),
        [positiveRatioTxt]: positiveRatioList.reduce((a, b) => a + b) / positiveRatioList.length
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
      {data}
      type="line"
      axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: true }}
      lineOptions={{ hideDots: 1, areaFill: 1, heatline: 0, dotSize: 0, hideLine: 0, regionFill: 0}}
      colors={[...COLORS, 'red', 'blue']} />
    <Stats
      data={data.totals}
      caption={`${loc.formatDateStr(selectedStart)} → ${loc.formatDateStr(selectedEnd)}`} />
  {/if}
  {#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>
