<script>
  import { getIsoDate, getIsoDateTodayMinus, getIsoDateMinus } from "../services/dates";
  import DatePicker from "./DatePicker.svelte";
  import Error from "./Error.svelte";

  export let min = "2019-12-01";
  export let max = getIsoDate();
  export let labelStart;
  export let labelEnd;
  export let titleStart = undefined;
  export let titleEnd = undefined;

  export let selectedStart = getIsoDateTodayMinus(30);
  export let selectedEnd = getIsoDate();
  let error = undefined;

let maxBegin =  getIsoDateMinus(new Date(selectedEnd), 1);

$: {
  try {
    error = undefined;
    maxBegin = getIsoDateMinus(new Date(selectedEnd), 1);
  } catch (e) {
    error = 'Invalid end';
  }
}

let minEnd  = getIsoDateMinus(new Date(selectedStart), -1);
$: {
  try {
    error = undefined;
    minEnd = getIsoDateMinus(new Date(selectedStart), -1);
  } catch (e) {
    error = 'Invalid start';
  }
}

</script>

<style>
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 2%;
  }
</style>

<div class="container">
  <DatePicker
    {min}
    max={maxBegin}
    bind:selected={selectedStart}
    idSuffix="start"
    label={labelStart}
    title={titleStart} />
  <DatePicker
    min={minEnd}
    {max}
    bind:selected={selectedEnd}
    idSuffix="end"
    label={labelEnd}
    title={titleEnd} />
  <Error msg={error} />
</div>
