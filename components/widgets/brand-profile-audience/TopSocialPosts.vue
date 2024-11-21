<template>
  <div>
    <div class="w-full">
      <h1>{{ $t('app.brand.profile.audience.media_posts.title') }}</h1>
    </div>
    <div class="w-full flex mt-4">
      <div class="w-2/3">
        <label-chart :label="$filters.number(socialAccounts.length)" :info="$t('app.brand.profile.audience.media_posts.social_media_profiles')" />
      </div>
      <div class="w-1/3 ml-auto">
        <app-select
          v-model="topPostPeriod"
          :label="$t('app.brand.profile.audience.media_posts.period')"
          class="w-full"
          :solo="true"
          :solo-label="null"
          :items="seasonItems"
        />
      </div>
    </div>
    <top-social-media-item v-for="post in topSocialPosts" :key="post.id" :social-media-post="post" class="border-b border-grey-l2" />
  </div>
</template>

<script>
import { concat } from 'lodash'
import TopSocialMediaItem from '@/components/TopSocialMediaItem'
import AppSelect from '@/components/AppSelect'
import LabelChart from '@/components/LabelChart'
import {
  BrandSocialAccountsPostsQuery,
  BrandSocialAccountsQuery,
  SeasonsQuery
} from '@/services/graphql'

export default {
  name: 'TopSocialPosts',

  components: {
    AppSelect,
    LabelChart,
    TopSocialMediaItem
  },

  apollo: {
    topSocialPosts: {
      ...BrandSocialAccountsPostsQuery,
      update(data) {
        const accs = this.$get(data, 'unit.entity.socialAccounts', [])
        let postsAll = []
        accs.map(item => item.posts).map(posts => {
          postsAll = postsAll.concat(posts)
        })
        return postsAll.sort((a, b) => b.engagement - a.engagement).slice(0, 3)
      },
      variables() {
        return {
          id: this.$route.params.id,
          from: this.topPostPeriod.from,
          to: this.topPostPeriod.to
        }
      },
      skip() {
        return this.seasons.length === 0
      }
    },

    seasons: {
      ...SeasonsQuery,
      result({ data }) {
        this.topPostPeriod = {
          from: data.seasons[0].from,
          to: null
        }
      }
    },

    socialAccounts: {
      ...BrandSocialAccountsQuery,
      variables() {
        return {
          id: this.unitId
        }
      },
      update(data) {
        return data.unit.entity.socialAccounts
      }
    }
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    topPostPeriod: null,
    seasons: [],
    topSocialPosts: [],
    socialAccounts: []
  }),

  computed: {
    seasonItems() {
      if (this.seasons.length === 0) {
        return []
      }
      const seasonItems = [
        {
          text: this.$t('general.current_season'),
          value: {
            from: this.seasons[0].fromDate,
            to: null
          }
        }
      ]
      return concat(
        seasonItems,
        this.seasons.map((item, index) => {
          return {
            text: index === 0 ? this.$t('general.last_season') : item.name,
            value: {
              from: item.fromDate,
              to: item.toDate
            }
          }
        })
      )
    }
  }
}
</script>

<style scoped>
</style>
