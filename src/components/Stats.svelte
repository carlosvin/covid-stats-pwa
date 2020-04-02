<script>
export let data = {};
export let caption = undefined;
</script>

<style>
    dl {
        display: flex;
        flex-flow: row wrap;
        border-style: dotted;
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
        margin-top: -0.9rem;
        font-size: smaller;
        padding-right: 0.2rem;
        text-align: right;
        color: rgb(89, 89, 89);
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
