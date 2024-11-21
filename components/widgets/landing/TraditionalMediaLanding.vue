<template>
  <div class="w-full ">
    <div class="">
      <h3>
        {{ $t('app.profile.team.fans.tv_print.title') }}
      </h3>
      <div class="mt-12 flex">
        <h6>
          {{ $t('app.profile.team.fans.tv_print.tv.title') }}
        </h6>
        <app-tooltip class="font-normal text-left" :position="'right'">
          <template v-slot:activator>
            <span class="lni-question-circle text-grey mt-1 ml-2" />
          </template>
          <p class="w-64 font-sans">
            {{ $t('app.profile.team.fans.tv_print.tv.description') }}
          </p>
        </app-tooltip>
      </div>
      <hr class="w-full border-b border-grey-l4">
    </div>

    <div>
      <img
        :src="require('../../../assets/images/team/tv-exposure.png')"
        alt="tv exposure image"
        class=""
      >
    </div>

    <div class="mt-6 flex">
      <h6>
        {{ $t('app.profile.team.fans.tv_print.print.title') }}
      </h6>
      <app-tooltip class="font-normal text-left" :position="'right'">
        <template v-slot:activator>
          <span class="lni-question-circle text-grey mt-1 ml-2" />
        </template>
        <p class="w-64 font-sans">
          {{ $t('app.profile.team.fans.tv_print.print.description') }}
        </p>
      </app-tooltip>
    </div>
    <hr class="w-full border-b border-grey-l4">

    <div>
      <img
        :src="require('../../../assets/images/team/print-exposure.png')"
        alt="print exposure image"
        class=""
      >
    </div>
  </div>
</template>

<script>
import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'TraditionalMediaLanding',

  components: {
    AppTooltip
  },

  props: {
    leagueId: {
      type: String,
      default: null
    }
  }
}
</script>
