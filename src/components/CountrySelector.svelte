<script>
import { createEventDispatcher} from 'svelte';
import Input from './Input.svelte';
import { localization } from '../services/localization';
import AutoComplete from "simple-svelte-autocomplete";

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

function handleChange (country) {
	error = undefined;
	if (country) {
		dispatch('selected', country);
	} else {
		error = loc.get('Required');
	}
}
</script>

{#if countries && country}
	<Input label={loc.get('Countries')} {id} {error}>
		<AutoComplete
			{disabled} required={true}
			items={values}
			onChange={handleChange}
			bind:selectedItem={country}
			on:change={handleChange}
			labelFieldName="countryName"
			keywordsFunction={country => country.countryName + ' ' + country.countryCode} />
	</Input>
{/if}
