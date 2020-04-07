<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  import { keywords, description, homepage } from "../../package.json";
  import { name, theme_color } from "../../static/manifest.json";

  export let segment;

  const date = new Date();
</script>

<style>
  main {
    display: flex;
    justify-content: flex-start;
    justify-items: stretch;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 1.5rem);
    background-color: white;
    padding: 2rem;
    margin: 0 auto;
    padding-top: 4rem;
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
  <meta name="theme-color" content={theme_color}>
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
