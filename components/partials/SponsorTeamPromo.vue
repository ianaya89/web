<template>
  <div>
    <!-- Vision Section  -->
    <div class="xl:min-h-75vh w-full sm:flex bg-white mt-4 sm:mt-0">
      <div class="w-1/5 hidden xl:flex">
        <div class="w-4/5 ml-2" />
      </div>
      <div class="w-full sm:flex xl:w-3/5 feature-section">
        <div class="w-full h-full z-10">
          <div class="sm:mr-8 xl:mr-64 xl:border-l xl:border-r border-grey-l3 h-full flex items-center">
            <appear-transition :percentage-offset="0.1" class="w-full sm:w-5/6 max-w-lg pt-24 sm:pt-64 xl:pt-24">
              <svg-icon class="absolute right-8 right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10" name="ui-elements/quotation-up" />
              <h2 class="pl-12 md:pl-24 xl:pl-8 text-h3 sm:text-h2 leading-none pr-8">
                {{ $t('landing.team.stories.title') }}
              </h2>
              <div class="block sm:hidden w-full sm:w-1/5 pb-10 pt-8 sm:pt-24 relative">
                <appear-transition :percentage-offset="0.1" class="sm:absolute w-full sm:w-120 sm:-ml-72">
                  <img :src="require('../../assets/images/landing/christian_karembeu.jpg')" alt="Christian photo">
                </appear-transition>
              </div>
              <div class="px-12 md:px-24 xl:px-8 pt-8">
                <p class="font-sans font-medium text-grey-d1 text-h7">
                  Christian Karembeu
                </p>
                <p class="font-sans text-grey font-normal text-h7 sm:w-2/3 lg:w-4/5 xl:w-auto">
                  {{ $t('advisors.christian.position') }}
                </p>
              </div>
            </appear-transition>
            <!-- <appear-transition :percentage-offset="0.5" class="mb-16 xl:mb-32 mt-10 sm:mt-24 px-8 sm:px-24 xl:px-0">
              <app-button :title="$t('general.find_out_more')" :btn-class="'primary-lg'" class="w-full sm:w-auto" :show-arrow="true" @clicked="redirectToTeamSignup" />
            </appear-transition> -->
          </div>
        </div>
      </div>
      <div class="hidden sm:block w-full sm:w-1/5 px-8 sm:pt-24 relative">
        <appear-transition :percentage-offset="0.1" class="sm:absolute w-full sm:w-120 sm:-ml-72 xl:-mt-12">
          <img :src="require('../../assets/images/landing/christian_karembeu.jpg')" alt="Christian photo">
        </appear-transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppearTransition from '@/components/transitions/AppearTransition'

export default {
  name: 'SponsorTeamPromo',

  components: {
    AppearTransition
  }
}
</script>

<style lang="postcss" scoped>
</style>
