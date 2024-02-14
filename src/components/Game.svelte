<script lang="ts">
  import { onMount } from "svelte";
  import {
    generatePuzzle,
    type Emoji as EmojiType,
    isHost,
    puzzle,
    sendMessage,
  } from "../util/api";
  import Emoji from "./Emoji.svelte";

  const puzzleSize = 3;
  let selectedEmojis: EmojiType[] = [];
  let startTime = 0;
  let timeTaken = 0;

  $: {
    if ($puzzle !== null) {
      startTime = Date.now();
      timeTaken = 0;
    }
  }

  onMount(() => {
    if ($isHost) {
      generatePuzzle(puzzleSize);
    }
  });

  const handleSelection = (emoji: EmojiType, selected: boolean) => {
    if (!selected) {
      selectedEmojis = selectedEmojis.filter((e) => e !== emoji);
      return;
    }

    selectedEmojis.push(emoji);
    const set = new Set(selectedEmojis);

    if (set.size !== selectedEmojis.length && selectedEmojis.length === 2) {
      timeTaken = Date.now() - startTime;
      $puzzle = null;
      if (!$isHost) sendMessage("register_time", { time: timeTaken });
    }
  };
</script>

{#if $puzzle !== null && timeTaken == 0}
  <section class="puzzle-wrap">
    <h1>Find the matching set:</h1>
    <div class="puzzle" style={`--puzzle-size: ${puzzleSize}`}>
      {#each $puzzle as row}
        {#each row as emoji}
          <Emoji
            on:change={({ detail: selected }) => {
              handleSelection(emoji, selected);
            }}>{emoji}</Emoji
          >
        {/each}
      {/each}
    </div>
  </section>
{:else if timeTaken > 0}
  <section class="time-wrap">
    <h1 class="time">Time: {timeTaken / 1000}s</h1>
  </section>
{:else}
  <section class="time-wrap">
    <h1 class="time">Waiting...</h1>
  </section>
{/if}

<style lang="scss">
  .puzzle {
    display: grid;
    grid-template-columns: repeat(var(--puzzle-size), 1fr);
    gap: var(--p-tiny);

    &-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--c-200);
      gap: var(--p-large);
    }
  }

  .time {
    display: flex;
    color: var(--c-100);
    font-size: var(--fs-title);

    &-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
