<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let selected = false;
</script>

<button
  class:selected
  on:click={() => {
    selected = !selected;
    dispatch("change", selected);
  }}
>
  <slot />
</button>

<style lang="scss">
  button {
    font-size: var(--fs-puzzle);
    background: transparent;
    border: none;
    outline: none;
    transition: transform 0.2s ease-out;
    transform-origin: center;
    border-radius: var(--r-small);

    &:active {
      transform: scale(0.95);
    }

    &.selected {
      background: var(--c-300);
    }
  }
</style>
