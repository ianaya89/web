<template>
  <div class="w-full border-t border-grey-l3 text-p1 py-2 mt-1">
    <div class="w-full flex text-menu">
      <social-media-post-stats :social-type="socialType" :post="post" />
      <span class="social-type" :class="$helpers.socialMediaIcon(socialType)" />
    </div>
  </div>
</template>

<script>
import SocialMediaPostStats from '@/components/social/SocialMediaPostStats'

export default {
  name: 'SocialMediaPostFooter',

  components: {
    SocialMediaPostStats
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
  }
}
</script>

<style lang="postcss" scoped>
.social-type {
  @apply .ml-auto .text-h6 .my-auto;

  &.fa-facebook-square {
    color: #3c5a99;
  }

  &.fa-facebook-f {
    color: #3c5a99;
  }

  &.fa-instagram {
    @apply .text-p2;
    color: #dc4175;
  }

  &.fa-youtube {
    color: #c4302b;
  }

  &.fa-twitter-square {
    color: #00aced;
  }
}
</style>
