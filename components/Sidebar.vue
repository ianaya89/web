<template>
  <div class="sidebar-nav-column hidden xl:flex bg-white">
    <nav class="fixed" style="max-height: 100vh">
      <slot />
    </nav>

    <div
      class="sidebar__footer text-grey-l1 px-8 py-4 flex flex-col items-start justify-center fixed bottom-0"
      style="width: 12.5rem;"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.sidebar-nav-column {
  @apply .border-r .border-grey-l3 .py-4 .flex-wrap .flex-shrink-0;
  width: 12.5rem;
  min-height: calc(100vh - 5rem);

  .link--secondary-small {
    @apply .font-sans .text-p3 .text-grey-l1;

    &:hover,
    &:active {
      @apply .text-grey-l2 .no-underline .border-b-0;
    }
  }

  .sidebar__footer {
    .nuxt-link-exact-active {
      @apply .text-red;
    }
  }
}
</style>
