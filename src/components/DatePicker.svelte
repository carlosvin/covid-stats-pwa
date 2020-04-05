
<script>
import { getIsoDate } from "../services/dates";
import Input from "./Input.svelte";

export let today = getIsoDate();
export let selected = getIsoDate();
export let idSuffix = "";
export let min = "2019-12-01";
export let label;
export let title;

$: id = `when-${idSuffix}`;
</script>

<Input id={id} {label}>
    <input
        type="date"
        {id} name={id}
        bind:value={selected}
        min={min}
        max={today}
        {title}
        aria-label={title} />
</Input>
