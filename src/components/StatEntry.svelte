<script>
export let name;
</script>

<style>
    .name {
        font-weight: bold;
    }
    .value {
        font-family: 'Courier New', Courier, monospace;
        font-size: smaller;
    }
    figure {
        margin: 0 0;
    }
</style>


<figure>
    <span class='name'>{name}</span>
    <figcaption  class='value'>
        <slot></slot>
    </figcaption>
</figure>