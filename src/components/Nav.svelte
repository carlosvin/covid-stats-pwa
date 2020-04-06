<script>
  import { description } from "../../package.json";
  import { localization } from "../services/localization";

  let loc;
  const unsubscribe = localization.subscribe(value => (loc = value));
  let desc = loc.get('App description', description);

  export let segment;
  let isOffline = false;

  if (typeof window !== "undefined") {
    window.addEventListener(loc.get("online"), updateOnlineStatus);
    window.addEventListener(loc.get("offline"), updateOnlineStatus);
  }

  function updateOnlineStatus(event) {
    isOffline = navigator.onLine ? false : true;
  }
</script>

<style>
  nav {
    display: flex;
    flex-flow: row;
    vertical-align: middle;
    background-color: rgba(70, 3, 33, 0.156);
  }

  .offline {
    color: brown;
    border-radius: 0.3em;
    padding: 0.3em;
    vertical-align: middle;
    border: 1px solid;
    font-size: smaller;
  }

  ul {
    margin: 0;
    padding: 0;
    flex-grow: 1;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
    font-size: 1.4em;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.8);
  }

  a {
    text-decoration: none;
    padding: 0.3em 0.5em;
    display: block;
  }
</style>

<svelte:head>
  <meta name="description" content={desc} />
  <meta name="subject" content={desc} />
</svelte:head>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        {loc.get('home')}
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        {loc.get('about')}
      </a>
    </li>
  </ul>
  {#if isOffline}
    <p class="offline">offline</p>
  {/if}
</nav>
