
<script>
import { getIsoDate } from "../services/dates";

export let today = getIsoDate();
export let selected = getIsoDate();
</script>

<style>
</style>

<input
    type="date"
    id="when"
    name="when"
    bind:value={selected}
    min="2019-12-01"
    max={today} />