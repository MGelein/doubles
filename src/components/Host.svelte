<script lang="ts">
  import QRCode from "qrcode";
  import Banner from "./Banner.svelte";
  import Button from "./Button.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import {
    createRemote,
    difficulty,
    gameNumber,
    players,
    sendMessage,
    updateDifficulty,
  } from "../util/api";
  import PlayerList from "./PlayerList.svelte";

  const username = localStorage.getItem("username") ?? "";

  const dispatch = createEventDispatcher();
  let canvas: HTMLCanvasElement | null = null;

  const getUUID = () => {
    if (window.location.hostname.includes("localhost")) return "test";
    else return Date.now().toString();
  };

  onMount(async () => {
    const UUID = getUUID();
    const searchParams = new URLSearchParams();
    searchParams.set("gameId", UUID);
    const qrData = window.location.href + "?" + searchParams.toString();
    QRCode.toCanvas(canvas, qrData, {
      color: { light: "#ccd", dark: "#334" },
    });
    createRemote(UUID);
  });
</script>

<Banner>new game</Banner>
<section class="cta-wrap">
  <h1 class="cta">Scan QR to join:</h1>
</section>
<section class="qr-wrap">
  <canvas class="canvas" bind:this={canvas}></canvas>
</section>
<section class="difficulty-wrap">
  <h1>Difficulty:</h1>
  <div class="difficulty-buttons">
    {#each [2, 3, 4, 5, 6] as level}
      <Button
        selected={$difficulty === level}
        on:click={() => updateDifficulty(level)}>{level}</Button
      >
    {/each}
  </div>
</section>
<PlayerList {username} />
<section class="button-wrap">
  <Button
    disabled={$players.length < 1}
    on:click={() => {
      if ($players.length > 0) {
        dispatch("ready");
        $gameNumber = 0;
        sendMessage("start_game", {});
      }
    }}
  >
    {#if $players.length > 0}ready!{:else}waiting{/if}</Button
  >
</section>

<style lang="scss">
  .cta {
    color: var(--c-200);

    &-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .difficulty {
    &-wrap {
      color: var(--c-200);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--p-small);
    }

    &-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--p-small);
    }
  }

  .button-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .qr-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
