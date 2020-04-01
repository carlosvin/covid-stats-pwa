<script>
	import Nav from '../components/Nav.svelte';
	import {keywords} from '../../package.json';

	export let segment;

	const date = new Date();
</script>

<svelte:head>
	<meta name="keywords" content="{keywords}"/>
	<meta name="robots" content="index,follow" />
	<meta name="revised" content="{date.toISOString()}" />
</svelte:head>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
		text-align: center;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>