<script>
  import { getIsoDate, getIsoDateTodayMinus, getIsoDateMinus } from "../services/dates";
  import DatePicker from "./DatePicker.svelte";
  import Error from "./Error.svelte";
  import { localization } from "../services/localization";
  
  let loc;
  const unsubscribe = localization.subscribe(value => (loc = value));

  export let min = "2019-12-01";
  export let max = getIsoDate();
  export let labelStart;
  export let labelEnd;
  export let titleStart = undefined;
  export let titleEnd = undefined;
  export let disabled = false;

  export let selectedStart = getIsoDateTodayMinus(30);
  export let selectedEnd = getIsoDate();
  let errorStart = undefined;
  let errorEnd = undefined;

let maxBegin =  getIsoDateMinus(new Date(selectedEnd), 1);

$: {
  try {
    errorEnd = undefined;
    maxBegin = getIsoDateMinus(new Date(selectedEnd), 1);
  } catch (e) {
    errorEnd = loc.get('Invalid range');
  }
}

let minEnd  = getIsoDateMinus(new Date(selectedStart), -1);
$: {
  try {
    errorStart = undefined;
    minEnd = getIsoDateMinus(new Date(selectedStart), -1);
  } catch (e) {
    errorStart = loc.get('Invalid range');
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
    {disabled}
    {min}
    error={errorStart}
    max={maxBegin}
    bind:selected={selectedStart}
    idSuffix="start"
    label={labelStart}
    title={titleStart} />
  <DatePicker
    {disabled}
    error={errorEnd}
    min={minEnd}
    {max}
    bind:selected={selectedEnd}
    idSuffix="end"
    label={labelEnd}
    title={titleEnd} />
</div>
