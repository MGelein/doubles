<script lang="ts">
  export let disabled = false;
  export let selected = false;
</script>

<button class:disabled class:selected on:click><slot /></button>

<style lang="scss">
  button {
    cursor: pointer;
    font-size: var(--fs-button);
    color: var(--c-200);
    background: var(--c-800);
    border: 0.2rem solid currentColor;
    padding: var(--p-small) var(--p-large);
    border-radius: var(--r-small);
    text-transform: uppercase;
    box-shadow: var(--s-medium);
    transition:
      transform 0.2s ease-out,
      opacity 0.2s ease-out;

    &.selected {
      box-shadow: none;
      border-width: 0.4rem;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    &.disabled {
      opacity: 0.3;

      &:hover {
        transform: none;
      }
    }
  }
</style>
