<script>
  import StatEntry from "./StatsEntry.svelte";
  import { localization } from "../services/localization";

  let loc;
  const unsubscribe = localization.subscribe(value => (loc = value));

  export let data = {};
  export let caption = undefined;
</script>

<style>
  figure {
    width: 100%;
    border: 1px solid #d8dbdf;
    border-radius: 2px;
    text-align: center;
    display: table;
    margin: 0;
  }
  figcaption {
    display: table-cell;
    vertical-align: middle;
    font-size: smaller;
  }
  .entries {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>

<figure>
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
  <div class="entries">
    {#each [...Object.entries(data)] as [name, value]}
      <StatEntry {name}>{loc.formatNum(value)}</StatEntry>
    {/each}
  </div>
</figure>
