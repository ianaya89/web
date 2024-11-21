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
import SponsorItem from '@/components/SponsorItem'

export default {
  name: 'PartnersLanding',

  components: {
    SponsorItem
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    brandPartners: {
      type: Array,
      required: true
    }
  },

  computed: {
    partners() {
      return this.brandPartners
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
