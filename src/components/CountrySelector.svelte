<script>
import { createEventDispatcher} from 'svelte';
import Input from './Input.svelte';

const dispatch = createEventDispatcher();

export let countries;
export let country;
export let idSuffix = '';
let error = undefined;

$: id = `countries${idSuffix}`;
$: idData = `countries${idSuffix}-data`;
$: values = Object.values(countries);

function handleChange ({target}) {
	const code = target.value;
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

{#if countries && country}
	<Input label="Countries" {id} {error}>
		<input {id} name={id} list={idData} 
			bind:value={country.countryName} 
			type="search"
			on:change={handleChange}
			on:input={handleInput}
			required/>
		<datalist id={idData}>
			{#each values as {countryCode, countryName}}
				<option value={countryCode} >{countryName}</option>
			{/each}
		</datalist>
	</Input>
{/if}
