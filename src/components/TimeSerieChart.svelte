<script>
  import Chart from "svelte-frappe-charts";
  import Stats from "./Stats.svelte";
  import DateRange from "./DateRange.svelte";
  import { filterByDate, getIsoDate } from "../services/dates";
  import { localization } from "../services/localization";
  import { COLORS } from "../constants";

  export let dates;
  let lastDateStr = getIsoDate();
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

</style>

<div>

  <DateRange
    bind:selectedStart={selectedStart}
    bind:selectedEnd={selectedEnd}
    labelStart={loc.get('Start date')}
    labelEnd={loc.get('End date')}
    titleStart={loc.get('Choose the start date for the time series')}
    titleEnd={loc.get('Choose the end date for the time series')} />

  <Chart
    data={getData(datesMap, loc)}
    type="line"
    axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: true }}
    lineOptions={{ hideDots: 1, areaFill: 1, heatline: 1, dotSize: 0, hideLine: 0, regionFill: 1 }}
    colors={[...COLORS, 'red', 'blue']} />
  <Stats
    data={getData(datesMap, loc).totals}
    caption={`${loc.get('Totals on')} ${loc.formatDate(new Date(lastDateStr))}`} />

</div>
