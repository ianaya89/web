<template>
  <section class="brand__profile__audience">
    <transition name="fade-up" :appear="true">
      <div>
        <div class="w-full mt-12">
          <h3>{{ $t('app.brand.profile.audience.media_reach_engagement.title') }}</h3>
        </div>
        <div class="w-full mt-12 flex flex-wrap">
          <div class="w-2/3 pr-12">
            <div class="w-full flex">
              <app-select
                v-model="engagement"
                :label="$t('app.brand.profile.audience.media_reach_engagement.engagement')"
                class="w-1/4 pr-2"
                :solo="true"
                :solo-label="null"
                :items="engagementItems"
                @input="selectEngagement"
              />
              <app-select
                v-model="engagementImage"
                :label="$t('app.brand.profile.audience.media_reach_engagement.images')"
                class="w-1/4 pr-2"
                :solo="true"
                :solo-label="null"
                :items="imagesItems"
                @input="selectEngagementImage"
              />
              <app-select
                v-model="engagementMonth"
                :label="$t('app.brand.profile.audience.media_reach_engagement.month')"
                class="w-1/4 ml-auto"
                :solo="true"
                :solo-label="null"
                :items="monthItems"
                @input="selectEngagementMonth"
              />
            </div>
            <div class="w-full">
              <line-chart :label-formatter="reachLabelFormatter" :height="400" :series="reachChartSeries" />
            </div>
          </div>
          <div class="w-1/3 pr-4">
            <div class="w-full flex">
              <div class="w-1/2">
                <h4>{{ $t('app.brand.profile.audience.media_reach_engagement.social_accounts') }}</h4>
              </div>
              <div class="w-1/2 ml-auto">
                <app-select
                  v-model="mediaSource"
                  class="float-left"
                  :solo="true"
                  :solo-label="null"
                  :items="socialSourcesItems"
                  @input="selectMediaSource"
                />
              </div>
            </div>

            <div class="w-full relative">
              <div class="fading-gradient" />
              <div class="overflow-y-auto h-96 pb-12">
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>


    <!--    ACTIVITY VALUATION-->
    <appear-transition :percentage-offset="0.7">
      <div>
        <div class="w-full mt-12">
          <h3>{{ $t('app.brand.profile.audience.activity_valuation.title') }}</h3>
        </div>
        <div class="w-full mt-4 flex">
          <div class="w-2/3 pr-12">
            <div class="w-full flex">
              <div class="w-1/2 flex items-center -mt-6">
                <h4>{{ $t('app.brand.profile.audience.activity_valuation.total_growth') }}</h4>
                <growth class="ml-4 h4" :value="brand.totalGrowth" />
              </div>
              <app-select
                v-model="valuationMonth"
                :label="$t('app.brand.profile.audience.activity_valuation.month')"
                class="w-1/4 px-2 ml-auto"
                :solo="true"
                :solo-label="null"
                :items="monthItems"
                @input="selectValuationMonth"
              />
            </div>
            <div class="w-full">
              <line-chart :label-formatter="growthLabelFormatter" :height="400" :series="growthChartSeries" />
            </div>
          </div>
          <div class="w-1/3">
            <div class="w-full flex">
              <div>
                <h4>{{ $t('app.brand.profile.audience.activity_valuation.sponsored_teams') }}</h4>
              </div>
            </div>
            <div class="w-full relative">
              <div class="fading-gradient" />
              <div class="overflow-y-auto h-96 pb-12">
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
                <avatar-info-strip />
              </div>
            </div>
          </div>
        </div>
      </div>
    </appear-transition>

    <appear-transition :percentage-offset="0.4">
      <!--    MEDIA AUDIENCE & POSTS -->
      <div class="w-full mt-12 flex">
        <social-media-audience class="w-1/2 pr-8" :unit-id="unitId" />

        <top-social-posts class="w-1/2" :unit-id="unitId" />
      </div>
    </appear-transition>

    <appear-transition :percentage-offset="0.4">
      <!--    STADIUM ATTENDANCE -->
      <div class="w-full mt-12">
        <h3>{{ $t('app.brand.profile.audience.stadium_attendance.title') }}</h3>
        <div class="w-full mt-4 flex">
          <monthly-stadium-attendance class="w-2/3 pr-12" :unit-id="unitId" />

          <sponsored-teams class="w-1/3" :unit-id="unitId" />
        </div>
      </div>
    </appear-transition>


    <!--    TV BROADCAST -->
    <!--    <appear-transition :percentage-offset="0.4">-->
    <!--      <div class="w-full mt-12">-->
    <!--        <h3>{{ $t('app.brand.profile.audience.broadcast.title') }}</h3>-->
    <!--        <div class="w-full mt-4 flex">-->
    <!--          <div class="w-2/3 pr-12">-->
    <!--            <h4>{{ $t('app.brand.profile.audience.broadcast.chart.title') }}</h4>-->
    <!--            <div class="w-full mt-4">-->
    <!--              <line-chart :label-formatter="broadcastLabelFormatter" :height="400" :series="broadcastChartSeries" />-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="w-1/3">-->
    <!--            <div class="w-full flex mt-4">-->
    <!--              <div class="w-1/2">-->
    <!--                <h4>{{ $t('app.brand.profile.audience.stadium_attendance.sponsored_teams') }}</h4>-->
    <!--              </div>-->
    <!--              <div class="w-1/2 ml-auto">-->
    <!--                <app-select-->
    <!--                  v-model="mediaPeriod"-->
    <!--                  :label="$t('app.brand.profile.audience.media_posts.period')"-->
    <!--                  class="w-full"-->
    <!--                  :solo="true"-->
    <!--                  :solo-label="null"-->
    <!--                  :items="periodItems"-->
    <!--                />-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="w-full relative">-->
    <!--              <div class="fading-gradient" />-->
    <!--              <div class="overflow-y-auto h-96 pb-12">-->
    <!--                <avatar-info-strip />-->
    <!--                <avatar-info-strip />-->
    <!--                <avatar-info-strip />-->
    <!--                <avatar-info-strip />-->
    <!--                <avatar-info-strip />-->
    <!--                <avatar-info-strip />-->
    <!--                <avatar-info-strip />-->
    <!--                <avatar-info-strip />-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </appear-transition>-->

    <!--    PAGE VIEWS -->
    <appear-transition :percentage-offset="0.4">
      <div class="w-full mt-12">
        <h3>{{ $t('app.brand.profile.audience.page_views.title') }}</h3>
        <div class="w-full mt-4 flex">
          <monthly-page-views class="w-2/3 pr-12" :unit-id="unitId" />
        </div>
      </div>
    </appear-transition>
  </section>
