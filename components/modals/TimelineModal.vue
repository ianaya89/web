<template>
  <modal ref="modal">
    <template v-slot:header>
      <div class="border-b border-grey-l4 pb-2">
        {{ $t('app.team.timeline_edit.heading') }}
      </div>
      <span class="absolute top-8 right-8 lni-close text-red hover:text-red-d1 cursor-pointer" @click="close" />
    </template>
    <template v-slot:body>
      <div class="border-b border-grey-l4 pb-6">
        <v-form class="w-full">
          <app-select
            v-model="input.season"
            :required="true"
            :single-line="true"
            :items="seasons"
            :solo-label="$t('app.team.league_position_edit.season_label')"
            :error-messages="validationErrors['input.season'] || []"
          />

          <app-input
            v-model="input.title"
            :required="true"
            :single-line="true"
            :label="$t('app.team.timeline_edit.title_label')"
            :error-messages="validationErrors['input.title'] || []"
          />

          <app-input
            v-model="input.description"
            :required="true"
            :single-line="true"
            :label="$t('app.team.timeline_edit.description_label')"
            :error-messages="validationErrors['input.description'] || []"
          />
        </v-form>
      </div>
    </template>
    <template v-slot:footer>
      <div class="mt-8">
        <app-button ref="submitBtn" :title="$t('general.save')" :disabled="loading" @clicked="save()" />
        <app-button :btn-class="'light'" :show-arrow="true" :title="$t('general.cancel')" @clicked="close" />
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'
import AppSelect from '@/components/AppSelect'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import { UpdateMilestoneMutation } from '@/services/graphql'

export default {
  name: 'TimelineModal',

  components: {
    Modal,
    AppSelect,
    AppButton,
    AppInput
  },

  props: {
    unitId: {
      type: String,
      required: true
    },

    input: {
      type: Object,
      required: true
    },

    seasons: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      loading: false,
      validationErrors: {}
    }
  },

  methods: {
    open() {
      this.loading = false
      this.validationErrors = {}
      this.$refs.modal.open()
    },

    close() {
      this.loading = false
      this.validationErrors = {}
      this.$refs.modal.close()
    },

    save() {
      this.loading = true
      this.validationErrors = []
      this.$apollo
        .mutate({
          ...UpdateMilestoneMutation,
          variables: {
            organizationUnitId: this.unitId,
            leagueTeamId: parseInt(this.input.id),
            id: this.input.id,
            input: {
              season: this.input.season
                ? { connect: parseInt(this.input.season) }
                : null,
              title: this.input.title ? this.input.title : null,
              description: this.input.description
                ? this.input.description
                : null
            }
          }
        })
        .then(() => {
          this.$toast.success(this.$t('app.team.fans.success'))
          this.loading = false
          if (this.$parent && this.$parent.refreshData) {
            this.$parent.refreshData()
          }
          this.close()
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
            this.$toast.error(this.$t('app.team.fans.error'))
          }
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
</style>
