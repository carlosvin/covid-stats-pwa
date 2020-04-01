<script>
import {version, description, name as appName, keywords, bugs, respository} from '../../package.json';
import {name} from '../../static/manifest.json';
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
	<title>About {name}</title>
	<meta name="description" content="{description}"/>
	<meta name="subject" content="{description}">
</svelte:head>

<h1>{name}</h1>
<h2>{appName} - {version}</h2>
<p>{description}.</p>
<p>All the information is fetched from <a href="http://covid-rest.appspot.com/docs/index.html">REST API</a> exposing data from  <a href="https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide">ECDC</a>.</p>
<footer>
<p>This is Open Source project: <a href="{respository.url}">Source code</a> | <a href="{bugs.url}">Issues</a></p>
</footer>