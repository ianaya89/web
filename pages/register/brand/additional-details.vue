<template>
  <section class="page--login min-h-screen flex flex-wrap px-0 lg:px-10 pb-10 lg:py-6">
    <div
      class="mb-16 sm:mb-0 px-8 xl:px-12 w-full h-24 flex sm:flex-wrap justify-between items-center shadow sm:shadow-none border-b border-transparent"
    >
      <div class="block lg:hidden">
        <logo />
      </div>
      <div class="pl-4">
        <nuxt-link :to="localePath({name : 'register'})">
          {{ $t('app.register.to_previous_step') }}
        </nuxt-link>
      </div>
    </div>

    <div class="w-full lg:w-2/3 px-8 sm:px-12 mx-auto">
      <!--      eslint-disable-next-line-->
      <h1 class="uppercase text-h2 leading-none" v-html="$t('app.register.brand.2-step.title')"/>
      <h5>{{ $t('app.register.brand.2-step.info') }}</h5>

      <v-form
        ref="registerForm"
        v-model="formValid"
        class="mt-8"
        action="https://vuejs.org/"
        method="post"
      >
        <div class="w-full flex flex-wrap mt-4">
          <app-select
            v-model="city"
            class="w-full sm:w-1/2 pr-1"
            data-cy="type"
            :required="true"
            :items="cityItems"
            :rules="cityRules"
            :hide-details="false"
            :solo-label="$t('general.city')"
          />
        </div>

        <!--        <div class="w-full flex flex-wrap">-->
        <!--          <div class="w-1/2 pr-1">-->
        <!--            <multiselect-->
        <!--              v-model="preferredCountries"-->
        <!--              :items="countriesItems"-->
        <!--              :solo-label="$t('app.register.preferred_countries.info')"-->
        <!--            />-->
        <!--          </div>-->
        <!--          <div class="w-1/2 pl-1">-->
        <!--            <multiselect-->
        <!--              v-model="preferredLanguages"-->
        <!--              :items="languagesItems"-->
        <!--              :solo-label="$t('app.register.preferred_languages.info')"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->

        <hr>

        <div class="w-full flex flex-wrap mt-6">
          <div class="w-1/2 pr-1">
            <app-input
              v-model="newPassword"
              :solo-label="$t('app.register.password.label')"
              :label="null"
              data-cy="new-pass"
              :browser-autocomplete="'new-password'"
              :password-switch="true"
              :required="true"
              :outline="true"
              :rules="[
                v => !!v || $t('app.register.password.validation.required'),
                v => passwordStrength >= 75 || $t('app.register.password.validation.strength')
              ]"
              appended-icon="fa fa-eye"
              appended-icon2="fa fa-eye-slash"
              type="password"
            />
          </div>
          <div class="w-1/2 pl-1">
            <app-input
              v-model="newPasswordConfirmation"
              :solo-label="$t('app.register.password_again.label')"
              :label="null"
              :browser-autocomplete="'new-password'"
              :required="true"
              :outline="true"
              data-cy="new-pass-conf"
              :rules="[
                v => !!v || $t('app.register.password_again.validation.required'),
                v => v === newPassword || $t('app.register.password_again.validation.confirmed')
              ]"
              type="password"
            />
          </div>
        </div>

        <div class="w-full" data-cy="pass-strength">
          <p class="text-grey font-medium">
            {{ $t('app.reset.strength.title') }}
          </p>
          <progress-bar
            v-model="passwordStrength"
            class="-mt-1"
            :buffer-value="100"
            :color="passwordStrengthColor"
          />
          <p class="text-grey">
            {{ $t('app.reset.strength.hint') }}
          </p>
        </div>

        <animated-button
          ref="registerButton"
          type="submit"
          data-cy="register"
          :btn-class="'primary-lg'"
          class="w-full sm:w-auto mt-6 mb-10"
          :should-disable="true"
          :loader="true"
          :title="$t('app.register.continue')"
          :show-arrow="true"
          @clicked="checkForm"
        />
      </v-form>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import AnimatedButton from '@/components/AnimatedButton'
import Logo from '@/components/Logo'
import {
  CountriesQuery,
  CountryByName,
  LanguagesQuery,
  PrepareBrandRegister
} from '@/services/graphql'
import AppSelect from '@/components/AppSelect'
import alreadyAuthenticated from '@/services/mixins/alreadyAuthenticated'
import AppInput from '@/components/AppInput'
import ProgressBar from '@/components/ProgressBar'
import {
  calculatePassStrength,
  addLocalizedCountryName
} from '@/services/helpers'

