<template>
  <section class="team__profile__stadium">
    <div class="flex justify-end">
      <app-button
        v-if="!isEditing && canEditStadium"
        :title="$t('app.profile.stadium.editButton')"
        btn-class="link"
        icon="lni-pencil"
        class="mb-4"
        @clicked="isEditing = true"
      />
    </div>

    <stadium-edit-form v-if="isEditing" :unit-id="unitId" />

    <stadium-info v-else ref="stadiumInfo" :unit-id="unitId" />
  </section>
</template>

<script>
import AppButton from '@/components/AppButton'
import StadiumInfo from '@/components/widgets/profile-stadium/StadiumInfo'
import StadiumEditForm from '@/components/widgets/profile-stadium/StadiumEditForm'
import unitPage from '@/services/mixins/unitPage'

export default {
  name: 'TeamStadium',

  components: {
    AppButton,
    StadiumInfo,
    StadiumEditForm
  },

  mixins: [unitPage],

  props: {
    unitId: {
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
