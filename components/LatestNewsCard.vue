<template>
  <div class="flex flex-col justify-between bg-white shadow-hover">
    <div class="news-img-wrapper">
      <img
        :src="newsfeed.image"
        alt="news feed image"
      >
      <span class="news-tag px-2 py-1">{{ newsfeed.category }}</span>
      <div class="p-4">
        <div class="flex-1 whitespace-normal">
          <div class="news-title mt-1 mb-2 text-2xl text-left font-bold text-lg" v-html="DecodeTitle" />
        </div>
      </div>
    </div>
    <div class="p-4">
      <div class="flex-1 whitespace-normal">
        <div class="news-content" v-html="DecodeDescription" />
      </div>
    </div>
    <div class="mt-5">
      <app-button :show-arrow="true" class="view-event-button" :title="$t('general.read-more')" @clicked="ViewEvent($get(newsfeed,'url','-'))" />
    </div>
  </div>
</template>

  <script>
import AppButton from '@/components/AppButton'

export default {
  name: 'LatestNewsCard',

  components: {
    AppButton
  },

  props: {
    newsfeed: {
      type: Object,
      required: false
    }
  },

  data: () => ({}),

  computed: {
    DecodeTitle() {
      return decodeURIComponent(this.newsfeed.title)
    },
    DecodeDescription() {
      return decodeURIComponent(this.newsfeed.description)
    }
  },

  methods: {
    ViewEvent(eventURL) {
      window.open(eventURL, '_blank')
    }
  }
}
</script>

  <style>
.view-event-button {
  background-color: #040720;
}
.news-tag {
  color: #fff;
  background: #ff553f;
  display: inline-block;
}
</style>