export default {
  layout: 'auth',

  name: 'AdditionalDetails',

  components: {
    AnimatedButton,
    AppSelect,
    Logo,
    // Multiselect,
    AppInput,
    ProgressBar
  },

  apollo: {
    countryByName: {
      ...CountryByName,
      variables() {
        return {
          name: this.countryName
        }
      },
      skip() {
        return this.countryName == null
      }
    },
    countries: {
      ...CountriesQuery,
      update(data) {
        data.countries.map(addLocalizedCountryName.bind(this))
        return data.countries
      }
    },
    languages: LanguagesQuery
  },

  mixins: [alreadyAuthenticated],

  data: () => ({
    city: null,
    formValid: false,
    logo: null,
    titlePhoto: null,
    preferredCountries: [],
    preferredLanguages: [],
    countries: [],
    languages: [],
    newPassword: null,
    newPasswordConfirmation: null
  }),

  computed: {
    ...mapGetters({
      registrationEntity: 'register/getEntity'
    }),

    passwordStrength() {
      return calculatePassStrength(this.newPassword)
    },

    passwordStrengthColor() {
      if (this.passwordStrength < 75) {
        return 'red'
      } else {
        return 'green'
      }
    },

    countryName() {
      return this.$get(this.registrationEntity, 'countryName', null)
    },

    cityRules() {
      return [v => !!v || this.$t('app.register.city.validation.required')]
    },

    cityItems() {
      return this.$get(this.countryByName, 'cities', []).map(item => {
        return { text: item.name, value: item.id }
      })
    },

    countriesItems() {
      return this.countries.map(item => {
        return { text: item.localizedName, value: item.id }
      })
    },

    languagesItems() {
      return this.languages.map(item => {
        return { text: item.name, value: item.id }
      })
    }
  },

  async mounted() {
    const entity = this.$store.getters['register/getEntity']
    if (this.$get(entity, 'email', null) === null) {
      this.$router.push(
        this.localePath({
          name: 'register'
        })
      )
    }
    await this.$recaptcha.init()
    this.city = this.$get(this.registrationEntity, 'city', null)
  },

  methods: {
    handleRecaptchaFailure(response) {
      if (this.$get(response, 'data.recaptcha.status') === 'error') {
        this.$get(response, 'data.recaptcha.errors', []).forEach(error => {
          this.$toast.error(this.$t('errors.recaptcha.' + error))
        })
        this.$refs.registerButton.loaded()
        return false
      }
      return true
    },

    async checkForm() {
      if (this.$refs.registerForm.validate()) {
        try {
          await this.$recaptcha
            .execute('register_additional_details')
            .then(token => {
              this.$apollo
                .mutate({
                  ...PrepareBrandRegister,
                  variables: {
                    input: {
                      email: this.$get(this.registrationEntity, 'email', null),
                      recaptchaToken: token,
                      password: this.newPassword,
                      country: this.countryByName.id,
                      organizationName: this.$get(
                        this.registrationEntity,
                        'organizationName',
                        null
                      ),
                      firstName: this.$get(
                        this.registrationEntity,
                        'firstName',
                        null
                      ),
                      lastName: this.$get(
                        this.registrationEntity,
                        'lastName',
                        null
                      )
                    }
                  }
                })
                .then(response => {
                  if (!this.handleRecaptchaFailure(response)) {
                    return
                  }
                  const { data } = response
                  if (data.prepareRegisterBrand) {
                    this.$store.dispatch(
                      'register/set',
                      Object.assign(cloneDeep(this.registrationEntity), {
                        id: data.prepareRegisterBrand.userID,
                        city: this.city,
                        country: this.countryByName.id,
                        password: this.newPassword
                      })
                    )
                    this.$store.dispatch(
                      'register/setStripeClientToken',
                      data.prepareRegisterBrand.stripeClientToken
                    )

                    this.$router.push(
                      this.localePath({
                        name: 'register-payment-details'
                      })
                    )
                  }
                })
            })
        } catch (error) {
          if (this.isDevEnv) {
            this.$toast.error(error.message || this.$t('errors.reset-error'))
            // eslint-disable-next-line no-console
            console.error(error.message)
          }
          this.$refs.registerButton.loaded()
        }
      } else {
        this.$nextTick(() => {
          this.$refs.registerButton.loaded()
        })
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
