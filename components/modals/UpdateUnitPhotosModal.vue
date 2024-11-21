<template>
  <modal ref="modal">
    <template v-slot:header>
      <div class="border-b border-grey-l4 pb-2">
        {{ $t('app.update_unit_photos_modal.heading') }}
      </div>
      <span class="absolute top-8 right-8 lni-close text-red hover:text-red-d1 cursor-pointer" @click="$refs.modal.close()" />
    </template>
    <template v-slot:body>
      <div class="border-b border-grey-l4 pb-6">
        <v-form ref="editForm" class="w-full">
          <div class="w-full flex">
            <div class="w-1/2 pr-1">
              <h6>
                {{ $t('app.profile.settings.your_title_photo') }}<span class="required-sign" />
              </h6>
              <single-upload
                class="w-full border border-dashed border-grey-l3 p-4 h-48"
                :status-placeholder-classes="'bg-grey-l5'"
                :default-file-url="$get(unit, 'entity.titlePhotos.0.url', null)"
                :extensions="['jpg', 'jpeg', 'gif', 'png']"
                :info-text="$t('app.inventory.items.form.upload.info')"
                :btn-text="$t('app.inventory.items.form.upload.button')"
                :size="5"
                :param-name="'image'"
                :upload-url="'/upload/image'"
                :upload-classes="''"
                @file-uploaded="uploadedTitlePhoto = $get($event, 'url', null)"
              />
            </div>
            <div class="w-1/2 pl-1">
              <h6>
                {{ $t('app.profile.settings.your_logo') }}<span class="required-sign" />
              </h6>
              <single-upload
                class="w-full border border-dashed border-grey-l3 p-4 h-48"
                :status-placeholder-classes="'bg-grey-l5'"
                :default-file-url="$get(unit, 'entity.logo.url', null)"
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
          <div v-if="loading" class="mt-8">
            <i class="fa fa-fw fa-spin fa-spinner" /> {{ $t('general.updating') }}...
          </div>
        </v-form>
      </div>
    </template>
    <template v-slot:footer>
      <div class="mt-8">
        <app-button :btn-class="'light'" :show-arrow="true" :title="$t('general.close')" @clicked="$refs.modal.close()" />
      </div>
    </template>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'
import {
  ActiveUnitQuery,
  BRAND_HEADER_QUERY,
  UNIT_HEADER_QUERY,
  UpdateUnitLogoMutation,
  UpdateUnitTitlePhotoMutation
} from '@/services/graphql'
import SingleUpload from '@/components/SingleUpload'

export default {
  name: 'UpdateUnitPhotosModal',

  components: {
    Modal,
    AppButton,
    SingleUpload
  },

  apollo: {
    unit: {
      ...ActiveUnitQuery(function() {
        return { id: this.activeUnitID }
      }),
      skip() {
        return this.activeUnitID == null
      }
    }
  },

  data: () => ({
    loading: false,
    uploadedTitlePhoto: null,
    uploadedLogo: null
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason',
      activeUnitID: 'active/unitID',
      isBrandActive: 'active/isBrandActive'
    })
  },

  watch: {
    uploadedTitlePhoto(newVal) {
      if (typeof newVal === 'string') {
        this.uploadPhoto('title_photo')
      }
    },

    uploadedLogo(newVal) {
      if (typeof newVal === 'string') {
        this.uploadPhoto('logo')
      }
    }
  },

  methods: {
    open() {
      this.$refs.modal.open()
    },

    close() {
      this.$refs.modal.close()
    },

    async uploadPhoto(type) {
      let mutation = null
      let photoUrl = null
      if (type === 'title_photo') {
        mutation = UpdateUnitTitlePhotoMutation
        photoUrl = this.uploadedTitlePhoto
      } else if (type === 'logo') {
        mutation = UpdateUnitLogoMutation
        photoUrl = this.uploadedLogo
      }

      const refetchQuery = this.isBrandActive
        ? BRAND_HEADER_QUERY
        : UNIT_HEADER_QUERY

      this.loading = true
      try {
        await this.$apollo
          .mutate({
            ...mutation,
            variables: {
              id: this.activeUnitID,
              input: {
                photo: {
                  url: photoUrl
                }
              }
            },
            refetchQueries: [
              {
                query: refetchQuery,
                variables: {
                  id: this.activeUnitID,
                  season: this.activeSeason.name
                }
              }
            ]
          })
          .then(() => {
            this.$toast.success(
              this.$t('app.brand.settings.profile.picture_messages.success')
            )
            this.loading = false
          })
      } catch {
        this.$toast.error(
          this.$t('app.brand.settings.profile.picture_messages.error')
        )
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
</style>
