
<style>
.flex-grid {
  display: flex;
}
.flex-grid > * {
  flex: 1;
}

@media (max-width: 400px) {
  .flex-grid {
    display: block;
  }
}
</style>

<div class="flex-grid">
  <slot></slot>
</div>
