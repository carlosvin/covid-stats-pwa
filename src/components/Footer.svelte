<script>
  import { bugs, repository } from "../../package.json";
  import { name } from "../../static/manifest.json";
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
    color: gray;
    font-size: smaller;

    display: flex;
    flex-flow: wrap;
    justify-items: center;
    justify-content: space-around;
  }

  span {
    padding: 0.4em;
  }
</style>

<footer>
  <span>
    <strong>{name}</strong>
    is Open Source project:
    <a href={repository.url}>Source code</a>
    |
    <a href={bugs.url}>Issues</a>
  </span>
</footer>
