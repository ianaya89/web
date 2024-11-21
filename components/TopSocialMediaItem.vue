<template>
  <div class="w-full flex flex-wrap items-start py-6">
    <div class="xl:w-2/3 flex">
      <avatar
        :rounded="false"
        :src="$get(socialMediaPost,'socialAccount.profilePicture.url', undefined)"
        :icon-sign="$helpers.socialMediaIcon($get(socialMediaPost, 'socialAccount.type'))"
        :classes="'w-12 h-12'"
      />
      <!-- TODO: Show more button - to show more of a post (max 200 characters), example: https://codepen.io/srekoble/pen/WGBzZa -->
      <div class="w-4/5 pl-4 text-grey font-serif">
        <img :src="$get(socialMediaPost, 'image.url', undefined)" alt="">
        <a class="hover:underline" :href="$get(socialMediaPost,'socialAccount.url')" target="_blank" rel="noopener">{{ $get(socialMediaPost,'socialAccount.name') }}</a>
        <p>
          {{ $get(socialMediaPost,'content', '-') | truncate(100) }}
        </p>
      </div>
    </div>
    <div class="w-full xl:w-1/3 flex mt-8 xl:mt-0">
      <div class="w-1/2 flex px-px">
        <div class="w-full m-auto text-center bg-grey-l4 py-2">
          <p class="text-h6 font-sans font-medium truncate leading-none pt-2">
            {{ socialMediaPost.reach | number(socialMediaPost.reach > 999999) }}
          </p>
          <p class="text-grey text-p5 truncate">
            {{ $t('app.profile.social.top_posts.reach') }}
          </p>
        </div>
      </div>
      <div class="w-1/2 flex px-px">
        <div class="w-full m-auto text-center bg-grey-l4 py-2">
          <p class="text-h6 font-sans font-medium truncate leading-none pt-2">
            {{ socialMediaPost.engagement | number(socialMediaPost.engagement > 999999) }}
          </p>
          <p class="text-grey text-p5 truncate">
            {{ $t('app.profile.social.top_posts.engagement') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'TopSocialMediaItem',

  components: {
    Avatar
  },

  props: {
    socialMediaPost: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
