<template>
  <div class="public-page overflow-hidden">
    <!-- Hero Section -->
    <div class="min-h-screen w-full flex relative">
      <div class="w-full h-screen flex absolute top-0">
        <transition name="clip-path-slide-up" :appear="true">
          <div class="w-full h-full hero-bg-img-01 bg-cover bg-right bg-no-repeat" />
        </transition>
      </div>
      <!-- <animated-image :src="require('../assets/images/landing.jpg')" alt="Landing image" class="h-auto xl:h-full max-w-none xl:w-full" /> -->
      <div class="w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-8 z-10">
        <div class="w-3/5 relative flex flex-col xl:border-r border-light-line pt-24 h-full">
          <div class="scroll-info hidden xl:block">
            <span>
              {{ $t('public.scroll') }}
            </span>
          </div>
        </div>
      </div>
      <div class="xl:w-3/5 flex z-10">
        <div class="border-l border-light-line sm:pt-24 text-white flex flex-wrap items-center">
          <div class="pt-16">
            <div class="pl-8">
              <h1 class="uppercase text-h2 sm:text-h1 max-w-md pr-12 leading-none">
                {{ $t('landing.team.title') }}
              </h1>
              <transition name="fade-up-delayed" :appear="true">
                <h3 class="mt-2 mb-16 text-h6 xl:text-h5 font-serif max-w-none sm:max-w-sm pr-8 xl:pr-20 leading-normal">
                  {{ $t('landing.team.subtitle') }}
                </h3>
              </transition>
            </div>
            <transition name="fade-up-delayed" :appear="true">
              <animated-button :title="$t('landing.team.title_signup')" :show-arrow="true" @clicked="redirectToTeamSignup" />
            </transition>
          </div>
        </div>
      </div>
      <div class="w-1/5 hidden xl:flex pr-12 z-10">
        <div class="w-full border-r border-light-line" />
      </div>
    </div>

    <sponsor-team-promo class="z-10 relative" />

    <!-- Map Section  -->
    <div
      v-if="countriesValuationMap.length"
      class="w-full flex bg-white mt-16 lg:mt-56 xl:mt-0"
    >
      <div class="w-1/5 hidden xl:flex">
        <div class="w-4/5 ml-2" />
      </div>
      <div class="w-full xl:w-4/5 xl:pt-32">
        <appear-transition :percentage-offset="0.1" class="w-full block flex flex-wrap-reverse sm:flex-wrap h-full relative">
          <highlighted-world-map
            class="w-full"
            :map-json="mapJson"
            :specific-options="mapOptions"
            :tooltip="false"
            :series="countryItemsMapSeries"
            @country-clicked="redirectToTeamSignup"
          />
          <h3 class="w-full section-title uppercase sm:absolute max-w-xs pl-8 sm:pl-20 lg:pl-10 xl:pl-0 sm:pt-24">
            {{ $t('landing.value_of_inventories') }}
          </h3>
        </appear-transition>
      </div>
    </div>

    <div class="xl:min-h-75vh w-full flex bg-white mt-4 sm:mt-0">
      <div class="w-1/5 hidden xl:flex">
        <div class="w-4/5 ml-2" />
      </div>
      <div class="w-full xl:w-4/5 feature-section lg:border-l border-grey-l3">
        <!-- How It Works Section -->
        <div class="w-full block sm:flex">
          <div class="sm:w-1/3 px-8 sm:pl-20 xl:pl-10 pr-6">
            <h2 class="section-title mt-24 sm:mt-56 xl:mt-32 max-w-xs">
              {{ $t('landing.team.how_it_works.title') }}
            </h2>
          </div>
          <div class="sm:w-2/3 sm:mr-8 xl:mr-64 sm:border-l lg:border-r border-grey-l3">
            <appear-transition>
              <div class="how-to-section sm:mt-48 xl:mt-32">
                <h3 class="uppercase text-h4 border-b-8 border-grey-l3 pb-1 inline">
                  {{ $t('landing.team.how_it_works.sign_up.title') }}
                </h3>
                <p class="how-to-text">
                  {{ $t('landing.team.how_it_works.sign_up.body') }}
                </p>
              </div>
            </appear-transition>
            <appear-transition>
              <div class="how-to-section">
                <h3 class="uppercase text-h4 border-b-8 border-grey-l3 pb-1 inline">
                  {{ $t('landing.team.how_it_works.upload.title') }}
                </h3>
                <p class="how-to-text">
                  {{ $t('landing.team.how_it_works.upload.body') }}
                </p>
              </div>
            </appear-transition>
            <appear-transition>
              <div class="how-to-section">
                <h3 class="uppercase text-h4 border-b-8 border-grey-l3 pb-1 inline">
                  {{ $t('landing.team.how_it_works.connections.title') }}
                </h3>
                <p class="how-to-text">
                  {{ $t('landing.team.how_it_works.connections.body') }}
                </p>
              </div>
            </appear-transition>
            <appear-transition>
              <div class="how-to-section">
                <h3 class="uppercase text-h4 border-b-8 border-grey-l3 pb-1 inline">
                  {{ $t('landing.team.how_it_works.deals.title') }}
                </h3>
                <p class="how-to-text">
                  {{ $t('landing.team.how_it_works.deals.body') }}
                </p>
              </div>
            </appear-transition>
            <div class="px-8 sm:px-0">
              <app-button :title="$t('general.get_started')" :btn-class="'primary-lg'" :show-arrow="true" class="w-full sm:w-auto" @clicked="redirectToTeamSignup" />
            </div>
            <iframe
              title="SPONSOR.ONLINE video"
              class="w-full mt-16 mb-24 lg:mb-48 h-64 xl:h-128"
              src="https://www.youtube-nocookie.com/embed/iR9WK373sQo?controls=0&rel=0"
              frameborder="0"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </div>


    <div class="w-full flex bg-white mt-4 sm:mt-16 xl:mt-0 mb-80 sm:mb-0">
      <div class="w-1/5 hidden xl:flex">
        <div class="w-4/5 ml-2" />
      </div>
      <div class="w-full xl:w-4/5 feature-section lg:border-l border-grey-l3">
        <!-- Take a Look Under the Hood  -->
        <animated-features
          :items="
            [
              {
                name: $t('landing.team.under_hood.dashboard'),
                image: require('../assets/images/landing/dashboard.jpg')
              },
              {
                name: $t('landing.team.under_hood.inventory'),
                image: require('../assets/images/landing/inventory.png')
              },
              {
                name: $t('landing.team.under_hood.presentation'),
                image: require('../assets/images/landing/presentation.png')
              }
            ]"
          :force-animate="true"
          :title="$t('landing.team.under_hood.title')"
          :body="$t('landing.team.under_hood.body')"
        />
      </div>
    </div>

    <!-- Save Money Save Time Section -->
    <div class="w-full flex flex-wrap">
      <div class="w-full xl:w-2/5 lg:border-r border-grey-l3 flex pt-24 sm:pt-40 xl:pt-48">
        <div class="w-full xl:w-auto xl:max-w-xxs xl:mx-auto px-8 xl:px-0">
          <div class="flex flex-wrap sm:flex-no-wrap xl:flex-wrap">
            <div class="pr-8">
              <tween-content :local-query-selector="'h2'" :duration="1200">
                <h2 class="text-5xl lg:text-6xl font-medium mt-8 xl:mt-0 leading-none">
                  {{ $t('landing.team.save_money.annual_sponsorship.title') }}
                </h2>
              </tween-content>
              <p class="tween-label">
                {{ $t('landing.team.save_money.annual_sponsorship.body') }}
              </p>
            </div>

            <div class="pr-8">
              <tween-content :local-query-selector="'h2'">
                <h2 class="text-5xl lg:text-6xl font-medium mt-8 leading-none">
                  {{ $t('landing.team.save_money.revenue.title') }}
                </h2>
              </tween-content>
              <p class="tween-label">
                {{ $t('landing.team.save_money.revenue.body') }}
              </p>
            </div>

            <div class="pr-8">
              <tween-content :local-query-selector="'h2'">
                <h2 class="text-5xl lg:text-6xl font-sans font-medium mt-8 leading-none">
                  {{ $t('landing.team.save_money.agency_fees.title') }}
                </h2>
              </tween-content>
              <p class="tween-label">
                {{ $t('landing.team.save_money.agency_fees.body') }}
              </p>
            </div>
          </div>

          <app-button class="mt-10 w-full xl:w-auto hidden" :title="'Add your team'" :btn-class="'primary-lg'" @clicked="redirectToTeamSignup" />
          <ul class=" pt-24 xl:pt-32 pb-10">
            <li class="inline uppercase font-medium color-grey-l1 text-h4 mr-4 pr-2 text-black border-b-8 border-grey-l3">
              {{ $t('landing.team.save_money.costs.label') }}
            </li>
          </ul>
          <ul class="saving-list">
            <li class="sponsor-item">
              {{ $t('landing.team.save_money.costs.agencies.sponsor') }}
            </li>
            <li class="agencies-item">
              {{ $t('landing.team.save_money.costs.agencies.agencies') }}
            </li>
          </ul>
        </div>
      </div>

      <appear-transition :percentage-offset="0.4">
        <div class="xl:w-4/5 pt-24 xl:pt-48 relative flex flex-col-reverse xl:flex-col xl:pb-16">
          <div class="px-8">
            <div class="max-w-xs -mt-2 pt-24 sm:pt-48 xl:pt-4">
              <h2 class="uppercase text-6xl font-medium leading-none">
                {{ $t('landing.team.save_money.title') }}
              </h2>
            </div>
            <p class="max-w-md font-medium text-h7 text-grey my-6">
              {{ $t('landing.team.save_money.p1') }}
            </p>
            <h2 class="text-h3 xl:text-h2 font-medium leading-tight">
              {{ $t('landing.team.save_money.subtitle1') }}
            </h2>
            <p class="font-medium text-h7 max-w-md text-grey mt-2 mb-8">
              {{ $t('landing.team.save_money.p2') }}
            </p>
            <div class="max-w-sm">
              <h2 class="text-h3 xl:text-h2 font-medium">
                {{ $t('landing.team.save_money.subtitle2') }}
              </h2>
            </div>
          </div>
          <img class="save-chart-image -mt-8 sm:-mt-24 xl:-mt-8 xl:-ml-48 pb-16 absolute xl:relative" :src="require('../assets/images/landing/save__chart.png')" :alt="$t('landing.team.save_money.chart_alt')">
        </div>
      </appear-transition>
    </div>

    <!-- Team & Advisors Section -->
    <!--    <div class="w-full flex flex-wrap pt-32 sm:pt-8">-->
    <!--      <div class="w-full xl:w-1/2 flex">-->
    <!--        <div class="w-1/6 sm:w-16 xl:w-1/4" />-->
    <!--        <appear-transition :percentage-offset="0.5">-->
    <!--          <div class="w-5/6 xl:w-3/4 border-l border-grey-l3 md:pt-24 xl:pt-80 pb-16">-->
    <!--            <h2 class="pl-8 text-h1 uppercase leading-none pr-8 xl:pt-48 xl:pt-0">-->
    <!--              {{ $t('landing.team.advisors.title') }}-->
    <!--            </h2>-->
    <!--            <div class="px-8 max-w-full xl:max-w-xs pt-4">-->
    <!--              <p class="text-grey text-h7">-->
    <!--                {{ $t('landing.team.advisors.body') }}-->
    <!--              </p>-->
    <!--            </div>-->
    <!--            <app-button :title="$t('general.find_out_more')" :btn-class="'primary-lg'" class="mt-12" @clicked="redirectToTeamSignup" />-->
    <!--          </div>-->
    <!--        </appear-transition>-->
    <!--      </div>-->
    <!--      <div class="w-full xl:w-1/2 relative h-almostScreen xl:h-screen">-->
    <!--        <slick-slider :items="advisors" />-->
    <!--      </div>-->
    <!--    </div>-->

    <!-- Final CTA Section -->
    <div class="w-full flex flex-wrap xl:-mt-2">
      <div class="w-4/5 xl:w-2/5 border-r border-grey-l3 flex px-8 xl:px-0 pb-8 xl:pb-0">
        <div class="w-full xl:w-auto xl:max-w-xxs xl:mx-auto pt-24 xl:pt-32">
          <div class="flex flex-wrap sm:flex-no-wrap xl:flex-wrap justify-between">
            <div class="pr-8 xl:w-full">
              <tween-content :local-query-selector="'h2'">
                <h2 class="text-5xl lg:text-6xl font-medium leading-tight mt-8 xl:mt-0">
                  {{ $t('landing.team.deals.clubs.title') }}
                </h2>
              </tween-content>
              <p class="tween-label">
                {{ $t('landing.team.deals.clubs.body') }}
              </p>
            </div>
            <div class="pr-8 xl:w-full">
              <tween-content :local-query-selector="'h2'" :duration="1200">
                <h2 class="text-5xl lg:text-6xl font-sans font-medium mt-8">
                  {{ $t('landing.team.deals.brands.title') }}
                </h2>
              </tween-content>
              <p class="tween-label">
                {{ $t('landing.team.deals.brands.body') }}
              </p>
            </div>
            <div class="pr-8 xl:w-full">
              <tween-content :local-query-selector="'h2'">
                <h2 class="text-5xl lg:text-6xl font-medium mt-8">
                  {{ $t('landing.team.deals.reg_brands.title') }}
                </h2>
              </tween-content>
              <p class="tween-label">
                {{ $t('landing.team.deals.reg_brands.body') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <appear-transition :percentage-offset="0.5">
        <div class="w-full relative pt-24 xl:pt-32 pb-32 xl:pb-32">
          <div class="max-w-md -mt-2 px-8 pt-4">
            <h2 class="uppercase text-h2 sm:text-6xl font-medium leading-none">
              {{ $t('landing.team.deals.title') }}
            </h2>
          </div>
          <p class="max-w-md font-medium text-h6 xl:text-h7 text-grey mt-6 mb-16 px-8">
            {{ $t('landing.team.deals.body') }}
          </p>
          <div class="px-8 xl:px-0 ">
            <app-button :title="$t('general.lets_get_started')" :btn-class="'primary-lg'" :show-arrow="true" class="w-full sm:w-auto" @clicked="redirectToTeamSignup" />
          </div>
        </div>
      </appear-transition>
    </div>

    <div class="w-full flex flex-wrap xl:-mt-2">
      <div class="w-full lg:w-1/2 xl:w-2/5 border-r border-grey-l3 flex pb-8 xl:pb-0 xl:justify-end">
        <appear-transition :percentage-offset="0.4" class="relative w-full xl:w-auto">
          <iframe
            title="SPONSOR.ONLINE video"
            class="w-full xl:w-128 h-80 sm:h-128 lg:h-80"
            src="https://www.youtube.com/embed/2jcX3JJ9udA?controls=0&rel=0"
            frameborder="0"
            allowfullscreen
          />
        </appear-transition>
      </div>
      <appear-transition :percentage-offset="0.5">
        <div class="w-full lg:w-1/2 lg:w-full relative sm:pt-8 lg:pt-16 xl:pt-32 pb-32 xl:pb-32">
          <div class="pl-8 lg:pt-16 pr-2 sm:flex items-end">
            <div class="xl:mb-16">
              <p class="font-sans font-medium text-grey-d1 text-h7">
                Kerstin Lutz, SPONSOR.ONLINE Advisory Board
              </p>
              <p class="font-sans text-grey font-normal text-h7">
                Managing Director Partnership Management, TEAM Marketing
              </p>
              <app-button title="Meet our team" :btn-class="'link'" class="mt-8 w-auto" :show-arrow="true" @clicked="redirectToAboutUs" />
            </div>
            <!-- <appear-transition :percentage-offset="0.6">
              <img class="w-full sm:w-auto" :src="require('../assets/images/landing/kerstin.jpg')" alt="Kerstin Lutz photo">
            </appear-transition> -->
          </div>
        </div>
      </appear-transition>
    </div>
  </div>
</template>

<script>
// import AnimatedImage from '@/components/AnimatedImage'
import geojson from '@highcharts/map-collection/custom/europe.geo.json'
import AppButton from '@/components/AppButton'
import AnimatedButton from '@/components/AnimatedButton'
import TweenContent from '@/components/TweenContent'
import AppearTransition from '@/components/transitions/AppearTransition'
import AnimatedFeatures from '@/components/widgets/landing/AnimatedFeatures'
import HighlightedWorldMap from '@/components/charts/HighlightedWorldMap'
import { landingMapDataLabelFormatter } from '@/services/chartFormatters'
import { LandingPageMapQuery } from '@/services/graphql'
import SponsorTeamPromo from '@/components/partials/SponsorTeamPromo'

export default {
  layout: 'landing',

  name: 'LandingIndex',

  components: {
    AppearTransition,
    // AnimatedImage,
    AnimatedFeatures,
    AppButton,
    AnimatedButton,
    SponsorTeamPromo,
    HighlightedWorldMap,
    TweenContent
    // SlickSlider
  },

  apollo: {
    countriesValuationMap: LandingPageMapQuery
  },

  data: () => ({
    advisors: [],
    mapJson: geojson,
    countriesValuationMap: [],
    mapOptions: {
      mapNavigation: {
        enabled: false
      },
      chart: {
        backgroundColor: 'transparent',
        events: {
          load() {
            this.mapZoom(0.6, 0, 5000)
          }
        }
      },
      colorAxis: {
        min: 0,
        max: null,
        stops: [
          [0, 'rgba(254,232,231)'],
          [0.1, 'rgba(254,232,231)'],
          [0.3, 'rgba(254,232,231)'],
          [0.55, 'rgba(254,232,231)'],
          [0.6, 'rgba(254,232,231)'],
          [0.8, 'rgba(254,232,231)'],
          [1, 'rgba(254,232,231)']
        ]
      }
    }
  }),

  computed: {
    countryItemsMapSeries() {
      return {
        borderColor: 'white',
        borderWidth: 2,
        nullColor: '#F2F2F2',
        className: 'valuationSeries',
        dataLabels: {
          enabled: true,
          color: '#000',
          useHTML: true,
          formatter: landingMapDataLabelFormatter(this)
        },
        data: this.countriesValuationMap.map(item => {
          return {
            name: item.country.name,
            countryId: item.country.id,
            value: item.valuation
          }
        })
      }
    }
  },

  mounted() {
    this.advisors = [
      {
        name: 'Christian Karembeu',
        link: 'https://www.linkedin.com/in/christiankarembeu/',
        position: this.$t('advisors.christian.position'),
        image: require('../assets/images/landing/christian.jpg')
      },
      {
        name: 'Maximilian von Portatius',
        link: 'https://www.linkedin.com/in/maximilian-von-portatius/',
        position: this.$t('advisors.max.position'),
        image: require('../assets/images/landing/max.jpg')
      },
      {
        name: 'Kay Dammholz',
        link: 'https://www.linkedin.com/in/kay-dammholz-7b1a2943/',
        position: this.$t('advisors.kay.position'),
        image: require('../assets/images/landing/kay.jpg')
      },
      {
        name: 'Tyson Henly',
        link: 'https://www.linkedin.com/in/tysonhenly/',
        position: this.$t('advisors.tyson.position'),
        image: require('../assets/images/landing/tyson.jpg')
      }
    ]
  },

  methods: {
    redirectToTeamSignup() {
      return this.$router.push(this.localePath({ name: 'register-team' }))
    },

    redirectToAboutUs() {
      return this.$router.push(this.localePath({ name: 'about-us' }))
    }
  }
}
</script>

<style lang="postcss">
.public-page {
  @apply .w-full;
  counter-reset: section;

  .valuation-map-item-label {
    @apply .bg-red .text-white .px-2 .py-px .relative;
    top: -1rem;

    &::before {
      @apply .border-white .bg-red .absolute .border-b .border-l;
      left: 1.05rem;
      bottom: -0.35rem;
      content: ' ';
      width: 0.625rem;
      height: 0.625rem;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }

  .valuationSeries {
    path {
      @apply .cursor-pointer;
    }
    path.highcharts-null-point {
      @apply .cursor-default;
    }
  }

  .feature-section {
    margin-left: -2.75rem;
  }

  @media (max-width: 991px) {
    .feature-section {
      margin-left: 0rem;
      .cta-button {
        padding-right: 0.5rem;
        button {
          margin-left: 2rem;
        }
      }
    }
  }

  .scroll-info {
    @apply .font-serif .uppercase .text-grey-l3 .border-r-2 .border-red .relative .h-8;
    margin-top: 36rem;
    margin-right: -2px;

    span {
      @apply .absolute .block;
      right: -4.5rem;
      top: 2rem;
      transform-origin: 0 0;
      transform: rotate(-90deg);
    }
  }

  .tween-label {
    @apply .font-sans .font-medium .text-grey .uppercase .max-w-xxs;
  }

  @media (max-width: 576px) {
    .tween-label {
      @apply .text-h6;
    }
  }

  .section-title {
    @apply .text-h1 .font-medium .uppercase .leading-none;
  }

  @media (max-width: 576px) {
    .section-title {
      @apply .text-h2;
    }
  }

  .how-to-text {
    @apply .text-grey .mt-8 .text-h7 .font-medium .max-w-xs;
  }

  .how-to-section {
    @apply .relative .border-b .border-grey-l3 .pl-8 .pr-16 .pb-10 .pt-12;

    &:before {
      @apply .text-grey-l4 .uppercase .absolute .font-medium .top-0;
      font-size: 6rem;
      right: 2rem;
      counter-increment: section;
      content: counter(section);
    }
  }

  .save-chart-image {
    @apply .top-0;
    transition: transform 200ms ease-in-out;
    will-change: transform;

    &:hover {
      transform: scale(1.02);
    }
  }

  img {
    &.save-chart-image {
      max-width: 110%;
    }
  }

  .saving-list {
    li {
      @apply .text-h5 .text-grey .relative .pl-6;

      &:before {
        @apply .absolute .left-0 .block;
        content: ' ';
        width: 16px;
        height: 16px;
        top: 6px;
      }

      &.agencies-item {
        &:before {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }

      &.sponsor-item {
        &:before {
          background-color: #1fc9ff;
        }
      }
    }
  }

  .clearfix {
    overflow: auto;
  }
}

.hero-bg-img-01 {
  background-image: url('../assets/images/main-page.jpg');
}
</style>
