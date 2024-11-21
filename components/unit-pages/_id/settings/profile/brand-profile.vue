<template>
  <section class="brand__settings__profile">
    <v-form
      ref="profileForm"
      v-model="formValid"
      class="w-full"
    >
      <div class="w-full flex flex-wrap mt-8">
        <div class="w-full sm:w-1/2 pr-3 sm:pr-12 flex">
          <single-upload
            ref="upload"
            class="w-24 h-24 bg-white"
            :status-placeholder-classes="'bg-grey-l5'"
            :default-file-url="$get(me, 'profile.photo.url', null)"
            :extensions="extensions"
            :show-reupload="false"
            :info-text="null"
            :btn-text="$t('app.team.settings.profile.change_picture')"
            :hide-restriction="true"
            :size="size"
            :param-name="'image'"
            :upload-url="'/upload/image'"
            :upload-classes="''"
            @file-uploaded="uploadedPhoto = $get($event, 'url', null)"
          >
            <template v-slot:selection-initiator>
              <span class="" />
            </template>
          </single-upload>
          <div class="ml-4">
            <h6>
              {{ $t('app.team.settings.profile.your_profile_photo') }}
            </h6>
            <p class="font-serif text-grey mt-1 text-p3">
              {{ restrictionText }}
            </p>
            <app-button class="mt-1" data-cy="change-picture-btn" :title="$t('app.team.settings.profile.change_picture')" :btn-class="'link'" @clicked="$refs.upload.startSelection()" />
          </div>
        </div>
        <div class="w-full sm:w-1/2 pr-3 sm:pr-12 flex mt-8 sm:mt-0">
          <div class="w-24 h-24">
            <avatar :classes="'w-24 h-24'" :rounded="false" :src="$get(unit, 'entity.logo.url')" />
          </div>
          <div class="w-full flex flex-col ml-4">
            <data-label :label="$t('app.brand.settings.profile.your_brand_account')">
              {{ $get(unit, 'entity.name') }}
            </data-label>
            <app-button class="text-left pt-4" data-cy="go-to-profile" :title="$t('app.brand.settings.profile.go_to_brand_profile')" :btn-class="'link'" @clicked="goToUnitProfile()" />
          </div>
        </div>
        <div class="w-full sm:w-1/2 pr-3 sm:pr-12">
          <app-input
            v-model="me.profile.firstName"
            data-cy="first-name"
            :rules="[v => !!v || $t('app.register.firstName.validation.required')]"
            :label="$t('app.brand.settings.profile.first_name')"
            :required="true"
          />
        </div>
        <div class="w-full sm:w-1/2 pr-3 sm:pr-12">
          <app-input
            v-model="me.profile.lastName"
            data-cy="last-name"
            :rules="[v => !!v || $t('app.register.lastName.validation.required')]"
            :label="$t('app.brand.settings.profile.last_name')"
            :required="true"
          />
        </div>
        <div class="w-full sm:w-1/2 pr-3 sm:pr-12">
          <app-input
            v-model="me.email"
            data-cy="email"
            :rules="[v => !!v || $t('app.register.email.validation.required'),
                     v => /^.+@.+\..+$/.test(v) || $t('app.register.email.validation.valid')]"
            :label="$t('app.brand.settings.profile.email')"
            :required="true"
          />
        </div>
        <!--      <div class="w-full sm:w-1/2 pr-3 sm:pr-12">-->
        <!--        <app-input :label="$t('app.brand.settings.profile.job')" />-->
        <!--      </div>-->
        <div class="w-full sm:w-1/2 pr-3 sm:pr-12">
          <app-input
            v-model="me.profile.phoneNumber"
            data-cy="phone-number"
            :rules="[v => !!v || $t('app.register.phone.validation.required'),
                     v =>/^[0-9+ ]+$/.test(v) || $t('app.register.phone.validation.valid')]"
            :label="$t('app.brand.settings.profile.phone')"
            :required="true"
          />
        </div>
      </div>
    </v-form>
    <div class="w-full mt-6">
      <app-button
        ref="saveButton"
        data-cy="save-btn"
        :title="$t('general.save')"
        :loader="updating"
        :disabled="updating"
        :loading-text="$t('general.updating')"
        class="w-full sm:w-auto"
        @clicked="save"
      />
    </div>
  </section>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import {
  BrandSettingsQuery,
  MeQuery,
  UserUpdateMutation
} from '@/services/graphql'
import Avatar from '@/components/Avatar'
import DataLabel from '@/components/DataLabel'
import SingleUpload from '@/components/SingleUpload'

export default {
  name: 'BrandProfile',

  components: {
    DataLabel,
    Avatar,
    SingleUpload,
    AppButton,
    AppInput
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    me: {
      ...MeQuery,
      result() {
        this.uploadedPhoto = {}
      }
    },
    unit: {
      ...BrandSettingsQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  data: () => ({
    extensions: ['jpg', 'jpeg', 'gif', 'png'],
    size: 5,
    me: MeQuery.mock,
    newPhoto: null,
    uploadedPhoto: null,
    updating: false,
    formValid: false
  }),

  computed: {
    restrictionText() {
      if (this.extensions.length > 1) {
        return (
          this.extensions
            .slice(0, -1)
            .join(', ')
            .toLowerCase() +
          ' ' +
          this.$t('general.or') +
          ' ' +
          this.extensions
            .slice(-1)
            .join()
            .toLowerCase() +
          ' max. ' +
          this.size +
          ' MB'
        )
      } else {
        return (
          this.$t('general.supported_format') +
          ': ' +
          this.extensions[0].toUpperCase() +
          ' max. ' +
          this.size +
          ' MB'
        )
      }
    }
  },

  watch: {
    uploadedPhoto(newVal) {
      if (typeof newVal === 'string') {
        this.uploadPhoto()
      }
    }
  },

  methods: {
    async save() {
      if (!this.$refs.profileForm.validate()) {
        return
      }
      try {
        this.updating = true
        await this.$apollo
          .mutate({
            ...UserUpdateMutation,
            variables: {
              id: this.me.id,
              input: {
                firstName: this.me.profile.firstName,
                lastName: this.me.profile.lastName,
                email: this.me.email,
                phoneNumber: this.me.profile.phoneNumber
              }
            },
            refetchQueries: [MeQuery]
          })
          .then(() => {
            this.$toast.success(
              this.$t('app.brand.settings.profile.messages.success')
            )
            this.updating = false
          })
      } catch (err) {
        this.$toast.error(this.$t('app.brand.settings.profile.messages.error'))
        this.updating = false
      }
    },

    async uploadPhoto() {
      try {
        await this.$apollo
          .mutate({
            ...UserUpdateMutation,
            variables: {
              id: this.me.id,
              input: {
                photo: {
                  url: this.uploadedPhoto
                }
              }
            },
            refetchQueries: [MeQuery]
          })
          .then(() => {
            this.$toast.success(
              this.$t('app.brand.settings.profile.picture_messages.success')
            )
          })
      } catch {
        this.$toast.error(
          this.$t('app.brand.settings.profile.picture_messages.error')
        )
      }
    },

    goToUnitProfile() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-profile-targeting',
          params: {
            id: this.unitId
          }
        })
      )
    }
  }
}
</script>

<style lang="postcss">
</style>
