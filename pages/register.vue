<template>
  <section class="page--register min-h-screen flex flex-wrap px-0 lg:px-10 sm:pb-10 lg:py-6">
    <div class="mb-16 sm:mb-0 px-8 xl:px-12 w-full h-24 flex flex-wrap justify-between items-center shadow sm:shadow-none border-b border-transparent">
      <div class="block lg:hidden">
        <logo />
      </div>
      <nuxt-link :to="localePath({name : 'login'})">
        {{ $t('app.forgot.to_login_link') }}
      </nuxt-link>
    </div>

    <div class="tab-bar w-full lg:w-2/3 px-8 sm:px-12 mx-auto">
      <div class="w-full">
        <h1 class="uppercase text-h2 leading-none mb-6">
          {{ $t('app.register.title') }}
        </h1>
        <h5 v-if="this.$route.path.includes('team')">
          {{ $t('app.register.team.info') }}
        </h5>
        <h5 v-else-if="this.$route.path=='/register/confirmation'">
          {{ $t('app.register.info') }}
        </h5>
        <h5 v-else>
          {{ $t('app.register.brand.info') }}
        </h5>
      </div>
      <div v-if="this.$route.path!='/register/confirmation'" class="w-full">
        <ul class="-mx-2 md:-mx-4 text-h6 md:pt-2">
          <nuxt-link
            class="reg-tab inline-block py-4 mx-2 md:mx-4 font-large text-2xl font-semibold uppercase cursor-pointer"
            tag="li"
            :active-class="'active'"
            data-cy="inventory-link"
            :exact="true"
            :to="localePath({name: 'register'})"
          >
            {{ $t('general.brand') }}
          </nuxt-link>
          <nuxt-link
            class="reg-tab inline-block py-4 mx-2 md:mx-4 font-large text-2xl font-semibold uppercase cursor-pointer"
            tag="li"
            :active-class="'active'"
            data-cy="packages-link"
            :exact="true"
            :to="localePath({name : 'register-team'})"
          >
            {{ $t('general.team') }}
          </nuxt-link>
        </ul>
      </div>
      <nuxt-child />
    </div>
  </section>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  layout: 'auth-signup',

  name: 'Register',

  components: {
    Logo
  },

  apollo: {},

  mixins: [],

  data: () => ({}),

  computed: {},

  mounted() {},

  methods: {}
}
</script>

  <style lang="postcss" scoped>
.reg-tab {
  color: #d2d5dd;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 0;
    height: 8px;
    background: #d9d9d9;
    transition: all 0.2s ease-in-out;
  }

  &:hover:after {
    width: calc(100% + 10px);
    transition: all 0.2s ease-in-out;
  }

  &.active {
    color: #000000;

    &:after {
      width: calc(100% + 10px);
    }
  }
}
.team__inventory {
  @apply .w-full;

  .tab-bar {
    @apply .sticky .z-30;
    top: 5rem;
  }
  ul li {
    @apply .border-transparent .cursor-pointer;
    transition: border-color 400ms ease;
    will-change: border-color;

    &.active {
      @apply .border-b-2 .border-red .cursor-default;
    }
  }
}
</style>
