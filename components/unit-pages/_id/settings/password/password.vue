<template>
  <section class="team__settings__profile">
    <v-form
      ref="profileForm"
      v-model="formValid"
      class="w-full"
    >
      <div class="w-full flex flex-wrap mt-8">
        <div class="w-full sm:w-1/2 mr-3 sm:mr-12 sm:pr-12">
          <app-input
            v-model="input.currentPassword"
            :label="$t('app.team.settings.password.current')"
            :required="true"
            data-cy="old-pass"
            :rules="[
              v => !!v || $t('app.reset.password.validation.required')
            ]"
            :password-switch="true"
            appended-icon="fa fa-eye"
            appended-icon2="fa fa-eye-slash"
            :browser-autocomplete="'off'"
            type="password"
          />
          <p class="text-grey-l1 font-medium">
            {{ $t('app.team.settings.password.hint') }}
          </p>
        </div>

        <div class="w-full sm:w-1/2 pr-3 sm:pr-12">
          <app-input
            v-model="input.newPassword"
            :label="$t('app.team.settings.password.new')"
            data-cy="new-pass"
            :password-switch="true"
            :required="true"
            :rules="[
              v => !!v || $t('app.reset.password.validation.required'),
              v => passwordStrength >= 75 || $t('app.reset.password.validation.strength')
            ]"
            appended-icon="fa fa-eye"
            appended-icon2="fa fa-eye-slash"
            type="password"
          />
        </div>

        <div class="w-full sm:w-1/2 pr-3 sm:pr-12">
          <app-input
            v-model="input.newPasswordConfirmation"
            :label="$t('app.team.settings.password.new_confirmation')"
            :password-switch="true"
            data-cy="new-pass-conf"
            :rules="[
              v => !!v || $t('app.reset.password_again.validation.required'),
              v => v === input.newPassword ||$t('app.reset.password_again.validation.confirmed')
            ]"
            appended-icon="fa fa-eye"
            appended-icon2="fa fa-eye-slash"
            type="password"
          />
        </div>

        <div class="w-full sm:w-1/2 pr-3 sm:pr-12" data-cy="pass-strength">
          <p class="text-grey mt-12 font-medium">
            {{ $t('app.reset.strength.title') }}
          </p>
          <progress-bar v-model="passwordStrength" class="-mt-1" :buffer-value="100" :color="passwordStrengthColor" />
          <p class="text-grey">
            {{ $t('app.reset.strength.hint') }}
          </p>
        </div>
      </div>
    </v-form>
    <div class="w-full flex mt-8 -mx-0 sm:-mx-4">
      <div class="w-full px-0 sm:px-4">
        <div class="w-full">
          <app-button
            ref="saveButton"
            :title="$t('general.save')"
            :loader="updating"
            data-cy="save-btn"
            :loading-text="$t('general.updating')"
            :disabled="updating"
            class="w-full sm:w-auto"
            @clicked="save"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import { MeQuery, UserPasswordUpdateMutation } from '@/services/graphql'
import ProgressBar from '@/components/ProgressBar'
import { calculatePassStrength } from '@/services/helpers'

export default {
  name: 'Password',

  components: {
    AppButton,
    AppInput,
    ProgressBar
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    me: MeQuery
  },

  data: () => ({
    updating: false,
    formValid: false,
    input: {
      currentPassword: null,
      newPassword: null,
      newPasswordConfirmation: null
    }
  }),

  computed: {
    passwordStrength() {
      return calculatePassStrength(this.input.newPassword)
    },

    passwordStrengthColor() {
      if (this.passwordStrength < 75) {
        return 'red'
      } else {
        return 'green'
      }
    }
  },

  methods: {
    async save() {
      if (this.$refs.profileForm.validate()) {
        this.updating = true
        try {
          await this.$apollo
            .mutate({
              ...UserPasswordUpdateMutation,
              variables: {
                id: this.me.id,
                password: this.input.newPassword
              }
            })
            .then(() => {
              this.updating = false
              this.$toast.success(this.$t('success.general'))
            })
        } catch (err) {
          if (this.isDevEnv) {
            this.$toast.error(err.message || this.$t('errors.general'))
          } else {
            this.$toast.error(this.$t('errors.general'))
          }
          this.updating = false
        }
      }
    }
  }
}
</script>

<style lang="postcss">
</style>
