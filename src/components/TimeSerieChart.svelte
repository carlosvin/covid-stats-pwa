<script>
  import Chart from "svelte-frappe-charts";
  import Stats from "./Stats.svelte";
  import DatePicker from "./DatePicker.svelte";
  import { filterByDate } from "../services/dates";
  import { localization } from "../services/localization";
  import { COLORS } from "../constants";

  export let dates;
  export let lastDateStr;

  let loc;

  const unsubscribe = localization.subscribe(value => (loc = value));

  $: datesMap = filterByDate(dates, lastDateStr);

  function getData(datesMap, loc) {
    const values = [...datesMap.values()];
    let totalC = 0;
    let totalD = 0;
    const confirmedList = values.map(v => v.confirmedCases);
    const deathsList = values.map(v => v.deathsNumber);
    const confirmedTxt = loc.get("Confirmed");
    const deathsTxt = loc.get("Deaths");
    return {
      labels: [...datesMap.keys()],
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

  <DatePicker
    bind:selected={lastDateStr}
    label={loc.get('End date')}
    title={loc.get('Choose the end date for the time series')} />

  <Chart
    data={getData(datesMap, loc)}
    type="line"
    axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: true }}
    lineOptions={{ hideDots: 1, areaFill: 1, heatline: 1, dotSize: 0, hideLine: 0, regionFill: 1 }}
    colors={[...COLORS, 'red', 'blue']} />
  <Stats
    data={getData(datesMap, loc).totals}
    caption={`${loc.get('Totals on')} ${lastDateStr}`} />

</div>
