<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Button from "./Button.svelte";
  import Banner from "./Banner.svelte";

  const dispatch = createEventDispatcher();

  let username = localStorage.getItem("username") || "";

  const nextPage = () => {
    localStorage.setItem("username", username);
    dispatch("host");
  };
</script>

<Banner>Doubles</Banner>
<section class="text-wrap">
  <input
    class="text"
    type="text"
    placeholder="Choose your name"
    bind:value={username}
  />
</section>
<section class="buttons-wrap">
  <Button disabled={username.trim().length < 1} on:click={() => nextPage()}
    >New game</Button
  >
</section>

<style lang="scss">
  .text {
    font-family: inherit;
    font-size: var(--fs-input);
    padding: var(--p-small) var(--p-large);
    background: var(--c-900);
    outline: none;
    border: 0.2rem solid var(--c-500);
    border-radius: var(--r-small);
    color: var(--c-200);
    text-align: center;

    &-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--p-medium);
    }
  }

  .buttons-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--p-large);
  }
</style>
