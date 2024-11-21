<template>
  <li class="notifications" @click.stop="toggleDropdown">
    <span>
      <i class="fas fa-bell" />
      <transition name="slide-fade">
        <badge v-if="notifications.unreadCount" :value="notifications.unreadCount" />
      </transition>
    </span>
    <dropdown ref="notificationsDropdown" class="cursor-default" :items-classes="'top-0 -mt-6'" :activator="false" :deactivator="false">
      <ul v-if="notifications.latest.length" class="notifications--dropdown">
        <notification
          v-for="notification in notifications.latest"
          :key="notification.id"
          :notification="notification"
        />
      </ul>
    </dropdown>
  </li>
</template>

<script>
import Badge from '@/components/Badge'
import Notification from '@/components/Notification'
import { MeQuery, NotificationsQuery } from '@/services/graphql'
import Dropdown from '@/components/Dropdown'

export default {
  name: 'Notifications',

  components: {
    Badge,
    Notification,
    Dropdown
  },

  data: () => ({
    showNotifications: false,

    notifications: {
      unreadCount: 0,
      latest: []
    }
  }),

  apollo: {
    notifications: {
      ...NotificationsQuery
      // fetchPolicy: 'no-cache' // TODO fucked up cache
    },
    me: {
      ...MeQuery,
      result({ data }) {
        this.$nextTick(() => {
          this.$echo
            .private(`user.${data.me.id}`)
            .listen('UserNotifiableAction', e => {
              this.$apollo.queries.notifications.refetch()
            })
        })
      }
    }
  },

  methods: {
    toggleDropdown() {
      this.$refs.notificationsDropdown.toggleDropdown()
    }
  }
}
</script>

<style lang="postcss">
.notifications {
  @apply .relative;

  > span {
    @apply .pr-4 .h-full .flex .items-center .text-grey-d1 .font-medium .border-transparent .border-b-3 .cursor-pointer;
    &:hover {
      @apply .text-black;
    }
  }

  .notifications--dropdown {
    @apply .absolute .flex .flex-col .justify-start .w-80 .max-h-128 .bg-white .shadow-md .border .border-grey-l4 .overflow-y-auto;
    right: 0;
  }

  .unread {
    @apply .border-red !important;
  }
}
</style>
