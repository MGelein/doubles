<script lang="ts">
  import { onMount } from "svelte";
  import { animals } from "../util/api";

  let randomEmoji = "";
  onMount(() => {
    randomEmoji = animals[Math.floor(Math.random() * animals.length)];
  });
</script>

<section class="title-wrap">
  <span class="emoji">{randomEmoji}</span>
  <h1 class="title">
    <slot />
  </h1>
  <span class="emoji">{randomEmoji}</span>
</section>

<style lang="scss">
  .title {
    font-size: inherit;
    color: var(--c-100);
    text-shadow: 2px 2px var(--c-800);
    text-transform: uppercase;

    &-wrap {
      background: var(--c-500);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--p-medium);
      box-shadow: var(--s-soft);
      margin-bottom: var(--p-huge);
      animation: slideIn 0.5s ease-out forwards;
      font-size: var(--fs-title);
    }
  }

  .emoji {
    font-size: 0.5em;
    padding: var(--p-small);
  }

  @keyframes slideIn {
    from {
      transform: scale(1.5) translateY(-10vw) translateX(-100vw) rotate(15deg);
    }
    to {
      transform: scale(1.1) rotate(-5deg);
    }
  }
</style>
