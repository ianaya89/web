<template>
  <div class="features-page overflow-hidden">
    <div class="xl:min-h-screen w-full flex mt-32 bg-white">
      <div class="pr-8 xl:pr-0 sm:w-1/6" />
      <div class="xl:w-5/6 border-l border-grey-l3">
        <!-- Take a Look Under the Hood  -->
        <animated-features
          :items="features1"
          :force-animate="true"
          :title="$t('landing.team.under_hood.title')"
          :body="$t('landing.team.under_hood.body')"
        />
      </div>
    </div>

    <div class="xl:min-h-screen w-full flex justify-center mt-48 xl:mt-0 bg-white">
      <div class="w-full max-w-4xl">
        <!-- Take a Look Under the Hood  -->
        <animated-features
          :items="features2"
          :title="$t('landing.team.under_hood.title')"
          :body="$t('landing.team.under_hood.body')"
          :left-images="true"
        />
      </div>
      <div class="right-col border-l border-grey-l3 pr-48 xxl:pr-72" />
    </div>

    <div class="xl:min-h-screen w-full flex mt-48 xl:mt-0 bg-white">
      <div class="pr-8 xl:pr-0 sm:w-1/6" />
      <div class="xl:w-5/6 border-l border-grey-l3">
        <!-- Take a Look Under the Hood  -->
        <animated-features
          :items="features3"
          :force-animate="true"
          :title="$t('landing.team.under_hood.title')"
          :body="$t('landing.team.under_hood.body')"
        />
      </div>
    </div>

    <div class="w-full flex flex-wrap items-center bg-white mt-8 sm:mt-32 xl:mt-0">
      <div class="w-full sm:w-1/2 border-r border-grey-l3 flex pt-24">
        <img :src="require('../assets/images/landing/features.png')" class="h-96 xl:h-128 sm:ml-auto" alt="features image">
      </div>
      <div class="w-full sm:w-1/2 pb-16">
        <appear-transition ref="appearTransition" :percentage-offset="0.5">
          <div class="px-10">
            <h2 class="section-title mt-2 xl:mt-32 max-w-xs">
              {{ $t('features.manage_inventory.headline') }}
            </h2>
            <p class="font-medium text-h7 text-grey max-w-xxs xl:max-w-sm pt-4" />
            <h3 class="mt-2 xl:mt-32 max-w-xs">
              {{ $t('features.manage_inventory.cta') }}
            </h3>
            <p class="font-medium text-h7 text-grey max-w-xxs xl:max-w-sm pt-4" />
          </div>
        </appear-transition>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedFeatures from '@/components/widgets/landing/AnimatedFeatures'
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  layout: 'landing',

  name: 'Features',

  components: {
    AnimatedFeatures,
    AppearTransition
  },

  computed: {
    features1() {
      return [
        {
          name: this.$t('landing.team.under_hood.dashboard'),
          image: require('../assets/images/landing/dashboard.jpg')
        }
      ]
    },

    features2() {
      return [
        {
          name: this.$t('landing.team.under_hood.inventory'),
          image: require('../assets/images/landing/inventory.png')
        }
      ]
    },

    features3() {
      return [
        {
          name: this.$t('landing.team.under_hood.presentation'),
          image: require('../assets/images/landing/presentation.png')
        }
      ]
    }
  },

  mounted() {
    this.$store.dispatch('public-menu/setPermanentMenu', true)
  },

  destroyed() {
    this.$store.dispatch('public-menu/setDefault')
  }
}
</script>

<style lang="postcss">
.features-page {
  @apply .w-full .pb-24 .pt-4;

  .section-title {
    @apply .text-h1 .font-medium .uppercase .leading-none;
  }

  @media (max-width: 640px) {
    .right-col {
      @apply .pr-16;
    }
  }

  @media (min-width: 641px) and (max-width: 1439px) {
    .right-col {
      @apply .pr-24;
    }
  }

  @media (min-width: 992px) and (max-width: 1439px) {
    .right-col {
      @apply .pr-32;
    }
  }
}
</style>
