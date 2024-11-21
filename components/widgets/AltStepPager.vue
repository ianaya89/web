<template>
  <div class="w-full relative">
    <div ref="itemsContainer" class="w-full overflow-x-hidden whitespace-no-wrap mb-4">
      <div v-for="(item, index) in items" :key="index" class="w-full inline-block px-px whitespace-normal align-top" :data-item-index="index">
        <slot name="content" :item="item" />
      </div>
    </div>

    <div class="w-full relative min-h-2">
      <alt-mover v-if="items.length > 1" :inverted="false" :data="items" class="absolute top-0 right-0 mr-10" @change="onChangeItem($event)">
        <span slot="lastpage" class="text-xl ml-1">{{ totalitems }}</span>
        <template v-slot:content="props">
          <slot name="mover" :current="props.current" />
        </template>
      </alt-mover>
    </div>
  </div>
</template>

  <script>
import AltMover from '@/components/AltMover'
import { scrollTo } from '@/services/helpers'

export default {
  name: 'AltStepPager',

  components: {
    AltMover
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    totalitems: {
      type: Number,
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
