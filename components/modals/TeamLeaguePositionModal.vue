<template>
  <modal ref="modal">
    <template v-slot:header>
      <div class="border-b border-grey-l4 pb-2">
        {{ $t('app.team.league_position_edit.heading') }}
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

          <app-select
            v-model="input.league"
            :required="true"
            :single-line="true"
            :items="leagues"
            :solo-label="$t('app.team.league_position_edit.league_label')"
            :error-messages="validationErrors['input.league'] || []"
          />

          <app-input
            v-model="input.position"
            :type="'number'"
            :required="true"
            :outline="true"
            :label="null"
            :solo-label="$t('app.team.league_position_edit.position_label')"
            :error-messages="validationErrors['input.position'] || []"
          />
        </v-form>
      </div>
    </template>
    <template v-slot:footer>
      <div class="mt-8">
        <app-button ref="submitBtn" :title="$t('general.save')" :disabled="loading" @clicked="save" />
        <app-button :btn-class="'light'" :show-arrow="true" :title="$t('general.cancel')" @clicked="close" />
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import { UpdateTeamLeaguePositionMutation } from '@/services/graphql'

export default {
  name: 'TeamLeaguePositionModal',

  components: {
    Modal,
    AppButton,
    AppInput,
    AppSelect
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
    },

    leagues: {
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
          ...UpdateTeamLeaguePositionMutation,
          variables: {
            organizationUnitId: this.unitId,
            leagueTeamId: parseInt(this.input.id),
            input: {
              season: this.input.season ? parseInt(this.input.season) : null,
              league: this.input.league ? parseInt(this.input.league) : null,
              position: this.input.position
                ? parseInt(this.input.position)
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
