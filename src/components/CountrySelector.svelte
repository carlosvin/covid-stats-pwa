<script>
import { createEventDispatcher} from 'svelte';
import Input from './Input.svelte';
import { localization } from '../services/localization';

let loc;
const unsubscribe = localization.subscribe(value => loc = value);

const dispatch = createEventDispatcher();

export let countries;
export let country;
export let idSuffix = '';
export let disabled = false;
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
			error = `${loc.get('Invalid country')} "${code}"`;
		}
	} else {
		error = loc.get('Required');
	}
}

function handleInput (ev) {
	error = undefined;
}
</script>

{#if countries && country}
	<Input label={loc.get('Countries')} {id} {error}>
		<input {id} name={id} list={idData} 
			{disabled}
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
