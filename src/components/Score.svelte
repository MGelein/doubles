<script lang="ts">
  import { isHost, players, restartGame } from "../util/api";
  import Banner from "./Banner.svelte";
  import BoardEntry from "./BoardEntry.svelte";
  import Button from "./Button.svelte";

  $: sortedPlayers = $players?.toSorted((a, b) => a.score - b.score) ?? [];
</script>

<Banner>score</Banner>
<section class="leaderboard">
  {#each sortedPlayers as player, index}
    <BoardEntry {player} {index} />
  {/each}
</section>
{#if $isHost}
  <section class="button-wrap">
    <Button on:click={restartGame}>play again</Button>
  </section>
{/if}

<style lang="scss">
  .leaderboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
