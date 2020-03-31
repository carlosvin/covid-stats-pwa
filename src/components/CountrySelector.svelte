<script>
import { createEventDispatcher} from 'svelte';
import Select from 'svelte-select';

const dispatch = createEventDispatcher();

export let countries;
export let country;

const getOptionLabel = ({countryName}) => (countryName);
const getSelectionLabel = ({countryName, value}) => {
	return countryName || countries[value].countryName;
}
const optionIdentifier = 'countryCode';

function handleSelect ({detail}) {
	dispatch('selected', detail);
}
</script>

<style>
</style>

{#if countries && country}
	<Select items={Object.values(countries)} 
		{optionIdentifier}
		selectedValue={country} 
		{getSelectionLabel}
		{getOptionLabel}
		isClearable={false} 
		on:select={handleSelect}/>
{/if}
