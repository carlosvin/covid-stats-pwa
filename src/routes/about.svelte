<script>
</script>

<style>
h2 {
	font-family: 'Courier New', Courier, monospace;
	color: gray;
	font-size: smaller;
}
/* TODO make footer reusable as we do with Nav */
footer {
	color: gray;
	margin-bottom: 0;
  	width: 100%;
  	height: 2.5em;
}
</style>

<svelte:head>
	<title>About</title>
	<meta name="description" content="app.description">
</svelte:head>

<h1>COVID 19 Stats</h1>
<h2>app.name - app.version</h2>
<p>app.description.</p>
<p>All the information is fetched from <a href="http://covid-rest.appspot.com/docs/index.html">REST API</a> exposing data from  <a href="https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide">ECDC</a>.</p>
<footer>
<p>This is Open Source project, you can find the source code at: <a href="https://github.com/carlosvin/covid-stats-pwa">https://github.com/carlosvin/covid-stats-pwa</a></p>
</footer>