
<script>
import { getIsoDate } from "../services/dates";
import Input from "./Input.svelte";

export let today = getIsoDate();
export let selected = getIsoDate();
export let idSuffix = "";
export let min = "2019-12-01";

$: id = `when-${idSuffix}`;
</script>

<Input label="End date" id={id}>
    <input
        type="date"
        {id} name={id}
        bind:value={selected}
        min={min}
        max={today}
        aria-label="Choose the end date for the time serie" />
</Input>
