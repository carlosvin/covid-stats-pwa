<script>
export let href;
export let rel = undefined;
export let title;
export let src;
export let width="32px";
export let height="32px";
</script>

<style>
img {
  vertical-align: middle;
}
</style>

<a {rel} {href} {title}>
  <img
    width={width}
    height={height}
    src={src}
    alt={title} />
</a>