</template>

<script>
import { concat, groupBy } from 'lodash'
import AppSelect from '@/components/AppSelect'
import AvatarInfoStrip from '@/components/AvatarInfoStrip'
import AppearTransition from '@/components/transitions/AppearTransition'
import Growth from '@/components/Growth'
import LineChart from '@/components/charts/LineChart'
import {
  BrandQuery,
  BrandSocialAccountsQuery,
  SeasonsQuery,
  SocialQuery
} from '@/services/graphql'
import {
  attendanceLabelFormatter,
  broadcastLabelFormatter,
  growthLabelFormatter,
  mediaAudienceLabelFormatter,
  pageViewsLabelFormatter,
  reachLabelFormatter
} from '@/services/chartFormatters'
import { getGrowthClasses } from '@/services/helpers'
import SocialMediaAudience from '@/components/widgets/brand-profile-audience/SocialMediaAudience'
import TopSocialPosts from '@/components/widgets/brand-profile-audience/TopSocialPosts'
import MonthlyStadiumAttendance from '@/components/widgets/brand-profile-audience/MonthlyStadiumAttendance'
import SponsoredTeams from '@/components/widgets/brand-profile-audience/SponsoredTeams'
import MonthlyPageViews from '@/components/widgets/brand-profile-audience/MonthlyPageViews'

