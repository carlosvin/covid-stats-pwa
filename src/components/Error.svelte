<script>
export let msg = undefined;
</script>
<style>
    p {
        color: brown;
    }
</style>

{#if msg}
    <p>{msg}</p>
{/if}