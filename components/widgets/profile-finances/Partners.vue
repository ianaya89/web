<template>
  <div class="w-full pt-8">
    <div class="w-full">
      <h3>{{ $t('app.profile.team.finances.sponsor.title') }}</h3>
    </div>

    <div class="w-full mt-4 flex flex-wrap">
      <div v-for="partner in partners" :key="partner.id" class="w-1/3">
        <sponsor-item :name="partner.name" :src="partner.logo.url" />
      </div>
    </div>
  </div>
</template>

<script>
import { UnitPartnersQuery } from '@/services/graphql'
import SponsorItem from '@/components/SponsorItem'

export default {
  name: 'Partners',

  components: {
    SponsorItem
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitPartnersQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  computed: {
    partners() {
      return this.$get(this.unit, 'entity.profile.brandPartners', [])
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
