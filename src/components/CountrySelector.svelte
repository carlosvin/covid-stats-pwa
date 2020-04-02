<script>
import { createEventDispatcher} from 'svelte';
import Error from './Error.svelte';

const dispatch = createEventDispatcher();

export let countries;
export let country;
export let idSuffix = '';
let error = undefined;

$: id = `countries${idSuffix}`;
$: idData = `countries${idSuffix}-data`;
$: values = Object.values(countries);

function handleChange (ev) {
	const code = ev.target.value;
	if (code) {
		if (code in countries) {
			dispatch('selected', countries[code]);
		} else {
			error = `Invalid selected country code: "${code}"`;
		}
	} else {
		error = `Required`;
	}
	
}

function handleInput (ev) {
	error = undefined;
}
</script>

<style>
</style>

{#if countries && country}
	<input {id} name={id} list={idData} 
		value={country.countryName} 
		type="search"
		on:change={handleChange}
		on:input={handleInput}
		required/>
	<datalist id={idData}>
		{#each values as {countryCode, countryName}}
			<option value={countryCode} >{countryName}</option>
		{/each}
	</datalist>
	<label for={id}>
		{#if error}
			<Error msg={error}/>
		{:else}
			Countries
		{/if}
	</label>
{/if}
