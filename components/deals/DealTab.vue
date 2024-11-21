<template>
  <div class="inactive-tab bg-white w-full px-2 py-3 flex border-b border-r border-grey-l4" :class="getTabClass" @click="$emit('clicked', deal.id)">
    <div class="w-12 mr-4">
      <slot name="logo" :deal="deal">
        <avatar class="avatar-active mt-2" :classes="'w-12 h-12'" :src="$get(deal, 'brand.logo.url')" />
      </slot>
    </div>
    <div class="w-3/4 flex flex-col">
      <p class="text-h7 lg:text-menu font-medium font-sans leading-tight pt-2">
        <slot name="name" :deal="deal">
          {{ $get(deal, 'brand.name', '-') }}
        </slot>
      </p>
      <p class="text-h7 lg:text-p3 uppercase leading-tight font-sans" :class="getStatusColor">
        {{ $t('app.deals.status.'+deal.status) }}
      </p>
      <p class="text-h7 lg:text-menu text-grey font-medium font-sans leading-tight mt-2">
        <span v-if="deal.priceTo==null || deal.priceTo==0">{{ $get(deal, 'price') | currency }}</span>
        <span v-else>{{ $get(deal, 'price') | currency }} - {{ $get(deal, 'priceTo') | currency }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import deal from '@/services/mixins/deal'

export default {
  name: 'DealTab',

  components: {
    Avatar
  },

  mixins: [deal],

  props: {
    deal: {
      type: Object,
      required: true
    },

    active: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getTabClass() {
      return this.active ? 'active-tab' : 'cursor-pointer'
    },

    getStatusColor() {
      return 'text-' + this.getDealStatusColor(this.deal) + '-d1'
    }
  }
}
</script>

<style lang="postcss" scoped>
.inactive-tab {
  @apply .border-l-2 .border-transparent;
  border-bottom-color: #f2f2f2;
  border-right-color: #f2f2f2;
}

.active-tab {
  @apply .border-l-2 .border-red .bg-grey-l4;
  border-bottom-color: #f2f2f2;
  border-right-color: #f2f2f2;

  .avatar-active {
    div {
      @apply .border .border-grey-l2;
    }
  }
}
</style>
