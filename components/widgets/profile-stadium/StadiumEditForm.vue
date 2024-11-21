<template>
  <div class="w-full">
    <div class="w-full mb-10">
      <h3>{{ $t('app.profile.stadium.editForm.heading') }}</h3>
    </div>

    <div class="w-full mb-10">
      <div class="w-full flex flex-wrap">
        <div class="w-1/2 pr-2">
          <app-input
            v-model="data.capacity"
            :outline="true"
            :solo-label="$t('app.profile.stadium.editForm.capacity')"
            :label="null"
            :required="true"
            :error-messages="validationErrors['input.capacity'] || []"
          />

          <app-input
            v-model="data.visitorsTotal"
            :outline="true"
            :solo-label="$t('app.profile.stadium.editForm.visitorsTotal')"
            :label="null"
            :required="true"
            :error-messages="validationErrors['input.visitorsTotal'] || []"
          />

          <app-input
            v-model="data.skyboxes"
            :outline="true"
            :solo-label="$t('app.profile.stadium.editForm.skyboxes')"
            :label="null"
            :required="true"
            :error-messages="validationErrors['input.skyboxes'] || []"
          />
        </div>

        <div class="w-1/2 pl-2">
          <app-input
            v-model="data.visitorsPerMatch"
            :outline="true"
            :solo-label="$t('app.profile.stadium.editForm.visitorsPerMatch')"
            :label="null"
            :required="true"
            :error-messages="validationErrors['input.visitorsPerMatch'] || []"
          />

          <app-input
            v-model="data.businessSeats"
            :outline="true"
            :solo-label="$t('app.profile.stadium.editForm.businessSeats')"
            :label="null"
            :required="true"
            :error-messages="validationErrors['input.businessSeats'] || []"
          />
        </div>
        <single-upload
          class="w-full border border-dashed border-grey-l3 p-4 h-48"
          :status-placeholder-classes="'bg-grey-l5'"
          :default-file-url="data.photo"
          :extensions="['jpg', 'jpeg', 'gif', 'png']"
          :info-text="$t('app.inventory.items.form.upload.info')"
          :btn-text="$t('app.inventory.items.form.upload.button')"
          :size="5"
          :param-name="'image'"
          :upload-url="'/upload/image'"
          :upload-classes="''"
          @file-uploaded="uploadedLogo = $get($event, 'url', null)"
        />
      </div>
    </div>

    <div class="w-full">
      <div class="w-full flex flex-wrap md:pr-32">
        <app-button
          class="mr-2"
          :title="$t('general.save')"
          :btn-class="'primary'"
          :loader="loading"
          :disabled="loading"
          :loading-text="''"
          @clicked="onSaveButtonClick()"
        />
        <app-button
          :title="$t('general.cancel')"
          :btn-class="'secondary'"
          @clicked="onCancelButtonClick()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { StadiumInfoQuery, UpdateTeamStadiumMutation } from '@/services/graphql'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import SingleUpload from '@/components/SingleUpload'

export default {
  name: 'StadiumEditForm',

  components: {
    AppButton,
    AppInput,
    SingleUpload
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      data: {
        capacity: null,
        visitorsTotal: null,
        skyboxes: null,
        visitorsPerMatch: null,
        businessSeats: null,
        photo: null
      },
      loading: false,
      validationErrors: {},
      uploadedLogo: null
    }
  },

  apollo: {
    unit: {
      ...StadiumInfoQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name,
          prevseason: this.previousSeason.name
        }
      },
      result({ data }) {
        const stadium = this.$get(data, 'unit.entity.teamStadiums.0.stadium')
        const metadata = this.$get(data, 'unit.entity.teamStadiums.0.metaData')

        this.data.capacity = this.$get(stadium, 'precalcs.0.data.capacity')
        this.data.visitorsTotal = this.$get(metadata, 'visitorsTotal')
        this.data.skyboxes = this.$get(stadium, 'precalcs.0.data.skyboxes')
        this.data.visitorsPerMatch = this.$get(metadata, 'visitorsPerMatch')
        this.data.businessSeats = this.$get(
          stadium,
          'precalcs.0.data.businessSeats'
        )
        this.data.photo = this.$get(stadium, 'photo.url')
      }
    }
  },

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason',
      previousSeason: 'active/getLastSeason'
    })
  },

  methods: {
    onSaveButtonClick() {
      this.validationErrors = []
      this.loading = true

      this.$apollo
        .mutate({
          ...UpdateTeamStadiumMutation,
          variables: {
            organizationUnitId: this.unitId,
            seasonId: this.activeSeason.id,
            input: {
              capacity: this.data.capacity,
              visitorsTotal: this.data.visitorsTotal,
              skyboxes: this.data.skyboxes,
              visitorsPerMatch: this.data.visitorsPerMatch,
              businessSeats: this.data.businessSeats,
              photo: {
                url: this.uploadedLogo
              }
            }
          }
        })
        .then(() => {
          this.loading = false
          this.$toast.success(this.$t('app.profile.stadium.editForm.success'))
          this.$parent.refreshData()
          this.$parent.hideEditForm()
        })
        .catch(({ graphQLErrors }) => {
          if (graphQLErrors && graphQLErrors.length > 0) {
            const error = graphQLErrors[0]
            const validationErrors = error.extensions.errors
            if (validationErrors) {
              this.validationErrors = validationErrors
            }
            this.$toast.error(this.$t(error.message))
          } else {
            this.$toast.error(this.$t('app.profile.stadium.editForm.error'))
          }
          this.loading = false
        })
    },

    onCancelButtonClick() {
      this.$parent.hideEditForm()
    }
  }
}
</script>

<style scoped>
</style>
