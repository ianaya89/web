<template>
  <div class="w-full">
    <div class="public-header-mask" :class="scrolledHeader" />
    <div class="public-header px-8 sm:px-12" :class="scrolledHeader">
      <div class="w-1/2 sm:w-1/3 md:w-1/5 lg:w-2/7 my-auto">
        <logo :variant="scrolledLogoVariant ? 'dark' : 'light'" class="w-32" />
      </div>
      <div class="w-full md:w-3/5 hidden lg:flex flex-wrap lg:-ml-8 sm:px-8 md:px-0 text-h7">
        <ul>
          <li>
            <nuxt-link :to="localePath({name: 'teams'})">
              {{ $t('public.header.teams') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath({name: 'brand'})">
              {{ $t('public.header.brands') }}
            </nuxt-link>
          </li>
          <!-- <li>
            <nuxt-link :to="localePath({name: 'features'})">
              {{ $t('public.header.features') }}
            </nuxt-link>
          </li> -->
          <li class="cursor-pointer" @click.stop="$refs.pricingDropdown.toggleDropdown()">
            <span>
              {{ $t('public.header.pricing') }}
            </span>
            <span class="pl-2 fas fa-caret-down text-landing-vertical-line" @click.stop="$refs.pricingDropdown.toggleDropdown()" />
            <dropdown ref="pricingDropdown" class="cursor-default" :items-classes="'top-0 left-0 min-w-28'" :activator="false" :deactivator="false">
              <ul class="menu--dropdown flex flex-wrap">
                <li @click="$refs.pricingDropdown.toggleDropdown()">
                  <nuxt-link :to="localePath({name: 'pricing-team'})">
                    {{ $t('public.header.teams') }}
                  </nuxt-link>
                </li>
                <li class="pt-2" @click="$refs.pricingDropdown.toggleDropdown()">
                  <nuxt-link :to="localePath({name: 'pricing-brand'})">
                    {{ $t('public.header.brands') }}
                  </nuxt-link>
                </li>
              </ul>
            </dropdown>
          </li>
          <li>
            <nuxt-link :to="localePath({name: 'news'})">
              {{ $t('public.header.news') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath({name: 'about-us'})">
              {{ $t('public.header.about-us') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath({name: 'contact-us'})">
              {{ $t('public.header.contact-us') }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="flex items-center">
        <ul>
          <li class="cursor-pointer" @click.stop="$refs.langDropdown.toggleDropdown()">
            <span>
              {{ currentLocale }}
            </span>
            <span class="pl-2 fas fa-caret-down text-landing-vertical-line" @click.stop="$refs.langDropdown.toggleDropdown()" />
            <dropdown ref="langDropdown" class="cursor-default" :items-classes="'top-0 left-0 min-w-28'" :activator="false" :deactivator="false">
              <ul class="menu--dropdown flex flex-col flex-wrap">
                <li
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  class="cursor-pointer py-1"
                  @click="switchLang(locale); $refs.langDropdown.toggleDropdown()"
                >
                  {{ locale.code.toUpperCase() }}
                </li>
              </ul>
            </dropdown>
          </li>
        </ul>
      </div>
      <div class="flex flex-1 justify-end text-h6 sm:text-h7 pr-2">
        <nuxt-link v-if="!isAuthenticated" :to="localePath({name: 'login'})" class="my-auto text-white hidden lg:block hover:text-red-l1">
          {{ $t('public.header.login') }}
        </nuxt-link>
        <nuxt-link v-else :to="resolvedEnterInApp" class="my-auto text-white leading-tight hidden lg:block hover:text-red-l1">
          <span class="fas fa-sign-in-alt mr-2 text-red" />{{ $t('public.header.go_to_dashboard') }}
        </nuxt-link>
        <div
          class="flex flex-col lg:hidden ml-4 text-h3 sm:text-h7 my-auto"
          @click.stop="toggleMobileMenu"
        >
          <transition name="fade" mode="out-in">
            <div :key="mobileMenuVisible">
              <span v-if="!mobileMenuVisible" class="lni-menu text-h3 text-white my-auto cursor-pointer select-none block mx-auto" />
              <span v-else class="lni-close text-h3 text-white my-auto cursor-pointer select-none block mx-auto" />
            </div>
          </transition>
          <span class="text-white uppercase select-none block text-p2 mx-auto">{{ $t('general.menu') }}</span>
        </div>
      </div>
      <transition name="fade-down">
        <div v-show="mobileMenuVisible" class="mobile-menu lg:hidden text-h6 sm:text-h7">
          <ul class="mr-8">
            <li class="border-b border-grey-l3">
              <nuxt-link :to="localePath({name: 'index'})">
                {{ $t('public.header.teams') }}
              </nuxt-link>
              <ul>
                <li>
                  <nuxt-link :to="localePath({name: 'pricing-team'})">
                    {{ $t('public.header.pricing') }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="border-b border-grey-l3">
              <nuxt-link :to="localePath({name: 'brand'})">
                {{ $t('public.header.brands') }}
              </nuxt-link>
              <ul>
                <li>
                  <nuxt-link :to="localePath({name: 'pricing-brand'})">
                    {{ $t('public.header.pricing') }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <!-- <li>
              <nuxt-link :to="localePath({name: 'features'})">
                {{ $t('public.header.features') }}
              </nuxt-link>
            </li> -->
            <li class="border-b border-grey-l3">
              <nuxt-link :to="localePath({name: 'news'})">
                {{ $t('public.header.news') }}
              </nuxt-link>
            </li>
            <li class="border-b border-grey-l3">
              <nuxt-link :to="localePath({name: 'about-us'})">
                {{ $t('public.header.about-us') }}
              </nuxt-link>
            </li>
            <li class="border-b border-grey-l3">
              <nuxt-link :to="localePath({name: 'contact-us'})">
                {{ $t('public.header.contact-us') }}
              </nuxt-link>
            </li>
            <li v-if="isAuthenticated">
              <nuxt-link :to="resolvedEnterInApp">
                <span class="fas fa-sign-in-alt mr-2 text-red" />{{ $t('public.header.go_to_dashboard') }}
              </nuxt-link>
            </li>
            <li v-else>
              <nuxt-link :to="localePath({name: 'login'})" class="text-h5">
                {{ $t('public.header.login') }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <div v-if="termsMenu || privacyMenu" class="terms-privacy-accordion lg:hidden bg-white">
      <accordion-item ref="menuAccordion" :header-classes="'px-8 py-4 border-b border-grey-l4 text-p1'" :body-classes="'px-12 pb-4 pt-2'">
        <template v-slot:header>
          <span v-if="termsMenu">{{ $t('public.header.terms_sections') }}</span>
          <span v-else-if="privacyMenu">{{ $t('public.header.privacy_legacy_sections') }}</span>
        </template>
        <terms-menu v-if="termsMenu" class="pb-16 lg:pb-0" :offset="180" @item-clicked="$refs.menuAccordion.hide()" />
        <privacy-menu v-if="privacyMenu" class="pb-16 lg:pb-0" :offset="180" @item-clicked="$refs.menuAccordion.hide()" />
      </accordion-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dropdown from '@/components/Dropdown'
import { MeQuery } from '@/services/graphql'
import {
  DEFAULT_ROUTES_4_TYPENAMES,
  TERMS_PRIVACY_MENU
} from '@/services/helpers'
import Logo from '@/components/Logo'
import TermsMenu from '@/components/menus/TermsMenu'
import PrivacyMenu from '@/components/menus/PrivacyMenu'
import AccordionItem from '@/components/AccordionItem'
import localeSwitch from '@/services/mixins/localeSwitch'

export default {
  name: 'PublicMenu',

  components: {
    AccordionItem,
    Dropdown,
    Logo,
    TermsMenu,
    PrivacyMenu
  },

  apollo: {
    me: {
      ...MeQuery,
      skip() {
        return !this.isAuthenticated
      }
    }
  },

  mixins: [localeSwitch],

  props: {
    permanentDarkLogo: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    bodyScrolled: false,
    mobileMenuVisible: false,
    me: null
  }),

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),

    termsMenu() {
      return (
        this.$store.getters['public-menu/getTermsPrivacyMenu'] ===
        TERMS_PRIVACY_MENU.values.terms
      )
    },

    privacyMenu() {
      return (
        this.$store.getters['public-menu/getTermsPrivacyMenu'] ===
        TERMS_PRIVACY_MENU.values.privacy
      )
    },

    isPermanentMenu() {
      return this.$store.getters['public-menu/isPermanentMenu']
    },

    scrolledHeaderVariant() {
      return this.bodyScrolled || this.isPermanentMenu
    },

    scrolledLogoVariant() {
      return this.permanentDarkLogo || this.scrolledHeaderVariant
    },

    scrolledHeader() {
      return this.scrolledHeaderVariant ? 'scrolled-header' : ''
    },

    resolvedEnterInApp() {
      if (this.me !== null) {
        const unitId = this.$get(this.me, 'units.0.id')
        const entityType = this.$get(this.me, 'units.0.entity.__typename')
        return this.localePath({
          name: DEFAULT_ROUTES_4_TYPENAMES[entityType],
          params: { id: unitId }
        })
      } else {
        return this.localePath({
          name: 'logout'
        })
      }
    }
  },

  mounted() {
    document.addEventListener('click', () => {
      if (this.mobileMenuVisible) {
        this.toggleMobileMenu()
      }
    })

    // if page was loaded with forced scroll from browser
    this.onScroll()
  },

  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('scroll', this.onScroll)
  },

  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible
    },

    onScroll() {
      if (window.pageYOffset > 0) {
        this.bodyScrolled = true
      } else {
        this.bodyScrolled = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.public-header-mask {
  @apply .bg-white .top-0 .fixed .w-full .h-24 .max-h-24 .z-20 .opacity-0;
  transition: opacity 300ms linear 0s;
  will-change: opacity;

  &.scrolled-header {
    @apply .opacity-100;
  }
}

.terms-privacy-accordion {
  @apply .w-full .shadow .fixed .inset-x-0 .z-10;
  top: 6rem;
}

.public-header {
  @apply .bg-transparent .border-b .border-transparent .top-0 .fixed .w-full .flex .h-24 .max-h-24 .z-30;

  .menu--dropdown {
    @apply .bg-white .shadow-md .py-2;

    a {
      @apply .text-grey;
      transition: color 300ms ease;
      will-change: color;

      &:hover {
        @apply .text-black;
      }
    }
  }

  .mobile-menu {
    @apply .absolute .left-0 .w-full .bg-white .py-10 .px-3 .shadow .border-t .border-grey-l4 .overflow-y-scroll;
    top: 6rem;
    height: calc(100vh - 6rem);

    ul {
      @apply .flex .flex-col;

      li {
        @apply .block .w-full .py-4;

        a {
          @apply .text-landing-vertical-line .text-black;
        }
      }
    }
  }

  &.scrolled-header {
    @apply .shadow;

    a {
      @apply .text-black;

      &:hover {
        @apply .text-grey;
      }
    }
    span {
      @apply .text-black;
    }
  }

  a {
    @apply .cursor-pointer;
  }

  span.fas {
    @apply .text-red;
  }

  ul {
    @apply .flex;

    li {
      @apply .inline .my-auto .mx-4;

      a,
      span {
        @apply .text-landing-vertical-line;
        transition: color 100ms ease-in-out;
        will-change: color;
      }
    }

    @media (max-width: 768px) {
      li {
        @apply .mx-4;
      }
    }
  }
}
</style>
