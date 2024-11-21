<template>
  <header class="app-header">
    <logo />
    <ul>
      <slot />
    </ul>
  </header>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  name: 'AppHeader',

  components: {
    Logo
  }
}
</script>

<style lang="postcss">
.app-header {
  @apply .h-20 .px-6 .bg-white .border-solid .border-b .border-grey-l3 .fixed .top-0 .w-full .justify-between .z-50;
  ul {
    @apply .flex .items-stretch .justify-end;
    li {
      @apply .h-full;
    }
  }
  .logo--so {
    @apply .flex .items-center .justify-center;
  }
}
</style>
