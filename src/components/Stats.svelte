<script>
export let data = {};
export let caption = undefined;
</script>

<style>
    dl {
        display: flex;
        flex-flow: row wrap;
        margin: 0;
    }
    dt {
        text-align: right;
        font-weight: bold;
    }
    dt::after {
        content: ":";
    }
    dd {
        flex-grow: 1;
        margin: 0;
    }
    figcaption {
        margin-left: -0.6em;
        margin-top: 0.6em;
    }
    figure {
        margin-bottom: 0.6em;
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
