<template>
  <li class="user--actions min-w-56 mr-8" :class="{'flex-col': mobile}" @click.stop="toggleDropdown">
    <div v-if="unit && !mobile" class="flex items-center">
      <avatar
        :src="$get(me, 'profile.photo.url')"
        classes="h-12 w-12"
      />
      <div class="mx-2">
        <h6 class="user--actions-name">
          {{ fullName }}
        </h6>
        <span class="user--actions-entity pr-4">
          {{ $get(unit, 'entity.name') }}
        </span>
      </div>
    </div>

    <div v-else-if="unit && mobile" class="w-5/6" :class="{'w-full': mobile}">
      <div class="text-p2 text-grey min-w-80 px-4 uppercase">
        {{ $t('app.header.user_dropdown.active_account') }}
      </div>
      <div class="px-6 pt-1 flex">
        <div class="flex justify-center">
          <avatar
            :src="$get(unit, 'entity.logo.url')"
            class="my-auto"
            classes="h-12 w-12"
          />
        </div>
        <div class="w-2/3 pl-2">
          <p class="font-sans text-h7 font-medium">
            {{ $get(unit, 'entity.name') }}
          </p>
          <p class="text-grey text-p3 leading-tight">
            {{ $get(unit, 'organization.name') }}
          </p>
          <p class="text-grey text-p3">
            {{ $get(me, 'email') }}
          </p>
        </div>
      </div>
    </div>

    <content-placeholders v-else class="flex w-32">
      <content-placeholders-heading class="w-full" :img="true" />
    </content-placeholders>

    <transition name="fade">
      <div
        v-show="!activatedDropdown"
        class="cursor-pointer absolute right-0 text-center"
        :class="{'bottom-0':mobile}"
        @click.stop="toggleDropdown"
      >
        <span class="fas fa-chevron-down text-red" />
      </div>
    </transition>
    <transition name="fade">
      <div
        v-show="activatedDropdown"
        class="cursor-pointer absolute right-0 text-center"
        :class="{'bottom-0':mobile}"
        @click.stop="toggleDropdown"
      >
        <span class="fas fa-chevron-up text-red" />
      </div>
    </transition>

    <dropdown
      ref="userDropdown"
      class="cursor-default"
      :class="{'w-full': mobile}"
      :items-classes="dropdownItemsClasses"
      :activator="false"
      :deactivator="false"
    >
      <div class="w-full pt-4 max-h-128 overflow-y-scroll">
        <div v-if="!mobile" class="w-full">
          <div class="text-p2 text-grey min-w-80 px-4 uppercase">
            {{ $t('app.header.user_dropdown.active_account') }}
          </div>
          <div class="px-4 pt-1 flex">
            <div class="flex justify-center">
              <avatar
                :src="$get(unit, 'entity.logo.url')"
                class="my-auto"
                classes="h-16 w-16"
              />
            </div>
            <div class="w-2/3 pl-2">
              <p class="font-sans text-h7 font-medium">
                {{ $get(unit, 'entity.name') }}
              </p>
              <p class="text-grey text-p3 leading-tight">
                {{ $get(unit, 'organization.name') }}
              </p>
              <p class="text-grey text-p3">
                {{ $get(me, 'email') }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="availableUnits.length" class="w-full">
          <div class="text-p2 text-grey border-b border-grey-l4 px-4 uppercase" :class="{'mt-6' : !mobile}">
            {{ $t('app.header.user_dropdown.available_accounts') }} ({{ availableUnits.length }})
          </div>
          <search
            v-if="availableUnits.length > 5"
            class="px-4 -mt-4"
            :search-items="availableUnits"
            :limit="5"
            :autofocus="true"
            :search-attribute="['entity.name', 'organization.name']"
            :input-props="{stickyLabel: true, outline: false, label: null, appendedIcon: 'fa fa-search text-red'}"
          >
            <div v-for="unit in availableUnits.slice(0, 5)" :key="unit.id">
              <user-available-unit :unit="unit" />
            </div>

            <template v-slot:result="props">
              <div v-if="props.result.length === 0" class="text-grey w-full flex min-h-64">
                <div class="w-2/3 text-left">
                  <span class="text-p1 pt-2">{{ $t('errors.no-search-result') }}</span>
                </div>
              </div>

              <div v-for="unit in props.result" :key="unit.id">
                <user-available-unit :unit="unit" />
              </div>
            </template>
          </search>
          <div v-for="unit in availableUnits" v-else :key="unit.id">
            <user-available-unit :unit="unit" />
          </div>
        </div>

        <div class="w-full flex py-4 px-2">
          <div class="w-full flex">
            <app-button class="button--action" data-cy="logout" :btn-class="'link'" :title="$t('app.header.user_dropdown.log_out')" @clicked="signOut()" />
          </div>
        </div>
      </div>
    </dropdown>
  </li>
</template>

<script>
import Avatar from '@/components/Avatar'
import Dropdown from '@/components/Dropdown'
import AppButton from '@/components/AppButton'
import UserAvailableUnit from '@/components/UserAvailableUnit'
import { ActiveUnitQuery, MeQuery } from '@/services/graphql'
import Search from '@/components/widgets/Search'

export default {
  components: {
    Search,
    Avatar,
    AppButton,
    Dropdown,
    UserAvailableUnit
  },

  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },

  apollo: {
    me: MeQuery,
    unit: {
      ...ActiveUnitQuery(function() {
        return { id: this.$route.params.id }
      }),
      skip() {
        return this.$route.params.id == null
      }
    }
  },

  data: () => ({
    activatedDropdown: false
  }),

  computed: {
    fullName() {
      const firstName = this.$get(this.me, 'profile.firstName', '-')
      const lastName = this.$get(this.me, 'profile.lastName', '-')

      return `${firstName} ${lastName}`
    },

    availableUnits() {
      return this.$get(this.me, 'units', []).filter(
        u => u.id !== this.$route.params.id
      )
    },

    dropdownItemsClasses() {
      if (this.mobile) {
        return 'mobile-dropdown-items'
      } else {
        return 'top-gap'
      }
    }
  },

  methods: {
    signOut() {
      this.$router.push(
        this.localePath({
          name: 'logout'
        })
      )
    },

    toggleDropdown() {
      if (!this.unit) {
        return
      }

      this.$refs.userDropdown.toggleDropdown()
      this.activatedDropdown = !this.activatedDropdown
    }
  }
}
</script>

<style lang="postcss">
.user--actions {
  @apply .relative .flex .items-center .justify-between .cursor-pointer;

  .mobile-dropdown-items {
    @apply .shadow-none .border-r-0 .border-l-0 .left-0;
    top: 1rem;
  }

  .user--actions-name {
    @apply .text-black .text-menu .font-medium .leading-none;
  }

  .user--actions-entity {
    @apply .text-grey .font-serif .text-p3 .font-medium .leading-none;
  }

  .button--action {
    @apply .uppercase .font-medium .font-sans .w-full .my-auto !important;
  }
}
</style>
