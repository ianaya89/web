<template>
  <div class="w-full">
    <app-input ref="search-input" v-model="searchInput" v-bind="$props.inputProps" :placeholder="$t('general.search')" :solo-label="null" />

    <transition name="fade" mode="out-in">
      <div :key="searchInput.length < 3">
        <div v-if="searchInput.length < 3">
          <slot />
        </div>
        <div v-else>
          <slot name="result" :result="result" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import AppInput from '@/components/AppInput'

export default {
  name: 'Search',

  components: {
    AppInput
  },

  props: {
    searchItems: {
      type: Array,
      required: true
    },
    searchAttribute: {
      type: [String, Array],
      required: true
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    inputProps: {
      type: Object,
      default: () => ({
        outline: true,
        stickyLabel: true,
        label: null,
        appendedIcon: 'fa fa-search text-red'
      })
    },
    limit: {
      type: Number,
      default: 9999
    }
  },

  data: () => ({
    searchInput: ''
  }),

  computed: {
    searchService() {
      return new Fuse(this.searchItems, {
        keys: Array.isArray(this.searchAttribute)
          ? this.searchAttribute
          : [this.searchAttribute]
      })
    },

    result() {
      return this.searchService.search(this.searchInput)
    }
  },

  mounted() {
    if (this.autofocus) {
      this.$refs['search-input'].focus()
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
