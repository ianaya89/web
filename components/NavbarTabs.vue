<template>
  <v-tabs :next-icon="'lni-chevron-right'" :prev-icon="'lni-chevron-left'" show-arrows class="nav-tab">
    <slot />
  </v-tabs>
</template>

<script>
export default {}
</script>

<style lang="postcss">
.v-tabs {
  @apply shadow-linebottom;

  .v-tabs__item {
    @apply .pt-3 .pb-2 .px-8 border-b border-transparent .text-h6 .text-black .capitalize;
    border-top: solid 2px transparent;
    border-left: solid 1px transparent;
    border-right: solid 1px transparent;
    transition: all 150ms ease-in;

    &:hover {
      @apply .text-grey-l1;
    }
  }

  .v-tabs__bar.theme--light {
    @apply bg-transparent;
  }

  .v-tabs__item--active {
    @apply .border-l .border-r .border-grey-l3 .bg-white .text-h6 .text-red .capitalize;
    border-top: 2px solid red;
    border-bottom: 1px solid transparent;
  }

  .theme--light.v-icon {
    @apply .text-red;
  }
}
</style>
