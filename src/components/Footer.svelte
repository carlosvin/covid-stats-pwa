<script>
  import { bugs, repository } from "../../package.json";
  import { name } from "../../static/manifest.json";
</script>

<style>
  footer {
    position: fixed;
    bottom: 0;
    margin-bottom: 0;
    background: rgb(240, 240, 240);
    color: gray;
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-items: center;
    justify-content: space-around;
    font-size: smaller;
  }

  span {
    padding: 0.4em;
  }
</style>

<footer>
  <span>
    <strong>{name}</strong> is Open Source project:
    <a href={repository.url}>Source code</a>
    |
    <a href={bugs.url}>Issues</a>
  </span>
</footer>
