<script lang="ts">
  import type { Player } from "../util/api";

  export let player: Player;
  export let index: number;
</script>

<div class="board-entry">
  <span class="position">{index + 1}</span>
  <span class="name">{player.name}</span>
  <span class="time">{player.score / 1000}s</span>
  <span class="status">{player.done ? "✔️" : "⏳"}</span>
</div>

<style lang="scss">
  .board-entry {
    align-self: stretch;
    color: var(--c-200);
    font-size: var(--fs-leaderboard);
    display: flex;
    justify-content: space-around;
    padding: var(--p-small) var(--p-huge);
  }
</style>
