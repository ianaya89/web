<template>
  <div class="w-full relative">
    <div class="w-full relative min-h-2">
      <slot name="pager-title" />
      <mover v-if="items.length > 1" :inverted="false" :data="items" class="absolute top-0 right-0" @change="onChangeItem($event)">
        <template v-slot:content="props">
          <slot name="mover" :current="props.current" />
        </template>
      </mover>
    </div>
    <div ref="itemsContainer" class="w-full pt-2 overflow-x-hidden whitespace-no-wrap">
      <div v-for="(item, index) in items" :key="index" class="w-full inline-block px-px" :data-item-index="index">
        <div class="w-full pb-2">
          <slot name="title" :item="item" />
        </div>
        <div class="w-full flex">
          <slot name="content" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mover from '@/components/Mover'
import { scrollTo } from '@/services/helpers'

export default {
  name: 'StepPager',

  components: {
    Mover
  },

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    currentIndex: 0
  }),

  methods: {
    onChangeItem(itemIndex) {
      const toElement = this.$refs.itemsContainer.querySelector(
        '[data-item-index="' + itemIndex + '"]'
      )
      scrollTo(
        this.$refs.itemsContainer,
        toElement,
        null,
        1000,
        'offsetLeft',
        'scrollLeft'
      )
      this.currentIndex = itemIndex
    }
  }
}
</script>

<style scoped>
</style>