export default {
  name: 'Audience',

  components: {
    MonthlyPageViews,
    SponsoredTeams,
    MonthlyStadiumAttendance,
    TopSocialPosts,
    SocialMediaAudience,
    AppSelect,
    AppearTransition,
    LineChart,
    Growth,
    AvatarInfoStrip
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    socialSources: SocialQuery,
    brand: BrandQuery,

    seasons: {
      ...SeasonsQuery,
      result({ data }) {
        this.topPostPeriod = {
          from: data.seasons[0].toDate,
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

  data: () => ({
    engagement: null,
    engagementMonth: null,
    engagementImage: null,
    topSocialPosts: [],
    socialAccounts: [],
    seasons: [],
    valuationMonth: null,
    audienceChannel: null,
    topPostPeriod: null,
    mediaPeriod: null,
    mediaSource: null,
    periodItems: [],
    engagementItems: [],
    imagesItems: [],
    monthItems: [],
    socialSources: SocialQuery.mock,
    brand: BrandQuery.mock,
    growthLabelFormatter: growthLabelFormatter,
    attendanceLabelFormatter: attendanceLabelFormatter,
    mediaAudienceLabelFormatter: mediaAudienceLabelFormatter,
    broadcastLabelFormatter: broadcastLabelFormatter,
    pageViewsLabelFormatter: pageViewsLabelFormatter,
    reachLabelFormatter: reachLabelFormatter
  }),

  computed: {
    socialAccountsIds() {
      return this.socialAccounts.map(item => item.id)
    },

    socialSourcesItems() {
      if (this.socialSources.length) {
        this.setDefaultSelectedMediaSource()
      }
      return this.socialSources.map(item => {
        return { text: item.name, value: item.id }
      })
    },

    seasonItems() {
      if (this.seasons.length === 0) {
        return []
      }
      const seasonItems = [
        {
          text: this.$t('general.current_season'),
          value: {
            from: this.seasons[0].toDate,
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
    },

    reachChartSeries() {
      return {
        name: this.$t('app.brand.profile.audience.broadcast.chart.title'),
        data: this.brand.monthlyReach.map(item => {
          return {
            name: this.$filters.date(item.date, 'MMM'),
            date: item.date,
            hashtags: item.hashtags,
            mentions: item.mentions,
            tags: item.tags,
            y: item.sum
          }
        })
      }
    },

    broadcastChartSeries() {
      return {
        name: this.$t('app.brand.profile.audience.broadcast.chart.title'),
        data: this.brand.monthlyBroadcast.map(item => {
          return {
            name: this.$filters.date(item.date, 'MMM'),
            date: item.date,
            matches: item.matches,
            y: item.stations
          }
        })
      }
    },

    test() {
      return groupBy(
        this.socialAccountsHistory,
        item => item.recordedAtMonthYear
      )
    },

    growthChartSeries() {
      return {
        name: this.$t('app.brand.profile.audience.activity_valuation.title'),
        data: this.brand.valueGrowth.map(item => {
          return {
            name: this.$filters.date(item.date, 'MMM'),
            date: item.date,
            growth: item.growth,
            y: item.value,
            growthClasses: getGrowthClasses(item.growth)
          }
        })
      }
    }
  },

  mounted() {
    for (let i = 0; i < 12; i++) {
      this.monthItems.push({
        text: this.$t('general.months.' + i),
        value: i
      })
    }

    this.periodItems = [
      {
        text: 'Last month',
        value: 0
      }
    ]
  },

  methods: {
    setDefaultSelectedMediaSource() {
      this.mediaSource = this.socialSources[0].id
    },

    selectEngagement() {},
    selectEngagementImage() {},
    selectEngagementMonth() {},
    selectValuationMonth() {},
    selectMediaSource() {}
  }
}
</script>

<style lang="postcss" scoped>
.brand__profile__audience {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
  @apply .relative .pb-16;
}

@media (max-width: 768px) {
  .brand__profile__audience {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .brand__profile__audience {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
