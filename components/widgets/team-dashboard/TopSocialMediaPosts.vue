<template>
  <div class="w-full bg-white shadow-xl p-4">
    <div class="w-full flex">
      <div class="mr-auto">
        <label-chart :label="topSocialMedia.length" :info="$t('app.team.dashboard.social_media_posts')" />
      </div>
    </div>

    <div class="w-full">
      <h6 class="uppercase mt-4 pl-1 text-h7">
        {{ $t('app.team.dashboard.top_social_media_posts') }}
      </h6>

      <div v-if="topSocialMedia.length">
        <top-social-media-item
          v-for="(post, index) in topSocialMedia"
          :key="post.id"
          :social-media-post="post"
          class="py-6 border-grey-l3"
          :class="{'border-b': index !== topSocialMedia.length - 1}"
        />
      </div>

      <div v-else>
        <p class="text-grey mt-4 text-center">
          {{ $t('errors.no_results') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LabelChart from '@/components/LabelChart'
import { UnitTopSocialMediaQuery } from '@/services/graphql'
import TopSocialMediaItem from '@/components/TopSocialMediaItem'

export default {
  name: 'TopSocialMediaPosts',

  components: {
    TopSocialMediaItem,
    LabelChart
  },

  props: {
    unitId: {
      type: String,
      default: null
    }
  },

  apollo: {
    topSocialMedia: {
      ...UnitTopSocialMediaQuery,
      variables() {
        return {
          id: this.unitId
        }
      },
      update(data) {
        const posts = this.$get(data, 'unit.entity.socialAccounts', [])
          .map(socialAcc => socialAcc.posts)
          .reduce((a, b) => a.concat(b), [])
        return posts.sort((a, b) => b.engagement - a.engagement).slice(0, 5)
      }
    }
  },

  data: () => ({
    topSocialMedia: UnitTopSocialMediaQuery.mock
  })
}
</script>

<style scoped>
</style>
