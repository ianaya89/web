<template>
  <section class="blog p-12 bg-grey-l3">
    <h1 class="font-medium uppercase mb-4">
      All widgets preview
    </h1>
    <div class="container flex">
      <h2>Tips card</h2>
    </div>
    <div class="w-1/3">
      <tips-card title="My tips are important" />
    </div>
  </section>
</template>

<script>
import TipsCard from '@/components/widgets/TipsCard'

export default {
  layout: 'default',

  head: () => ({
    title: 'SPONSOR.ONLINE - Blog'
  }),

  components: {
    TipsCard
  }
}
</script>

<style scoped>
</style>
