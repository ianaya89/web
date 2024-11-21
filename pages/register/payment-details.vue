<template>
  <section class="page--login min-h-screen flex flex-wrap px-0 lg:px-10 pb-10 lg:py-6">
    <div
      class="mb-16 sm:mb-0 px-8 xl:px-12 w-full h-24 flex sm:flex-wrap justify-between items-center shadow sm:shadow-none border-b border-transparent"
    >
      <div class="block lg:hidden">
        <logo />
      </div>
      <div class="pl-4">
        <nuxt-link
          :to="localePath({name : 'register-brand-additional-details'})"
        >
          {{ $t('app.register.to_previous_step') }}
        </nuxt-link>
      </div>
    </div>

    <div class="w-full lg:w-2/3 px-8 sm:px-12 mx-auto">
      <h1 class="text-4xl lg:text-h2 font-normal font-medium">
        {{ $t('app.register.payment-details.title') }}
      </h1>

      <div
        class="text-grey uppercase text-sm tracking-wide mt-8"
      >
        {{ $t('app.register.payment-details.plan') }}
      </div>
      <div class="w-full flex flex-wrap xl:flex-no-wrap">
        <div
          v-for="plan in availablePlans.filter(item => item.availableFor.includes(registrationEntity.type))"
          :key="plan.slug"
          class="available-plan w-full"
          :class="{'active' : selectedPlan === plan.stripePlan[registrationEntity.type]}"
          @click="selectedPlan = plan.stripePlan[registrationEntity.type]"
        >
          <h3>{{ plan.name[registrationEntity.type] }}</h3>
          <transition name="fade" mode="out-in">
            <div :key="!billSwitcher">
              <h2
                v-if="!billSwitcher"
                class="text-red text-h3 font-normal"
              >
                {{ plan.price.monthly | currency }}/{{ $t('general.month_shortcut') }}
              </h2>
              <h2
                v-else
                class="text-red text-2xl sm:text-h3 font-normal"
              >
                {{ plan.price.annualy | currency }}/{{ $t('general.year_shortcut') }}
              </h2>
            </div>
          </transition>
        </div>
      </div>
      <div class="w-full flex mt-4">
        <app-tooltip class="font-normal text-left" :position="'right'">
          <template v-slot:activator>
            <span class="fas fa-info-circle p-1" />
          </template>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="w-64" v-html="$t('pricing.annually')" />
        </app-tooltip>
        <switcher
          v-model="billSwitcher"
          data-cy="pay-switcher"
          :label="$t('public.bill.bill_annually')"
          class="text-black font-medium pr-3"
        />
      </div>

      <v-form
        ref="registerForm"
        v-model="formValid"
        class="mt-4"
        action="https://vuejs.org/"
        method="post"
      >
        <div class="w-full mb-6 mt-2 border-t pt-8">
          <label
            for="card-element"
            class="text-grey uppercase text-sm tracking-wide"
          >{{ $t('app.register.credit_card.label') }}</label>

          <div id="card-element" />

          <div id="card-errors" role="alert" class="text-red pb-2">
            {{ stripeError }}
          </div>

          <div v-if="walletPayAvailable" class="w-full text-center my-4">
            <span class="uppercase">{{ $t('general.or') }}</span>
          </div>

          <div id="payment-request-button" class="wallet-payment">
            <!-- A Stripe Element will be inserted here. -->
          </div>

          <div class="w-full mt-6">
            <img class="inline" :src="require('../../assets/images/visa.svg')" alt="Visa card logo">
            <img
              class="inline ml-4"
              :src="require('../../assets/images/mastercard.svg')"
              alt="Mastercard card logo"
            >
            <img
              class="inline ml-4"
              :src="require('../../assets/images/american-express.svg')"
              alt="American express card logo"
            >
          </div>
        </div>

        <animated-button
          ref="registerButton"
          type="submit"
          data-cy="register"
          :btn-class="'primary-lg'"
          class="w-full sm:w-auto mt-6 mb-10"
          :should-disable="true"
          :loader="true"
          :title="$t('app.register.submit')"
          :show-arrow="true"
          @clicked="checkForm"
        />
      </v-form>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="$t('app.register.payment-details.info')" />
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import AnimatedButton from '@/components/AnimatedButton'
import Logo from '@/components/Logo'
import { RecaptchaMutation, RegisterBrandMutation } from '@/services/graphql'
import alreadyAuthenticated from '@/services/mixins/alreadyAuthenticated'
import AppTooltip from '@/components/AppTooltip'
import Switcher from '@/components/Switcher'

