<template>
  <div class="w-full lg:w-1/2 pl-0 lg:pl-6 mt-10 lg:mt-0">
    <h6 class="float-right">
      <img
        :src="require('../../../assets/images/team/fans-num.png')"
        alt="fans overview number image"
        class=""
      >
    </h6>
    <h6>
      {{ $t('app.profile.team.fans.fans_last_season') }}
    </h6>
    <div class="pt-4 pb-4">
      <img
        :src="require('../../../assets/images/team/bar-chart.png')"
        alt="fans overview bar chart image"
        class=""
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'FansOverviewLanding'
}
</script>
