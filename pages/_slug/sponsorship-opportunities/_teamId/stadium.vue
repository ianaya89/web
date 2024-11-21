<template>
  <team-stadium-landing
    :unit-id="unitId"
    :skyboxes="skyboxes"
    :business-seats="businessSeats"
    :stadium-capacity="stadiumCapacity"
    :stadium-meta="stadiumMeta"
    :stadium-address="stadiumAddress"
    :stadium-name="stadiumName"
    :stadium-photo="stadiumPhoto"
    :stadium-lat="stadiumLat"
    :stadium-lng="stadiumLng"
  />
</template>

<script>
import TeamStadiumLanding from '@/components/widgets/landing/TeamStadiumLanding'

export default {
  scrollToTop: true,

  components: {
    TeamStadiumLanding
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    stadiumCapacity: {
      type: Number,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    skyboxes: {
      type: Number,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    businessSeats: {
      type: Number,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    stadiumMeta: {
      type: Object,
      required: false
    },
    stadiumAddress: {
      type: String,
      required: true
    },
    stadiumLat: {
      type: Number,
      required: true
    },
    stadiumLng: {
      type: Number,
      required: true
    },
    stadiumName: {
      type: String,
      required: true
    },
    stadiumPhoto: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
