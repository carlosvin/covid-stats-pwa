<script>
  import {
    version,
    description,
    name as appName,
    keywords,
    bugs,
    repository
  } from "../../package.json";
  import { name } from "../../static/manifest.json";

  import { localization } from "../services/localization";

  let loc;

  const unsubscribe = localization.subscribe(value => (loc = value));
  let desc = loc.get('App description', description);
</script>

<style>
  h2 {
    font-family: "Courier New", Courier, monospace;
    color: gray;
    font-size: smaller;
  }
</style>

<svelte:head>
  <title>{loc.get('About')} {name}</title>
  <meta name="description" content={desc} />
  <meta name="subject" content={desc} />
</svelte:head>

<h1>{name}</h1>
<h2>{appName} - {version}</h2>
<p>{desc}.</p>
<p>
	{@html loc.get('Data comes from ECDC')}.
</p>
