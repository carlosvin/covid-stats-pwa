
<script>
import { getIsoDate } from "../services/dates";

export let today = getIsoDate();
export let selected = getIsoDate();
</script>

<style>
    input {
        border-color: #d8dbdf;
        outline-color: #d8dbdf;
        border: 1px solid #d8dbdf;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input:focus {
        border-color: #006fe8;
    }

    input:hover{
        border-color: #b2b8bf;
    }
</style>

<input
    type="date"
    id="when"
    name="when"
    bind:value={selected}
    min="2019-12-01"
    max={today} />