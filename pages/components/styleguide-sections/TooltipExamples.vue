<template>
  <div class="container">
    <h2>Tooltips</h2>
    <div class="m-10">
      <app-tooltip :color="'dark'" :position="'top'">
        Tooltip dark-top
      </app-tooltip>
      <app-tooltip>Tooltip dark-right (default)</app-tooltip>
      <app-tooltip :color="'dark'" :position="'bottom'">
        Tooltip dark-bottom
      </app-tooltip>
      <app-tooltip :color="'dark'" :position="'left'">
        Tooltip dark-left
      </app-tooltip>
    </div>
    <div class="m-20">
      <app-tooltip :color="'light'" :position="'right'">
        <template v-slot:activator>
          <svg-icon name="inventory/3" class="bg-red-l1" />
        </template>
        Tooltip light-right
      </app-tooltip>
    </div>
    <div class="m-20">
      <app-tooltip :color="'light'" :position="'top'">
        <template v-slot:activator>
          <svg-icon name="inventory/3" class="bg-red-l1" />
        </template>
        Tooltip light-top
      </app-tooltip>
    </div>
    <div class="m-20">
      <app-tooltip :color="'light'" :position="'left'">
        <template v-slot:activator>
          <svg-icon name="inventory/3" class="bg-red-l1" />
        </template>
        Tooltip light-left
      </app-tooltip>
    </div>
    <div class="m-20">
      <app-tooltip :color="'light'" :position="'bottom'">
        <template v-slot:activator>
          <svg-icon name="inventory/3" class="bg-red-l1" />
        </template>
        Tooltip light-bottom
      </app-tooltip>
    </div>
  </div>
</template>

<script>
import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'TooltipExamples',

  components: {
    AppTooltip
  }
}
</script>

<style scoped>
</style>
