<script lang="ts">
  import { players } from "../util/api";
  import Banner from "./Banner.svelte";
  import BoardEntry from "./BoardEntry.svelte";

  $: sortedPlayers = $players?.toSorted((a, b) => a.score - b.score) ?? [];
</script>

<Banner>score</Banner>
<section class="leaderboard">
  {#each sortedPlayers as player, index}
    <BoardEntry {player} {index} />
  {/each}
</section>

<style lang="scss">
  .leaderboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
