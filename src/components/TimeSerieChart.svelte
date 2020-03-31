<script>
import Chart from 'svelte-frappe-charts';

export let datesMap;
export let lastDateStr;

$: data = getData(lastDateStr, datesMap);

function filterInitialDates(datesMap, epochSeconds = undefined) {
    const map = new Map();

    for (const k in datesMap) {
        const date = datesMap[k];
        if (epochSeconds && date.epochSeconds > epochSeconds) {
            continue;
        }
        if (date.confirmedCases === 0 && date.deathsNumber === 0 && map.size === 0) {
            continue;
        }
        map.set(k, date);
    }
    return map;
}

function getData(lastDateStr, datesMap) {

    const epochSeconds = lastDateStr ? new Date(lastDateStr).getTime() / 1000 : undefined;

    const filtered = filterInitialDates(datesMap, epochSeconds);
    const values = [...filtered.values()];
    return {
        labels: [...filtered.keys()],
        datasets: [
            { name: "Confirmed", values: values.map(v => v.confirmedCases) },
            { name: "Deaths", values: values.map(v => v.deathsNumber) }
        ]
    };
}
</script>

<style></style>

<figure>
    <Chart
        data={data}
        type="line"
        axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: true }}
        lineOptions={{ hideDots: 1, areaFill: 1, heatline: 1, dotSize: 0, hideLine: 0, regionFill: 1 }} />
        <figcaption>
            <slot></slot>
        </figcaption>
</figure>
