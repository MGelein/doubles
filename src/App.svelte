<script lang="ts">
  import { onMount } from "svelte";
  import Host from "./components/Host.svelte";
  import Join from "./components/Join.svelte";
  import Title from "./components/Title.svelte";
  import Game from "./components/Game.svelte";
  import { page } from "./util/api";

  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("gameId")) $page = "join";
  });
</script>

<main>
  {#if $page === "title"}
    <Title on:join={() => ($page = "join")} on:host={() => ($page = "host")} />
  {:else if $page === "host"}
    <Host on:ready={() => ($page = "game")} />
  {:else if $page === "join"}
    <Join on:ready={() => ($page = "game")} />
  {:else if $page === "game"}
    <Game />
  {/if}
</main>

<style lang="scss">
  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: var(--p-large);
  }
</style>
