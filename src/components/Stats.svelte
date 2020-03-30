<script>
  export let data = {};
  export let caption = undefined;
</script>

<style>
  dl {
    display: flex;
    flex-flow: row wrap;
    border: 1px solid #ccc;
  }
  dt {
    flex-basis: 20%;
    padding: 2px 4px;
    text-align: right;
    font-weight: bold;
  }
  dt::after {
    content: ":";
  }
  dd {
    flex-grow: 1;
    margin: 0;
    padding: 2px 4px;
  }
  figcaption {
    margin-top: -1.0rem;
    font-style: italic;
    font-size: smaller;
    padding-left: 0.1rem;
  }
</style>

<figure>
  <dl>
    {#each [...Object.entries(data)] as [key, value]}
      <dt>{key}</dt>
      <dd>{value}</dd>
    {/each}
  </dl>
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</figure>
