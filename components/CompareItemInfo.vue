<template>
  <div class="compare-item">
    <inventory-item-info :title="title" :info="info" :src="src">
      <template v-slot:image>
        <slot name="image" />
      </template>
    </inventory-item-info>
    <div v-if="remover" class="flex pl-4">
      <span class="compare-item-remover text-p4" :class="[{'lni-close': !removing},{'fas fa-spin fa-spinner':removing}]" @click.stop="onClick()" />
    </div>
  </div>
</template>

<script>
import InventoryItemInfo from '@/components/inventory/InventoryItemInfo'

export default {
  name: 'CompareItemInfo',

  components: {
    InventoryItemInfo
  },

  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    src: {
      type: String,
      default: require('../assets/images/thumb-fallback.svg')
    },
    info: {
      type: String,
      default: null
    },
    remover: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    removing: false
  }),

  methods: {
    onClick() {
      this.removing = true
      this.$emit('compare-item-remove', this.id)
      this.$store.dispatch('compare/remove', this.id)
    }
  }
}
</script>

<style lang="postcss" scoped>
.compare-item {
  @apply .w-full .flex .py-4;

  .compare-item-remover {
    @apply .cursor-pointer .m-auto .text-grey-l2;
    transition: color 150ms ease-in-out;
  }

  &:hover .compare-item-remover {
    @apply .text-red;
  }
}
</style>
