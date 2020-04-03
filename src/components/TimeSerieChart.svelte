<script>
import Chart from 'svelte-frappe-charts';
import Stats from './Stats.svelte';
import DatePicker from './DatePicker.svelte';
import { filterByDate } from '../services/dates';
import { COLORS } from '../constants';

export let dates;
export let lastDateStr;

$: datesMap = filterByDate(dates, lastDateStr);
$: data = getData(datesMap);


function getData(datesMap) {
    const values = [...datesMap.values()];
    let totalC = 0;
    let totalD = 0;
    const confirmedList = values.map(v => v.confirmedCases);
    const deathsList = values.map(v => v.deathsNumber);
    return {
        labels: [...datesMap.keys()],
        datasets: [
            // { name: "Confirmed Agg", values: values.map(v => (totalC = v.confirmedCases + totalC)) },
            { name: "Confirmed", values: confirmedList },
            { name: "Deaths", values: deathsList },
            //{ name: "Deaths aggregated", values: deathsList.map(v => (totalD = v + totalD)) },
        ],
        totals: {
            "Confirmed": confirmedList.reduce((a, b) => a + b),
            "Deaths": deathsList.reduce((a, b) => a + b),
        }
    };
}
</script>

<style></style>

<div>
<DatePicker bind:selected={lastDateStr} />

<Chart
    data={data}
    type="line"
    axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: true }}
    lineOptions={{ hideDots: 1, areaFill: 1, heatline: 1, dotSize: 0, hideLine: 0, regionFill: 1 }} 
    colors={[...COLORS, "red", "blue"]}
    />
<Stats data={data.totals} caption={`Totals on ${lastDateStr}`}/>

</div>
