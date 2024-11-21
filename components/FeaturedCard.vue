<template>
  <div class="bg-grey-l5 flex flex-col px-6 pt-4 pb-2 shadow-hover max-w-xs">
    <div class="w-full flex flex-1 border-b border-grey-l3 pb-2">
      <div class="w-1/4">
        <avatar class="my-auto" :src="$get(team,'logo.url',undefined)" />
      </div>
      <div class="w-3/4 flex pl-1">
        <div class="my-auto">
          <p class="font-sans text-h4 font-medium leading-tight">
            <nuxt-link
              :to="localePath({name: 'unit-id-marketplace-unit-unitId-inventory',
                               params: {
                                 id: unitId,
                                 unitId: $get(team,'unit.id')
                               }})"
            >
              {{ $get(team,'name','-') }}
            </nuxt-link>
          </p>
          <p class="text-grey leading-tight">
            {{ $get(team,'country.name','-') }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-full flex pt-2">
      <div class="w-1/2">
        <data-label :label="$t('app.marketplace.items')">
          {{ items | number(items > 999999) }}
        </data-label>
      </div>
      <div class="w-1/2">
        <data-label :label="$t('app.profile.team.fans.media.followers')">
          {{ followersCount | number(followersCount > 999999) }}
        </data-label>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import DataLabel from '@/components/DataLabel'

export default {
  name: 'FeaturedCard',

  components: {
    Avatar,
    DataLabel
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    team: {
      type: Object,
      required: true
    }
  },

  computed: {
    items() {
      return (
        this.$get(this.team, 'inventoriesCount', 0) +
        this.$get(this.team, 'packagesCount', 0)
      )
    },

    followersCount() {
      return this.$get(this.team, 'socialAccounts', []).reduce(
        (acc, item) => acc + item.followersCount,
        0
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
