<template>
  <div class="w-full">
    <app-header class="hidden xl:flex">
      <li class="lang-items" @click.stop="$refs.langDropdownDesktop.toggleDropdown()">
        <span>
          {{ currentLocale }}
        </span>
        <dropdown ref="langDropdownDesktop" class="cursor-default" :items-classes="'top-0 left-0 min-w-16'" :activator="false" :deactivator="false">
          <ul class="lang--dropdown flex flex-col flex-wrap">
            <li
              v-for="locale in availableLocales"
              :key="locale.code"
              class="cursor-pointer p-4"
              @click="switchLang(locale); $refs.langDropdownDesktop.toggleDropdown()"
            >
              {{ locale.code.toUpperCase() }}
            </li>
          </ul>
        </dropdown>
      </li>

      <slot name="header-links" />

      <app-header-link :href="{ name: 'news' }">
        {{ $t('app.header.news') }}
      </app-header-link>
      <transition name="slide-fade">
        <compare-header-info v-if="hasItemsInCompare" />
      </transition>
      <transition name="slide-fade">
        <proposal-header-info v-if="hasItemsInProposal" />
      </transition>
      <notifications />
      <user-actions />
    </app-header>

    <app-header-mobile class="flex xl:hidden">
      <li class="lang-items-mobile" @click.stop="$refs.langDropdown.toggleDropdown()">
        <span>
          {{ currentLocale }}
        </span>
        <dropdown ref="langDropdown" class="cursor-default" :items-classes="'top-0 left-0 min-w-16'" :activator="false" :deactivator="false">
          <ul class="lang--dropdown flex flex-col flex-wrap">
            <li
              v-for="locale in availableLocales"
              :key="locale.code"
              class="cursor-pointer p-4"
              @click="switchLang(locale); $refs.langDropdown.toggleDropdown()"
            >
              {{ locale.code.toUpperCase() }}
            </li>
          </ul>
        </dropdown>
      </li>
      <app-header-link :href="{ name: 'news' }">
        {{ $t('app.header.news') }}
      </app-header-link>
      <transition name="slide-fade">
        <compare-header-info v-if="hasItemsInCompare" />
      </transition>
      <transition name="slide-fade">
        <proposal-header-info v-if="hasItemsInProposal" />
      </transition>
      <notifications ref="notifications" />
      <div
        class="flex flex-col ml-4 text-h3 sm:text-h7 my-auto"
        @click.stop="toggleMobileMenu"
      >
        <transition name="fade" mode="out-in">
          <div :key="mobileMenuVisible">
            <span v-if="!mobileMenuVisible" class="lni-menu text-h3 my-auto cursor-pointer select-none block mx-auto" />
            <span v-else class="close lni-close text-h4 cursor-pointer select-none block my-auto" />
          </div>
        </transition>
        <span class="uppercase select-none block text-p2 mx-auto">{{ $t('general.menu') }}</span>
      </div>
    </app-header-mobile>
    <transition name="slide-fade">
      <div v-if="mobileMenuVisible" class="mobile-menu w-full sm:w-1/2 md:w-2/5 lg:w-1/3 xl:hidden text-h6 sm:text-h7">
        <user-actions :mobile="true" />

        <div class="mt-4 pt-8 border-t border-grey-l4" @click="toggleMobileMenu">
          <slot name="mobile-links" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import UserActions from '@/components/UserActions'
import AppHeader from '@/components/AppHeader'
import Notifications from '@/components/Notifications'
import AppHeaderLink from '@/components/AppHeaderLink'
import AppHeaderMobile from '@/components/AppHeaderMobile'
import proposal from '@/services/mixins/proposal'
import compare from '@/services/mixins/compare'
import ProposalHeaderInfo from '@/components/ProposalHeaderInfo'
import CompareHeaderInfo from '@/components/CompareHeaderInfo'
import localeSwitch from '@/services/mixins/localeSwitch'
import Dropdown from '@/components/Dropdown'

export default {
  name: 'PrivateMenu',

  components: {
    AppHeaderMobile,
    AppHeader,
    AppHeaderLink,
    Notifications,
    UserActions,
    Dropdown,
    ProposalHeaderInfo,
    CompareHeaderInfo
  },

  mixins: [compare, proposal, localeSwitch],

  data: () => ({
    mobileMenuVisible: false
  }),

  methods: {
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible
      this.$refs.notifications.$refs.notificationsDropdown.hideDropdown()
    }
  }
}
</script>

<style lang="postcss" scoped>
.close {
  @apply .w-8 .h-8 .flex .justify-center .items-center;
}

.mobile-menu {
  @apply .fixed .right-0 .bg-white .py-4 .shadow .overflow-y-scroll .overflow-x-hidden .z-40;
  top: 5rem;
  height: calc(100vh - 5rem);

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
.lang-items {
  @apply .relative .cursor-pointer;

  > span {
    @apply .px-4 .h-full .flex .items-center .text-grey-d1 .font-medium .border-transparent .border-b-3 .cursor-pointer;
    &:hover {
      @apply .text-black;
    }
  }

  .lang--dropdown {
    @apply .absolute .flex .flex-col .justify-start .w-16 .max-h-128 .bg-white .shadow-md .border .border-grey-l4 .overflow-y-auto;
    left: 0;
  }
}

.lang-items-mobile {
  @apply .relative .cursor-pointer;

  > span {
    @apply .px-1 .h-full .flex .items-center .text-grey-d1 .font-medium .border-transparent .border-b-3 .cursor-pointer;
    &:hover {
      @apply .text-black;
    }
  }

  .lang--dropdown {
    @apply .absolute .flex .flex-col .justify-start .w-16 .max-h-128 .bg-white .shadow-md .border .border-grey-l4 .overflow-y-auto;
    left: 0;
  }
}
</style>
