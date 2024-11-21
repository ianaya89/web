<template>
  <div class="media-value w-full flex px-4 pt-3 pb-2 border-b border-grey-l3 cursor-pointer">
    <div class="flex mr-4">
      <avatar
        :src="$get(media, 'profilePicture.url', undefined)"
        :rounded="false"
        :icon-sign="iconSign"
        classes="h-10 w-10"
      />
    </div>
    <div class="w-4/5 flex">
      <div class="w-full my-auto">
        <p class="font-sans font-medium leading-tight">
          {{ $get(media,'unit.entityName','') }}
        </p>
        <p class="text-grey font-sans">
          {{ $t('app.profile.team.fans.media.' + metric) }}: {{ media[metric] | number }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import { socialMediaIcon } from '@/services/helpers'

export default {
  name: 'MediaValue',

  components: {
    Avatar
  },

  props: {
    media: {
      type: Object,
      required: true
    },

    metric: {
      type: String,
      required: true
    }
  },

  computed: {
    iconSign() {
      return socialMediaIcon(this.media.type)
    }
  }
}
</script>

<style lang="postcss" scoped>
.media-value {
  @apply .border-l-2;
  border-left-color: transparent;
}

div.total {
  @apply .border-b;
}

div.active {
  @apply .border-b .border-l-2 .bg-grey-l5;
  border-bottom-color: #d4d4d4;
  border-left-color: red;
}
</style>
