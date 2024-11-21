<template>
  <li class="notifications--dropdown-item" @click="onClick">
    <nuxt-link
      :class="{ unread: !notification.isSeen }"
      to="#"
    >
      <avatar
        classes="h-12 w-12"
        :src="isAnonymous ? undefined : $get(notification, 'unit.entity.logo.url')"
      />
      <div class="notifications--dropdown-item-content">
        <h6 class="name">
          {{ message }}
        </h6>
        <p class="text">
          {{ $t('notifications.' + notification.type) }}
        </p>
        <span class="time">{{ notification.createdAt | dateTimeShort }}</span>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
import Avatar from '@/components/Avatar'
import { ActiveUnitQuery, UpdateNotificationMutation } from '@/services/graphql'
import { ROUTES_PREFIX_4_TYPENAMES } from '@/services/helpers'

export default {
  components: {
    Avatar
  },

  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  apollo: {
    unit: ActiveUnitQuery(function() {
      return { id: this.$route.params.id }
    })
  },

  computed: {
    isAnonymous() {
      return this.notification.type === 'page_visited'
    },

    message() {
      return this.isAnonymous
        ? `Brand from ${this.$get(this.notification, 'industry', '-')} industry`
        : this.$get(this.notification, 'unit.entity.name', '-')
    }
  },

  methods: {
    onClick() {
      if (
        ['message_received', 'offer_received'].includes(this.notification.type)
      ) {
        this.$router.push(
          this.localePath({
            name:
              ROUTES_PREFIX_4_TYPENAMES[this.unit.entity.__typename] +
              '-deals-dealId',
            params: {
              ...this.$route.params,
              dealId: this.$get(this.notification, 'meta.dealId')
            }
          })
        )
      }

      this.markAsRead()
    },

    async markAsRead() {
      if (this.notification.isSeen) {
        return
      }

      try {
        await this.$apollo.mutate({
          ...UpdateNotificationMutation,
          variables: {
            id: this.notification.id,
            input: {
              is_seen: true
            }
          }
        })
      } catch (err) {
        if (this.isDevEnv) {
          this.$toast.error(err.message || this.$t('errors.general'))
        } else {
          this.$toast.error(this.$t('errors.general'))
        }
      }
    }
  }
}
</script>

<style lang="postcss">
.notifications--dropdown-item {
  @apply .border-b .border-grey-l4 .cursor-pointer;

  &:hover {
    @apply .bg-grey-l4;
  }

  a {
    @apply .flex .items-start .justify-start .px-3 .py-3  w-full .border-l-4 .border-transparent;
    transition: none;
  }

  &-content {
    @apply .flex .flex-col pl-2;
    .name {
      @apply .text-black .text-menu .font-medium .my-0 .py-0;
      line-height: 1.2rem;
    }
    .text {
      @apply .font-serif .text-black .text-p3;
    }
    .time {
      @apply .font-serif .text-p3 .text-grey-l1;
    }
  }
}
</style>