export default {
  layout: 'auth',

  name: 'PaymentDetails',

  components: {
    AnimatedButton,
    Logo,
    AppTooltip,
    Switcher
  },

  mixins: [alreadyAuthenticated],

  data: () => ({
    formValid: false,
    card: null,
    cardValid: false,
    stripe: null,
    stripeError: '',
    walletPayAvailable: false,
    paymentMethodId: null,
    selectedPlan: null,
    billSwitcher: true
  }),

  computed: {
    ...mapGetters({
      registrationEntity: 'register/getEntity',
      stripeIntentSecret: 'register/getStripeClientToken'
    }),

    availablePlans() {
      return [
        {
          name: {
            team: this.$t('app.team.settings.subscriptions.plans.free'),
            brand: this.$t('app.brand.settings.subscriptions.plans.free.title')
          },
          availableFor: ['team', 'brand'],
          slug: 'free',
          stripePlan: {
            team: 'team-free',
            brand: 'brand-free'
          },
          price: {
            monthly: 0,
            annualy: 0
          }
        },
        {
          name: {
            team: this.$t('app.team.settings.subscriptions.plans.basic'),
            brand: this.$t('app.brand.settings.subscriptions.plans.basic')
          },
          availableFor: ['team', 'brand'],
          slug: 'basic',
          stripePlan: {
            team: 'team-basic',
            brand: 'brand-basic'
          },
          price: {
            monthly: 90,
            annualy: 900
          }
        }
      ]
    }
  },

  async mounted() {
    if (this.$store.getters['register/getStripeClientToken'] === null) {
      this.$router.push(
        this.localePath({
          name: 'register-brand-additional-details'
        })
      )
    }

    await this.$recaptcha.init()

    this.initStripe()
  },

  methods: {
    async checkForm() {
      if (!this.cardValid && this.paymentMethodId === null) {
        this.$nextTick(() => {
          this.$refs.registerButton.loaded()
        })
      }

      if (this.selectedPlan === null) {
        this.$toast.error(this.$t('errors.register.no_chosen_plan'))
        return
      }

      function goToPreviousStep() {
        this.$toast.error(this.$t('errors.general'))

        this.$router.push(
          this.localePath({
            name: 'register-brand-additional-details'
          })
        )
      }

      const token = await this.$recaptcha.execute('register_payment_details')
      const res = await this.$apollo.mutate({
        ...RecaptchaMutation,
        variables: {
          token: token
        }
      })

      if (this.$get(res, 'data.recaptcha.status') === 'error') {
        this.$get(res, 'data.recaptcha.errors', []).forEach(error => {
          this.$toast.error(this.$t('errors.recaptcha.' + error))
        })
        this.$refs.registerButton.loaded()
      } else {
        if (this.stripeIntentSecret == null) {
          goToPreviousStep.call(this)
        }

        if (this.paymentMethodId === null) {
          const { setupIntent, error } = await this.stripe.handleCardSetup(
            this.stripeIntentSecret,
            this.card,
            {}
          )
          if (error) {
            this.stripeError = error.message
            this.$toast.error(error.message)

            goToPreviousStep.call(this)
            return
          } else {
            this.paymentMethodId = setupIntent.payment_method
          }
        }

        try {
          await this.$apollo
            .mutate({
              ...RegisterBrandMutation,
              variables: {
                input: {
                  stripePaymentMethod: this.paymentMethodId,
                  user: this.$get(this.registrationEntity, 'id', null),
                  country: this.$get(this.registrationEntity, 'country', null),
                  city: this.$get(this.registrationEntity, 'city', null),
                  preferredCountries: this.$get(
                    this.registrationEntity,
                    'preferredCountries',
                    []
                  ),
                  preferredLanguages: this.$get(
                    this.registrationEntity,
                    'preferredLanguages',
                    []
                  ),
                  organizationName: this.$get(
                    this.registrationEntity,
                    'organizationName',
                    null
                  )
                }
              }
            })
            .then(({ data }) => {
              this.$store.dispatch('register/clear')
              this.$store.dispatch('register/clearStripeClientToken')
              this.$toast.success(
                this.$t('app.register.messages.confirm_email'),
                {
                  duration: 5000
                }
              )
              this.$router.push(this.localePath({ name: 'login' }))
            })
        } catch (error) {
          if (this.isDevEnv) {
            this.$toast.error(error.message || this.$t('errors.reset-error'))
            // eslint-disable-next-line no-console
            console.error(error.message)
          }

          this.$refs.registerButton.loaded()
          if (
            this.$get(error, 'graphQLErrors.0.extensions.category', null) !==
            'payment-incomplete'
          ) {
            this.$toast.error(this.$t('errors.general'))
          } else {
            this.$store.dispatch('register/clear')
            this.$store.dispatch('register/clearStripeClientToken')
            this.$toast.success(
              this.$t('app.register.messages.confirm_email_payment'),
              {
                duration: 6000
              }
            )
            this.$router.push(this.localePath({ name: 'login' }))
          }
        }
      }
    },

    initStripe() {
      this.stripe = this.$stripe.import()
      const paymentRequest = this.stripe.paymentRequest({
        country: 'SK',
        currency: 'eur',
        total: {
          label: this.$t('app.register.authorize_payment'),
          amount: 0
        },
        requestPayerName: true,
        requestPayerEmail: true
      })

      const elements = this.stripe.elements()
      const prButton = elements.create('paymentRequestButton', {
        paymentRequest: paymentRequest,
        style: {
          paymentRequestButton: {
            type: 'default',
            theme: 'light-outline',
            height: '4rem'
          }
        }
      })

      // Check the availability of the Payment Request API first.
      paymentRequest.canMakePayment().then(result => {
        if (result) {
          this.walletPayAvailable = true
          prButton.mount('#payment-request-button')

          paymentRequest.on('paymentmethod', ev => {
            this.paymentMethodId = ev.paymentMethod.id
            ev.complete('success')
          })
        } else {
          document.getElementById('payment-request-button').style.display =
            'none'
        }
      })

      this.card = elements.create('card', {
        style: {
          base: {
            color: '#32325d',
            fontSmoothing: 'antialiased',
            fontSize: '1rem',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
      })
      try {
        this.card.mount('#card-element')

        this.card.addEventListener('change', event => {
          if (event.error) {
            this.cardValid = false
            this.stripeError = event.error.message
          } else {
            this.cardValid = true
            this.stripeError = ''
          }
        })
      } catch (e) {}
    }
  }
}
</script>
<style lang="postcss" scoped>
.available-plan {
  @apply .mr-2 .border .border-transparent .shadow .cursor-pointer .p-4;
  transition: border-color 500ms ease, box-shadow 500ms ease;

  &:hover {
    @apply .shadow-lg;
  }

  &.active {
    @apply .border-red;
  }
}
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.StripeElement {
  box-sizing: border-box;
  height: 3.5rem;
  padding: 1.2rem 0.875rem 1rem 0.875rem;
  border: 1px solid transparent;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;

  &.wallet-payment {
    @apply .shadow-none .p-0;
  }
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
