
<script>
import { getIsoDate } from "../services/dates";

export let today = getIsoDate();
export let selected = getIsoDate();
export let idSuffix = "";
export let min = "2019-12-01";

$: id = `when-${idSuffix}`;

</script>

<style>
</style>

<input
    type="date"
    {id}
    name={id}
    bind:value={selected}
    min={min}
    max={today}
    aria-label="Choose the end date for the time serie" />
<label for={id}>End time series date</label>