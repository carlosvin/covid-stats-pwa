<script>
  export let data = {};
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
</style>

<dl>
  {#each [...Object.entries(data)] as [key, value]}
    <dt>{key}</dt>
    <dd>{value}</dd>
  {/each}
</dl>
