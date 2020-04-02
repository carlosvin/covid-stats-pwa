<script>
import { createEventDispatcher} from 'svelte';
import Select from 'svelte-select';

const dispatch = createEventDispatcher();

export let countries;
export let country;
export let idSuffix = '';

$: id = `countries${idSuffix}`;
$: idData = `countries${idSuffix}-data`;
$: values = Object.values(countries);

function handleSelect (ev) {
	dispatch('selected', countries[ev.target.value]);
}


function handleSelect2 (ev) {
	console.log(ev);
}
</script>

<style>
</style>

{#if countries && country}
	<input {id} list={idData} name={id} on:change={handleSelect} on:select={handleSelect2} value={country.countryName} type="search" required>
	<datalist id={idData}>
		{#each values as {countryCode, countryName}}
			<option 
				value={countryCode} >{countryName}</option>
		{/each}
	</datalist>
	<label for={id}>Countries</label>
{/if}
