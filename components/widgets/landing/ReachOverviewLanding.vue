<template>
  <div class="w-full lg:w-1/2 pr-0 lg:pr-6">
    <div class="w-full flex flex-wrap flex-col-reverse sm:flex-row ">
      <div class="w-full sm:w-1/2 pr-4">
        <div class="flex">
          <h6>{{ $t('app.profile.team.fans.web_social_following') }}</h6>
        </div>
        <img
          :src="require('../../../assets/images/team/web-social-table.png')"
          alt="web & social media following image"
          class="pt-4"
        >
      </div>
      <div class="w-full sm:w-1/2 flex justify-center mb-4 sm:mb-0">
        <img
          :src="require('../../../assets/images/team/pie2.png')"
          alt="web & social media following pie chart image"
          class=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReachOverviewLanding'
}
</script>
