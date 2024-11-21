<template>
  <section class="team__profile__stadium">
    <stadium-info-landing
      ref="stadiumInfo"
      :unit-id="unitId"
      :skyboxes="skyboxes"
      :business-seats="businessSeats"
      :stadium-capacity="stadiumCapacity"
      :stadium-meta="stadiumMeta"
      :stadium-address="stadiumAddress"
      :stadium-lat="stadiumLat"
      :stadium-lng="stadiumLng"
      :stadium-name="stadiumName"
      :stadium-photo="stadiumPhoto"
    />
  </section>
</template>

<script>
// import AppButton from '@/components/AppButton'
import StadiumInfoLanding from '@/components/widgets/landing/StadiumInfoLanding'
// import StadiumEditForm from '@/components/widgets/profile-stadium/StadiumEditForm'
// import unitPage from '@/services/mixins/unitPage'

export default {
  name: 'TeamStadium',

  components: {
    // AppButton,
    StadiumInfoLanding
    // StadiumEditForm
  },

  // mixins: [unitPage],

  props: {
    unitId: {
      type: String,
      required: true
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
    stadiumCapacity: {
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
  },

  data: () => {
    return {
      isEditing: false
    }
  },

  computed: {
    canEditStadium() {
      return this.isTeam()
    }
  },

  methods: {
    showEditForm() {
      this.isEditing = true
    },

    hideEditForm() {
      this.isEditing = false
    },

    refreshData() {
      setTimeout(() => {
        this.$refs.stadiumInfo.refreshStadiumData()
      }, 500)
    }
  }
}
</script>

<style lang="postcss" scoped>
.team__profile__stadium {
  @apply .pt-10 .pb-10;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
}

@media (max-width: 768px) {
  .team__profile__stadium {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile__stadium {
    @apply pr-5;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
