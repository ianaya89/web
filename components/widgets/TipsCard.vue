<template>
  <div class="tips-card py-6 px-5 min-h-64" data-cy="tipsCard">
    <h4 class="font-medium uppercase my-3">
      {{ count }} {{ $t('widgets.tips.title') }}
    </h4>
    <div class="flex justify-between items-center my-3">
      <span class="font-medium text-h6 py-2">
        {{ $t('widgets.tips.label') }} {{ tipIndex + 1 }}
      </span>
      <div class="select-none font-bold flex justify-end">
        <a
          :class="{disabled : tipIndex === 0}"
          class="lni-chevron-left text-red hover:text-red-d1 px-2 py-2 font-bold cursor-pointer"
          @click="previous"
        />
        <a
          :class="{disabled : count === 0 || count - 1 === tipIndex}"
          class="lni-chevron-right text-red hover:text-red-d1 px-2 py-2 font-bold cursor-pointer"
          @click="next"
        />
      </div>
    </div>
    <div v-if="$apollo.loading">
      <p>
        <content-placeholders>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </p>
    </div>
    <div
      v-if="!$apollo.loading && count !== 0"
      class="font-serif text-menu text-grey"
    >
      <transition name="slide-fade" appear mode="out-in">
        <p :key="tipIndex" v-text="body" />
      </transition>
    </div>

    <div v-if="!$apollo.loading && count === 0">
      {{ $t('widgets.tips.no_tips') }}
    </div>
  </div>
</template>

<script>
import { TipsQuery } from '@/services/graphql'

export default {
  name: 'TipsCard',

  apollo: {
    tips: TipsQuery
  },

  data: () => ({
    tipIndex: 0,
    tips: TipsQuery.mock
  }),

  computed: {
    count() {
      return this.tips.length
    },

    body() {
      return this.$get(
        this.tips,
        `${this.tipIndex}.body`,
        this.$t('widgets.tips.empty_body')
      )
    }
  },

  methods: {
    next() {
      if (this.tipIndex < this.count - 1) {
        this.tipIndex++
      }
    },

    previous() {
      if (this.tipIndex !== 0) {
        this.tipIndex--
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.tips-card {
  a.disabled {
    color: grey !important;
    cursor: default;
    &:hover {
      color: grey !important;
    }
  }
}
</style>
