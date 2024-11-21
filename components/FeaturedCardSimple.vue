<template>
  <div class="">
    <div class="px-6 pt-4 shadow-hover max-w-s bg-grey-l5 w-full flex flex-1 border-b border-grey-l3 pb-2 h-full">
      <div class="w-1/4 border-r">
        <avatar class="my-auto" :src="$get(team,'logoUrl',undefined)" />
      </div>
      <div class="w-3/4 flex pl-4">
        <div class="my-auto">
          <p class="color-orange font-sans text-h4 font-medium leading-tight">
            <nuxt-link
              :to="localePath(
                loadLink
              )"
            >
              {{ $get(team,'teamName','-') }}
            </nuxt-link>
          </p>
          <p class="text-grey leading-tight">
            {{ $get(team,'countryName','-') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import { buildTeamSlug } from '@/services/helpers'

export default {
  name: 'FeaturedCardSimple',

  components: {
    Avatar
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
    // // eslint-disable-next-line vue/require-default-prop
    // brandId: {
    //   type: String,
    //   required: false
    // }
  },

  computed: {
    loadLink() {
      // return this.$store.getters['auth/checkPermissions']

      return this.checkPermissions()

      // return this.checkPermission('access-team-fans-reach-as-brand')
      // return this.checkPermission('access-team-players-as-brand')
      // return this.checkPermission('access-team-league-as-brand')
      // return this.checkPermission('access-team-sponsorship-as-brand')
    }
  },

  methods: {
    checkPermissions() {
      const link = {
        name: '',
        params: {}
      }
      // if (!this.brandId) {
      // link.name = 'team-teamId-fans'
      link.name = 'slug-sponsorship-opportunities-teamId-fans'
      link.params.teamId = this.unitId
      link.params.slug = buildTeamSlug(this.team.teamName)
      // }
      // else {
      //   link.name = 'unit-id-marketplace-unit-unitId-fans'
      //   link.params.id = this.brandId
      //   link.params.unitId = this.$get(this.team, 'unitid', null)
      // }

      return link
    }
  }
}
</script>

<style lang="postcss" scoped>
.color-orange {
  color: #ff553f;
}
</style>
