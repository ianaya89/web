<template>
  <div class="about-us-page overflow-hidden">
    <!-- Hero Section -->
    <div class="w-full flex relative">
      <!-- <animated-image :src="require('../assets/images/landing.jpg')" alt="Landing image" class="h-auto xl:h-full max-w-none xl:w-full" /> -->
      <div class="hidden sm:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex flex-col xl:border-r pt-24 h-full" />
      </div>
      <div class="xl:w-4/5 flex z-10 pr-32">
        <div class="border-l pt-56 pb-32 flex flex-wrap min-h-256">
          <div>
            <div class="flex flex-wrap xl:flex-no-wrap pl-8 items-center">
              <!-- eslint-disable vue/no-v-html -->
              <h1
                class="uppercase text-5xl sm:text-h1 max-w-md pr-12 leading-none mb-8 xl:mb-0"
                v-html="$t('about_us.title')"
              />
              <div class="sm:w-2/3 xl:w-1/2 text-grey text-lg pr-8">
                <p class="mb-8">
                  {{ $t('about_us.subtitle_1') }}
                </p>
                <p>
                  {{ $t('about_us.subtitle_2') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team member profile - photo right -->
    <div class="w-full flex flex-wrap pb-24 sm:pb-0">
      <div class="hidden xl:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex xl:border-r pt-24 h-full" />
      </div>
      <div class="xl:w-4/5 flex flex-col-reverse sm:flex-row flex-wrap sm:flex-no-wrap z-10 xl:pr-32 items-center">
        <appear-transition :percentage-offset="0.5" class="sm:w-4/5 xl:w-3/5 p-8 xl:p-0 ml-0 sm:ml-8 xl:ml-0">
          <!-- <svg-icon class="absolute right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" /> -->
          <h2 class="pr-8 xl:pr-24 text-h3 sm:text-h2 leading-tight pt-0">
            Christian Karembeu
          </h2>
          <!-- eslint-disable vue/no-v-html -->
          <p class="pr-8 xl:pr-24 w-3/4 sm:w-full sm:max-w-lg text-grey text-h7" v-html="$t('about_us.christian.title')" />
          <!-- eslint-disable vue/no-v-html -->
          <p class="pr-8 xl:pr-24 w-3/4 sm:w-full sm:max-w-lg text-grey text-h7 mt-8" v-html="$t('about_us.christian.description')" />
        </appear-transition>
        <div class="hidden sm:block xl:hidden w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10 h-full">
          <div class="w-3/5 relative flex border-l h-full" />
        </div>
        <div class="w-full sm:w-1/3 xl:w-2/5 relative pt-8 sm:pt-0 sm:pl-10 xl:pl-0 xl:pr-6 flex items-center">
          <div class="xl:w-2/3 overflow-hidden profile-picture">
            <img class="profile-picture sm:-ml-32" :src="require('../assets/images/landing/christian_karembeu.jpg')" alt="Christian Karembeu photo" style="max-width: 32rem;">
          </div>
        </div>
      </div>
    </div>

    <!-- Team member profile - photo left -->
    <div class="w-full flex flex-wrap pb-24 sm:pb-0">
      <div class="hidden xl:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex flex-col xl:border-r pt-24 h-full" />
      </div>
      <div class="xl:w-4/5 flex flex-wrap sm:flex-no-wrap z-10 xl:pr-32">
        <div class="sm:w-1/3 overflow-hidden profile-picture">
          <img class="profile-picture sm:-ml-32" :src="require('../assets/images/landing/kerstin.jpg')" alt="Kerstin Lutz photo" style="max-width: 32rem;">
        </div>
        <div class="hidden sm:block xl:w-1/5 h-full border-r border-grey-l3" />
        <div class="w-full sm:w-4/5 relative pt-8 xl:pt-0 pr-6 sm:px-8 flex items-center">
          <appear-transition :percentage-offset="0.5" class="w-3/4 sm:w-full sm:pr-8">
            <!-- <svg-icon class="absolute right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" /> -->
            <h2 class="pl-8 text-h3 sm:text-h2 leading-tight pr-8 pt-0">
              Kerstin Lutz
            </h2>
            <!-- eslint-disable vue/no-v-html -->
            <p class="px-8 sm:max-w-lg text-grey text-h7" v-html="$t('about_us.kerstin.description')" />
          </appear-transition>
        </div>
      </div>
    </div>

    <!-- Team member profile - photo right -->
    <div class="w-full flex flex-wrap pb-24 sm:pb-0">
      <div class="hidden xl:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex xl:border-r pt-24 h-full" />
      </div>
      <div class="xl:w-4/5 flex flex-col-reverse sm:flex-row flex-wrap sm:flex-no-wrap z-10 xl:pr-32 items-center">
        <appear-transition :percentage-offset="0.5" class="sm:w-4/5 xl:w-3/5 p-8 xl:p-0 ml-0 sm:ml-8 xl:ml-0">
          <!-- <svg-icon class="absolute right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" /> -->
          <h2 class="pr-8 xl:pr-24 text-h3 sm:text-h2 leading-tight pt-0">
            Maximilian von&nbsp;Portatius
          </h2>
          <!-- eslint-disable vue/no-v-html -->
          <p class="pr-8 xl:pr-24 w-3/4 sm:w-full sm:max-w-lg text-grey text-h7" v-html="$t('about_us.max.title')" />
          <!-- eslint-disable vue/no-v-html -->
          <p class="pr-8 xl:pr-24 w-3/4 sm:w-full sm:max-w-lg text-grey text-h7 mt-8" v-html="$t('about_us.max.description')" />
        </appear-transition>
        <div class="hidden sm:block xl:hidden w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10 h-full">
          <div class="w-3/5 relative flex border-l h-full" />
        </div>
        <div class="w-full sm:w-1/3 xl:w-2/5 relative pt-8 sm:pt-0 sm:pl-10 xl:pl-0 xl:pr-6 flex items-center">
          <div class="xl:w-2/3 overflow-hidden profile-picture">
            <img class="profile-picture sm:-ml-32" :src="require('../assets/images/landing/max-02.jpg')" alt="Christian Karembeu photo" style="max-width: 32rem;">
          </div>
        </div>
      </div>
    </div>

    <!-- Team member profile - photo left -->
    <div class="w-full flex flex-wrap pb-24 sm:pb-0">
      <div class="hidden xl:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex flex-col xl:border-r pt-24 h-full" />
      </div>
      <div class="xl:w-4/5 flex flex-wrap sm:flex-no-wrap z-10 xl:pr-32">
        <div class="sm:w-1/3 overflow-hidden profile-picture">
          <img class="profile-picture sm:-ml-32" :src="require('../assets/images/landing/andreas.jpeg')" alt="Ludo Cernak photo" style="max-width: 32rem;">
        </div>
        <div class="hidden sm:block xl:w-1/5 h-full border-r border-grey-l3" />
        <div class="w-full sm:w-4/5 relative pt-8 xl:pt-0 pr-6 sm:px-8 flex items-center">
          <appear-transition :percentage-offset="0.5" class="xl:w-full sm:pr-8">
            <!-- <svg-icon class="absolute right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" /> -->
            <h2 class="pl-8 text-h3 sm:text-h2 leading-tight pr-8 pt-0">
              Andreas Tsochantaris
            </h2>
            <p class="px-8 w-3/4 sm:w-full sm:max-w-lg text-grey text-h7">
              {{ $t('about_us.andreas.title') }}
            </p>
            <!-- eslint-disable vue/no-v-html -->
            <p class="px-8 w-3/4 sm:w-full sm:max-w-lg text-grey text-h7 mt-8" v-html="$t('about_us.andreas.description')" />
          </appear-transition>
        </div>
      </div>
    </div>

    <!-- Team member profile - photo right -->
    <div class="w-full flex flex-wrap pb-24 sm:pb-0">
      <div class="hidden xl:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex xl:border-r pt-24 h-full" />
      </div>
      <div class="xl:w-4/5 flex flex-col-reverse sm:flex-row flex-wrap sm:flex-no-wrap z-10 xl:pr-32 items-center">
        <appear-transition :percentage-offset="0.5" class="sm:w-4/5 xl:w-3/5 p-8 xl:p-0 ml-0 sm:ml-8 xl:ml-0">
          <!-- <svg-icon class="absolute right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" /> -->
          <h2 class="pr-8 xl:pr-24 text-h3 sm:text-h2 leading-tight pt-0">
            Aifric O’Byrne
          </h2>
          <p class="pr-8 xl:pr-24 w-3/4 sm:w-full sm:max-w-lg text-grey text-h7">
            {{ $t('about_us.aifric.title') }}
          </p>
          <!-- eslint-disable vue/no-v-html -->
          <p class="pr-8 xl:pr-24 w-3/4 sm:w-full sm:max-w-lg text-grey text-h7 mt-8" v-html="$t('about_us.aifric.description')" />
        </appear-transition>
        <div class="hidden sm:block xl:hidden w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10 h-full">
          <div class="w-3/5 relative flex border-l h-full" />
        </div>
        <div class="w-full sm:w-1/3 xl:w-2/5 relative pt-8 sm:pt-0 sm:pl-10 xl:pl-0 xl:pr-6 flex items-center">
          <div class="xl:w-2/3 overflow-hidden profile-picture">
            <img class="profile-picture sm:-ml-32" :src="require('../assets/images/landing/Aifric_Corp.jpeg')" alt="Aifric O’Byrne photo" style="max-width: 32rem;">
          </div>
        </div>
      </div>
    </div>

    <!--    <div class="w-full flex flex-wrap pb-24 sm:pb-0">-->
    <!--      <div class="hidden xl:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">-->
    <!--        <div class="w-3/5 relative flex flex-col xl:border-r pt-24 h-full" />-->
    <!--      </div>-->
    <!--      <div class="w-full xl:w-4/5 flex flex-wrap sm:flex-no-wrap z-10 pl-8 sm:pl-12 xl:pl-0 xl:pr-32 xl:mb-16 border-b border-grey">-->
    <!--        <appear-transition>-->
    <!--          <div class="how-to-section sm:mt-24 xl:mt-16">-->
    <!--            <h3 class="uppercase text-3xl border-grey-l3 pb-1 inline">-->
    <!--              {{ $t('about_us.advisors') }}-->
    <!--            </h3>-->
    <!--          </div>-->
    <!--        </appear-transition>-->
    <!--      </div>-->
    <!--    </div>-->


    <!-- Team member profile - photo left -->
    <div class="w-full flex flex-wrap">
      <div class="hidden xl:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex flex-col xl:border-r pt-24 h-full" />
      </div>
      <div class="xl:w-4/5 flex flex-wrap sm:flex-no-wrap z-10 xl:pr-32">
        <div class="sm:w-1/3 overflow-hidden profile-picture">
          <img class="profile-picture -ml-16" :src="require('../assets/images/landing/tyson-02.jpg')" alt="Tyson Henly photo" style="max-width: 32rem;">
        </div>
        <div class="hidden sm:block xl:w-1/5 h-full border-r border-grey-l3" />
        <div class="w-full sm:w-4/5 relative pt-8 xl:pt-0 pr-6 sm:px-8 flex items-center">
          <appear-transition :percentage-offset="0.5" class="w-4/5 sm:w-full sm:pr-8">
            <!-- <svg-icon class="absolute right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" /> -->
            <h2 class="pl-8 text-h3 sm:text-h2 leading-tight pr-8 pt-0">
              Tyson Henly
            </h2>
            <!-- eslint-disable vue/no-v-html -->
            <p class="px-8 max-w-full sm:max-w-lg text-grey text-h7" v-html="$t('about_us.tyson.description')" />
          </appear-transition>
        </div>
      </div>
    </div>

    <!-- Team member profile - photo right -->
    <div class="w-full flex flex-wrap pb-24 sm:pb-0">
      <div class="hidden xl:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex xl:border-r pt-24 h-full" />
      </div>
      <div class="xl:w-4/5 flex flex-col-reverse sm:flex-row flex-wrap sm:flex-no-wrap z-10 xl:pr-32 items-center">
        <appear-transition :percentage-offset="0.5" class="w-4/5 xl:w-3/5 p-8 xl:p-0 ml-0 sm:ml-8 xl:ml-0 -ml-24 sm:-ml-0">
          <!-- <svg-icon class="absolute right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" /> -->
          <h2 class="pr-8 xl:pr-24 text-h3 sm:text-h2 leading-tight pt-0">
            Kay Dammholz
          </h2>
          <!-- eslint-disable vue/no-v-html -->
          <p class="pr-8 xl:pr-24 max-w-full sm:max-w-lg text-grey text-h7" v-html="$t('about_us.kay.title')" />
          <!-- eslint-disable vue/no-v-html -->
          <p class="pr-8 xl:pr-24 max-w-full sm:max-w-lg text-grey text-h7 mt-8" v-html="$t('about_us.kay.description')" />
        </appear-transition>
        <div class="hidden sm:block xl:hidden w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10 h-full">
          <div class="w-3/5 relative flex border-l h-full" />
        </div>
        <div class="w-full sm:w-1/3 xl:w-2/5 relative pt-8 sm:pt-0 sm:pl-10 xl:pl-0 xl:pr-6 flex items-center">
          <div class="xl:w-2/3 overflow-hidden profile-picture">
            <img class="profile-picture sm:-ml-32" :src="require('../assets/images/landing/kay-02.jpg')" alt="Kay Dammholz photo" style="max-width: 32rem;">
          </div>
        </div>
      </div>
    </div>


    <div class="w-full flex bg-white pb-32 sm:pb-64">
      <div class="w-full flex flex-wrap xl:mt-0">
        <div class="w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
          <div class="w-3/5 relative flex flex-col xl:border-r pt-24 h-full" />
        </div>
        <div class="xl:w-4/5 flex z-10">
          <div class="w-full block sm:flex">
            <appear-transition :percentage-offset="0.5" class="xl:w-2/3 xl:-ml-6 px-8 xl:px-0 relative">
              <svg-icon class="absolute right-0 mt-16 mr-16 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" />
              <!-- eslint-disable vue/no-v-html -->
              <h2 class="text-5xl sm:text-6xl leading-none mt-24 xl:mt-32 mb-10 sm:pr-32" v-html="$t('about_us.close_deals')" />
              <p class="text-grey text-lg">
                {{ $t('about_us.team_info') }}
              </p>
            </appear-transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AnimatedImage from '@/components/AnimatedImage'
// import AppButton from '@/components/AppButton'
// import AnimatedButton from '@/components/AnimatedButton'
// import TweenContent from '@/components/TweenContent'
import AppearTransition from '@/components/transitions/AppearTransition'
// import AnimatedFeatures from '@/components/widgets/landing/AnimatedFeatures'

export default {
  layout: 'landing',

  name: 'LandingIndex',

  components: {
    AppearTransition
    // AnimatedImage,
    // AnimatedFeatures,
    // AppButton
    // AnimatedButton,
    // TweenContent
    // SlickSlider
  },

  mounted() {
    this.$store.dispatch('public-menu/setPermanentMenu', true)
  },

  destroyed() {
    this.$store.dispatch('public-menu/setPermanentMenu', false)
  },

  methods: {
    redirectToTeamSignup() {
      return this.$router.push(this.localePath({ name: 'register' }))
    }
  }
}
</script>

<style lang="postcss" scoped>
.aubout-us-page {
  @apply .w-full;
  counter-reset: section;

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
  background-image: url('../assets/images/public-landing-bg-01.jpg');
}
.hero-bg-img-02 {
  background-image: url('../assets/images/public-landing-bg-02.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.hero-bg-img-03 {
  background-image: url('../assets/images/public-landing-bg-03.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
