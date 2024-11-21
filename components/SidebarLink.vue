<template>
  <nuxt-link
    :to="localePath(href)"
    class="menu-item text-h7 xl:text-menu mb-6 xl:mb-3"
    style="width: 12.5rem;"
    active-class="active"
  >
    <div class="item-content">
      <slot />
      <badge v-if="badge" :value="badgeValue" />
    </div>
    <div class="item-lock">
      <i v-if="locked" class="fa fa-fw fa-lock" />
    </div>
  </nuxt-link>
</template>

<script>
import Badge from '@/components/Badge'

export default {
  components: {
    Badge
  },

  props: {
    href: {
      type: Object,
      required: true
    },
    badge: {
      type: Boolean,
      default: false
    },
    badgeValue: {
      type: Number,
      default: null
    },
    locked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="postcss">
.menu-item {
  @apply .text-black .font-sans .font-semibold .uppercase .tracking-wide .flex .mt-1 .px-6 .pt-2 .pb-1 .border-l-3 .border-transparent;
  transition: 150ms ease-in-out;
  .item-content {
    flex-grow: 1;
  }

  &:hover {
    @apply .text-grey .no-underline .border-b-0;
  }

  &.active {
    @apply .text-red .border-l-3 .border-b-0 .border-red;
  }
}
</style>
