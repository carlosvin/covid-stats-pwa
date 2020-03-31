<script>
import Chart from 'svelte-frappe-charts';

export let datesMap;
export let caption = undefined;

filterInitial0Cases(datesMap);

const values = Object.values(datesMap);
const data = {
    labels: Object.keys(datesMap),
    datasets: [
        { name: "Confirmed", values: values.map(v => v.confirmedCases) },
        { name: "Deaths", values: values.map(v => v.deathsNumber) }
    ]
};

function filterInitial0Cases(datesMap){
    for (const k in datesMap) {
        const date = datesMap[k];
        if (date.confirmedCases === 0 && date.deathsNumber === 0) {
            delete datesMap[k];
        } else {
            return datesMap;
        }
    }
}
</script>

<style></style>

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
