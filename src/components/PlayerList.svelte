<script lang="ts">
  import { players } from "../util/api";
  export let username: string;

  $: playerList = $players
    .map((p) => (p.name === username ? `${p.name} (You)` : p.name))
    .join(", ");
</script>

<section class="player-wrap">
  <h3 class="player-header">Players:</h3>
  <span class="player">{playerList}</span>
</section>

<style lang="scss">
  .player {
    color: var(--c-100);

    &-wrap {
      display: flex;
      flex-direction: column;
      gap: var(--p-small);
      justify-content: center;
      align-items: center;
    }

    &-header {
      color: var(--c-200);
    }
  }
</style>
