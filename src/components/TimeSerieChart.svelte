<script>
import Chart from 'svelte-frappe-charts';

export let datesMap;
export let caption = undefined;

const dateEntries = convertToDateEntries(datesMap);
const data = {
    labels: dateEntries.map(p => new Date(p[0]).toDateString()),
    datasets: [
        { name: "Confirmed", values: dateEntries.map(d => d[1].confirmedCases) },
        { name: "Deaths", values: dateEntries.map(d => d[1].deathsNumber) }
    ]
};

function convertToDateEntries(datesMap){
    return filterInitial0Cases(
        convertMapToSortedList(datesMap));
}

function convertMapToSortedList (datesMap) {
    return Object.values(datesMap).map(d => [new Date(d.date).getTime(), d]).sort();
}

function filterInitial0Cases(sortedDates){
    const dates = [];
    for (const d of sortedDates) {
        if (d[1].confirmedCases > 0 || d[1].deathsNumber > 0 || dates.length > 0) {
            dates.push(d);
        }
    }
    return dates;
}

</script>

<style>

</style>

<figure>
    <Chart
        {data}
        type="line"
        axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: true }}
        lineOptions={{ hideDots: 1, areaFill: 1, heatline: 1, dotSize: 0, hideLine: 0, regionFill: 1 }} />
    {#if caption}
        <figcaption>
            {caption}
        </figcaption>
    {/if}
</figure>
