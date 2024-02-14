<section class="title-wrap">
  <h1 class="title"><slot /></h1>
</section>

<style lang="scss">
  .title {
    font-size: var(--fs-title);
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
    }
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
