<template>
  <header class="header--public flex w-full h-24 justify-between">
    <div class="flex">
      <ul class="flex">
        <li v-for="(item, index) in leftNav" :key="index">
          <nuxt-link :to="item.href" :class="{'text-red': item.active}">
            {{ item.label }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="flex">
      <ul class="flex justify-end">
        <li>
          <nuxt-link v-if="!isAuthenticated" :to="localePath({name: 'login'})" class="my-auto text-white">
            {{ $t('public.header.login') }}
          </nuxt-link>
          <nuxt-link v-else :to="resolvedEnterInApp" class="my-auto text-white">
            {{ fullName }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { MeQuery } from '@/services/graphql'

export default {
  name: 'PublicHeader',

  data: () => ({
    me: null
  }),

  apollo: {
    me: {
      ...MeQuery,
      skip() {
        return !this.isAuthenticated
      }
    }
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),

    leftNav() {
      return [
        {
          label: this.$t('public.header.teams'),
          href: this.localePath({ name: 'index' })
        },
        {
          label: this.$t('public.header.brands'),
          href: this.localePath({ name: 'brand' })
        },
        {
          label: this.$t('public.header.news'),
          href: this.localePath({ name: 'news' }),
          active: true
        }
      ]
    },

    resolvedEnterInApp() {
      if (this.me !== null) {
        const unitId = this.$get(this.me, 'units.0.id')
        return this.localePath({
          name: 'unit-id-dashboard',
          params: { id: unitId }
        })
      } else {
        return {}
      }
    },

    fullName() {
      if (this.me !== null) {
        const firstName = this.$get(this.me, 'profile.firstName', '-')
        const lastName = this.$get(this.me, 'profile.lastName', '-')
        return `${firstName} ${lastName}`
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="postcss">
.header--public {
  ul {
    @apply .items-center;
  }

  li {
    @apply .flex;
  }

  a {
    @apply .text-menu .px-8 .py-4 .text-grey-l2 .font-medium;

    &:hover {
      @apply .text-black;
    }
  }
}
</style>
