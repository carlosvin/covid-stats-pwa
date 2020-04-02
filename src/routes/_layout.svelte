<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  import { keywords, description, homepage } from "../../package.json";
  import { name } from "../../static/manifest.json";

  export let segment;

  const date = new Date();
</script>

<style>
  main {
    display: flex;
    flex-wrap: wrap;
    flex-flow: column;
    justify-content: start;
    justify-items: flex-start;

    width: 100%;
    min-height: calc(100vh - 90px);
    background-color: white;
    padding: 2rem;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;
  }
</style>

<svelte:head>
  <meta name="title" content={name} />
  <meta property="og:title" content={name} />
  <meta property="twitter:title" content={name} />

  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />

  <meta property="og:url" content={homepage} />
  <meta property="twitter:url" content={homepage} />

  <meta property="og:image" content="/logo-192.png" />
  <meta property="twitter:image" content="/logo-192.png" />

  <meta property="og:type" content="website" />
  <meta property="twitter:card" content="summary_large_image" />

  <meta name="keywords" content={keywords} />
  <meta name="robots" content="index,follow" />
  <meta name="revised" content={date.toISOString()} />
</svelte:head>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
