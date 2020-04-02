<script>
export let msg = undefined;
</script>
<style>
    span {
        color: brown;
    }
</style>

{#if msg}
    <span>{msg}</span>
{/if}