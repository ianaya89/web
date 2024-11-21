<template>
  <div class="w-full">
    <div class="w-full flex px-2">
      <div class="mr-auto">
        <label-chart :label="$filters.percentage($get(unit, 'entity.profileCompletion', 0)/100)" :chart-value="$get(unit, 'entity.profileCompletion', 0)/100" :info="$t('app.team.dashboard.profile_completed')" />
      </div>
    </div>

    <div class="w-full bg-white shadow-xl px-4 py-8">
      <step-pager :items="profileSuggestions">
        <template v-slot:pager-title>
          <h6 class="my-auto mr-auto">
            {{ $t('app.team.dashboard.strengthen_your_profile') }}
          </h6>
        </template>
        <template v-slot:content="props">
          <div class="mx-px w-full bg-black text-white font-medium p-6 flex">
            <span class="my-auto text-left uppercase text-h6 md:text-h4">{{ props.item }}</span>
          </div>
        </template>
      </step-pager>

      <div class="font-medium mt-6">
        <app-button :btn-class="'link'" @clicked="openHubspotChat()">
          {{ $t('app.team.dashboard.request_help') }}
        </app-button>
        <span class="text-grey font-serif">{{ $t('app.team.dashboard.request_help_sentence') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import LabelChart from '@/components/LabelChart'
import { ActiveUnitQuery, MeQuery } from '@/services/graphql'
import StepPager from '@/components/widgets/StepPager'
import AppButton from '@/components/AppButton'
import { openHubspotChat } from '@/plugins/hubspot'

export default {
  name: 'ProfileCompleted',

  components: {
    StepPager,
    LabelChart,
    AppButton
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: ActiveUnitQuery(function() {
      return { id: this.unitId }
    }),
    me: MeQuery
  },

  computed: {
    profileSuggestions() {
      return this.$get(
        this.$i18n.messages[this.$i18n.locale],
        'app.profile.complete_tips',
        []
      )
    }
  },

  methods: {
    openHubspotChat
  }
}
</script>

<style scoped>
</style>
