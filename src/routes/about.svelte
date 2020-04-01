<script>
import {version, description, name as appName, keywords, bugs, repository} from '../../package.json';
import {name} from '../../static/manifest.json';
</script>

<style>
h2 {
	font-family: 'Courier New', Courier, monospace;
	color: gray;
	font-size: smaller;
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
