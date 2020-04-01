<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
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
		margin-top: 0;
		margin-left: 0;
		margin-right: 0;
		margin-bottom: 1em;
		box-sizing: border-box;
		text-align: center;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<Footer/>