
<script>
import { getIsoDate } from "../services/dates";
import Input from "./Input.svelte";

export let selected = getIsoDate();
export let idSuffix = "";
export let min = "2019-12-01";
export let max = getIsoDate();
export let label;
export let title;
export let error = undefined;
export let disabled = false;

$: id = `when-${idSuffix}`;
</script>

<Input id={id} {label} {error}>
    <input
        {disabled}
        type="date"
        {id} name={id}
        bind:value={selected}
        {min}
        {max}
        {title}
        aria-label={title} />
</Input>
