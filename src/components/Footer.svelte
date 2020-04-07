<script>
  import { bugs, repository } from "../../package.json";
  import { name } from "../../static/manifest.json";
  import { localization } from "../services/localization";

  let loc;

  const unsubscribe = localization.subscribe(value => (loc = value));
</script>

<style>
  footer {
    position: static;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(70, 3, 33, 0.05);
    color: white;
    text-align: center;
    color: #464444;
    font-size: smaller;
    display: flex;
    flex-flow: wrap;
    justify-items: center;
    justify-content: space-around;
    min-height: 1.5rem;
  }

  span {
    padding: 0.4em;
  }

  a {
    white-space: nowrap;
  }
</style>

<footer>
  <span>
    <strong>{name}</strong>
    {loc.get('is Open Source project')}:
    <a href={repository.url}>{loc.get('Source code')}</a>
    |
    <a href={bugs.url}>{loc.get('Issues')}</a>
  </span>
</footer>
