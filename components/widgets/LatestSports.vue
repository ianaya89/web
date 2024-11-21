<template>
  <div class="w-full">
    <div class="hidden md:block">
      <h3>{{ $t('app.team.dashboard.latest_sport_business_news_by') }} <sport-business-logo /></h3>
      <div class="w-full flex justify-start pt-4 pb-10">
        <latest-news-card
          v-for="(latest, index) in latestNews"
          :key="index"
          class="w-1/4 pr-2 mb-2 mr-6"
          :newsfeed="latest"
        />
      </div>
    </div>
    <div class="block md:hidden mb-8">
      <step-pager :items="latestNews">
        <template v-slot:pager-title>
          <h4 class="my-auto mr-auto pr-10">
            {{ $t('app.team.dashboard.latest_sport_business_news_by') }} <sport-business-logo />
          </h4>
        </template>
        <template v-slot:content="props">
          <latest-news-card
            class="w-full max-w-full"
            :newsfeed="props.item"
          />
        </template>
      </step-pager>
    </div>
  </div>
</template>

<script>
import { createHmac } from 'crypto'
import { parse } from 'rss-to-json'
import SportBusinessLogo from '@/components/SportBusinessLogo'
import LatestNewsCard from '@/components/LatestNewsCard'
import StepPager from '@/components/widgets/StepPager'

export default {
  name: 'LatestSports',

  components: {
    SportBusinessLogo,
    LatestNewsCard,
    StepPager
  },

  data: () => ({
    latestNews: []
  }),

  async fetch() {
    const utmString =
      '?utm_source=sponsor.online&utm_medium=website&utm_campaign=partnership&partner=sponsor.online&hmac='
    const secret = '4jTASZs5rrX6FHILn1Aa'

    const newsFeed = await parse(
      'https://www.sportbusiness.com/sport/football/feed/'
    ).then(feed =>
      feed.items.map(item => {
        const hmac = createHmac('sha256', secret)
          .update(item.link)
          .digest('hex')
        const description = item.description.replaceAll('\n', '')
        return {
          title: item.title,
          description: description.replace(/.*<div>([^<]*).*/, '$1'),
          image: description.replace(/.*src="(.*)" style=.*/, '$1'),
          date: item.published,
          category: item.category,
          url: item.link + utmString + hmac
        }
      })
    )

    // eslint-disable-next-line nuxt/no-this-in-fetch-data
    this.latestNews = newsFeed.slice(0, 4)
  }
}
</script>

<style>
</style>
