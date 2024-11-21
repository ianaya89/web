<template>
  <modal ref="modal">
    <template v-slot:header>
      <div class="border-b border-grey-l4 pb-2">
        {{ $t('app.team.heroes_edit.heading') }}
      </div>
      <span class="absolute top-8 right-8 lni-close text-red hover:text-red-d1 cursor-pointer" @click="close" />
    </template>
    <template v-slot:body>
      <div class="border-b border-grey-l4 pb-6">
        <v-form class="w-full">
          <app-input
            v-model="input.name"
            :required="true"
            :single-line="true"
            :label="$t('app.team.heroes_edit.name_label')"
            :error-messages="validationErrors['input.name'] || []"
          />

          <text-area
            v-model="input.description"
            :required="true"
            :single-line="true"
            :label="$t('app.team.timeline_edit.description_label')"
            :error-messages="validationErrors['input.description'] || []"
          />

          <div class="mt-6">
            <h6>
              {{ $t('app.team.heroes_edit.logo_label') }}<span class="required-sign" />
            </h6>
            <single-upload
              class="w-full border border-dashed border-grey-l3 p-4 h-48"
              :status-placeholder-classes="'bg-grey-l5'"
              :default-file-url="input.logo"
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
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import TextArea from '@/components/TextArea'
import { UpdateHeroMutation } from '@/services/graphql'
import SingleUpload from '@/components/SingleUpload'

export default {
  name: 'HeroesModal',

  components: {
    Modal,
    AppButton,
    AppInput,
    TextArea,
    SingleUpload
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

    updatePhotosEnabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      validationErrors: {},
      uploadedLogo: null
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
          ...UpdateHeroMutation,
          variables: {
            organizationUnitId: parseInt(this.unitId),
            id: parseInt(this.input.id),
            input: {
              photo: {
                url: this.uploadedLogo
              },
              name: this.input.name ? this.input.name : null,
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
