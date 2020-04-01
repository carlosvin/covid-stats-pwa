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
		display: flex;
		flex-wrap: wrap;
		flex-flow: column;
		justify-content: start;
		justify-items: flex-start;
		
		width: 100%;
		background-color: white;
		padding: 2rem;
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