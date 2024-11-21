<template>
  <div class="social-media-post" @click="$refs.socialPostModal.open()">
    <div class="w-full py-3 px-2 flex">
      <avatar :src="$get(post,'socialAccount.profilePicture.url')" :classes="'w-10 h-10'" />
      <div class="ml-2 my-auto">
        <span class="text-h7 font-medium">
          {{ $get(post,'socialAccount.name', '-') }}
        </span>
        <!--        <p class="text-grey">-->
        <!--          @tag-->
        <!--        </p>-->
      </div>
    </div>
    <img
      v-if="hasMedia"
      class="w-full"
      :src="$get(post,'thumb.url', undefined)"
      alt="Social media post cover image"
    >
    <div class="w-full px-3">
      <span class="font-serif">
        {{ $get(post, 'content','-') | truncate(hasMedia ? 80 : 200) }}
      </span>
      <social-media-post-footer v-if="socialType!=='web-page'" :post="post" :social-type="socialType" />
    </div>
    <social-media-post-modal ref="socialPostModal" :social-post="post" :social-type="socialType" />
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import SocialMediaPostFooter from '@/components/social/SocialMediaPostFooter'
import SocialMediaPostModal from '@/components/modals/SocialMediaPostModal'

export default {
  name: 'SocialMediaPost',

  components: {
    SocialMediaPostModal,
    SocialMediaPostFooter,
    Avatar
  },

  props: {
    post: {
      type: Object,
      required: true
    },
    socialType: {
      type: String,
      required: true
    }
  },

  computed: {
    hasMedia() {
      return (
        this.$get(this.post, 'type', null) === 'image' ||
        this.$get(this.post, 'type', null) === 'video'
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.social-media-post {
  @apply .bg-white .border .border-grey-l4 .cursor-pointer;
  transition: box-shadow 300ms ease-in;
  will-change: box-shadow;

  &:hover {
    @apply .shadow-lg;
  }
}
</style>
