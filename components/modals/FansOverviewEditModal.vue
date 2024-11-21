<template>
  <modal ref="modal" :modal-size-classes="'min-h-screen sm:min-h-auto max-w-sm bg-white'">
    <template v-slot:header>
      {{ $t('app.profile.team.fans.editFans') }}
      <div class="absolute top-0 right-0 text-menu">
        <app-button
          :title="''"
          class="py-4 px-2"
          btn-class="link"
          icon="lni-close"
          data-cy="close"
          @clicked="close()"
        />
      </div>
    </template>
    <template v-slot:body>
      <div class="w-full">
        <app-input
          v-model="input.seasonTicket"
          :label="$t(`app.profile.team.fans.seasonTicketCount`)"
          :required="true"
          :error-messages="validationErrors['input.seasonTicket'] || []"
        />
      </div>

      <div class="w-full">
        <app-input
          v-model="input.members"
          :label="$t(`app.profile.team.fans.membersCount`)"
          :required="true"
          :error-messages="validationErrors['input.members'] || []"
        />
      </div>

      <div class="w-full">
        <app-input
          v-model="input.newsletter"
          :label="$t(`app.profile.team.fans.newsletterCount`)"
          :required="true"
          :error-messages="validationErrors['input.newsletter'] || []"
        />
      </div>

      <div class="w-full">
        <app-input
          v-model="input.crm"
          :label="$t(`app.profile.team.fans.crmCount`)"
          :required="true"
          :error-messages="validationErrors['input.crm'] || []"
        />
      </div>

      <div class="w-full">
        <app-input
          v-model="input.mobileApp"
          :label="$t(`app.profile.team.fans.mobileAppCount`)"
          :required="true"
          :error-messages="validationErrors['input.mobileApp'] || []"
        />
      </div>
    </template>
    <template v-slot:footer>
      <div class="w-full">
        <div class="w-full flex mt-4">
          <div class="w-1/2 pr-2">
            <app-button
              class="w-full"
              data-cy="cancel"
              :title="$t('general.cancel')"
              :btn-class="'secondary'"
              @clicked="close()"
            />
          </div>
          <div class="w-1/2 pl-2">
            <app-button
              class="w-full"
              :title="$t('general.save')"
              :btn-class="'primary'"
              :disabled="loading"
              @clicked="save()"
            />
          </div>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import { UpdateTeamFansMutation } from '@/services/graphql'

export default {
  name: 'FansOverviewEditModal',

  components: {
    Modal,
    AppButton,
    AppInput
  },

  props: {
    seasonId: {
      type: Number,
      default: null
    },

    unitId: {
      type: String,
      default: null
    },

    input: {
      type: Object,
      default() {
        return {}
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
      this.$refs.modal.open()
    },

    close() {
      this.$refs.modal.close()
    },

    save() {
      this.validationErrors = []
      this.loading = true

      this.$apollo
        .mutate({
          ...UpdateTeamFansMutation,
          variables: {
            organizationUnitId: this.unitId,
            seasonId: this.seasonId,
            input: {
              seasonTicket: this.input.seasonTicket
                ? parseInt(this.input.seasonTicket)
                : null,
              members: this.input.members ? parseInt(this.input.members) : null,
              newsletter: this.input.newsletter
                ? parseInt(this.input.newsletter)
                : null,
              crm: this.input.crm ? parseInt(this.input.crm) : null,
              mobileApp: this.input.mobileApp
                ? parseInt(this.input.mobileApp)
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
