<script lang="ts">
  import Button from "./Button.svelte";
  import { createController, players } from "../util/api";
  import PlayerList from "./PlayerList.svelte";
  import Banner from "./Banner.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const searchParams = new URLSearchParams(window.location.search);
  const gameId = searchParams.get("gameId") ?? "";

  let username = localStorage.getItem("username") || "";

  const join = () => {
    createController(gameId, username, () => dispatch("ready"));
  };
</script>

<Banner
  >{#if $players.length > 0}waiting{:else}join{/if}</Banner
>

<section class="text-wrap">
  {#if $players.length < 1}
    <input
      class="text"
      type="text"
      placeholder="Choose your name"
      bind:value={username}
    />
  {/if}
</section>

{#if $players.length > 0}
  <PlayerList {username} />
{:else}
  <section class="buttons-wrap">
    <Button disabled={username.trim().length < 1} on:click={join}>join</Button>
  </section>
{/if}

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
