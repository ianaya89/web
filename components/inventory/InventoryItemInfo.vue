<template>
  <div class="w-full flex items-center">
    <slot name="image">
      <div class="w-auto">
        <avatar class="" :classes="classes" :src="src" />
      </div>
    </slot>
    <div class="pl-2">
      <div class="text-h6 font-medium leading-tight text-left leading-tight">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="font-serif text-grey text-p3 text-left font-medium leading-tight">
        {{ info }}
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'InventoryItemInfo',

  components: {
    Avatar
  },

  props: {
    src: {
      type: String,
      default: require('../../assets/images/thumb-fallback.svg')
    },
    title: {
      type: String,
      default: 'Title'
    },
    info: {
      type: String,
      default: null
    },
    classes: {
      type: String,
      default: 'h-10 w-10'
    }
  }
}
</script>

<style scoped>
</style>
