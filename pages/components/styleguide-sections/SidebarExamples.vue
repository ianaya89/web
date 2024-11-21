<template>
  <div class="container min-h-screen">
    <h2>Sidebar</h2>

    <sidebar :links="links" />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'SidebarExamples',

  components: {
    Sidebar
  },

  data: () => ({
    links: [
      { name: 'Profile', to: '/link', exact: true },
      { name: 'Dashboard', to: '/link1', exact: true },
      { name: 'Marketplace', to: '/link2', exact: true }
    ]
  })
}
</script>

<style scoped>
</style>
