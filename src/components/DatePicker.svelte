
<script>
export let today = getIsoDate();
import { createEventDispatcher } from 'svelte';
import { getIsoDate } from "../services/dates";

const dispatch = createEventDispatcher();

function handleDateChange (d) {
	dispatch('dateChanged', d.target.value);
}
</script>

<input
    type="date"
    id="when"
    name="when"
    value={today}
    min="2019-12-01"
    max={today}
    on:change={handleDateChange} />