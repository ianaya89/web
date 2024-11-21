<template>
  <div class="bg-white flex flex-col p-4 shadow-hover max-w-xs">
    <div class="flex-1 whitespace-normal">
      <div class="text-white p-2 inline-block bg-black">
        {{ $get(team,'genre','-') }}
      </div>
      <img
        :src="$get(team,'imageURL','')"
        alt="event image"
      >
      <div class="text-left font-bold text-lg">
        {{ $get(team,'name','-') }}
      </div>
      <div class="text-sm text-gray mt-4">
        {{ $get(team,'date','-') }}
      </div>
      <div> {{ $get(team,'venueName','-') }}</div>
      <div>{{ $get(team,'city','-') }},{{ $get(team,'country','-') }}</div>
    </div>
    <hr>
    <div class="text-center mt-5">
      <app-button :show-arrow="true" class="view-event-button" :title="$t('app.marketplace.categories.view-event')" @clicked="ViewEvent($get(team,'url','-') + '?so=' + $get(team,'id','-') + '&utm_medium=referral&utm_source=sponsor-online')" />
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'HospitalityCard',

  components: {
    AppButton
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    team: {
      type: Object,
      required: true
    }
  },

  computed: {},

  methods: {
    ViewEvent(eventURL) {
      window.open(eventURL, '_blank')
    }
  }
}
</script>

<style scoped>
.view-event-button {
  background-color: #040720;
}
</style>
