<template>
  <v-app class="layout--app min-h-screen bg-white">
    <div class="flex flex-wrap w-full min-h-screen relative">
      <div class="left-col flex w-full sm:w-2/3">
        <transition name="fade-up" :appear="true">
          <nuxt />
        </transition>
      </div>
      <div class="right-col flex sm:w-1/3 justify-between h-screen sm:fixed right-0">
        <div class="hidden lg:block absolute top-0 right-0 py-6 pr-12 z-10">
          <logo variant="light" />
        </div>
        <transition name="clip-path-slide-up" :appear="true">
          <div class=" w-full side-img-02 bg-cover bg-right bg-no-repeat flex items-center justify-center">
            <button class="flex justify-start items-center" @click="viewModal()">
              <img
                class="cursor-pointer"
                :src="require('../assets/images/youtube-btn.png')"
                alt="Image"
              > <span class="text-white text-2xl ml-4">{{ $t('app.register.how_it_works') }}</span>
            </button>
          </div>
        </transition>
      </div>
      <video-modal ref="modalVideo" :header="false" :footer="false" @pause-iframe-video="pauseIframeVideo" @start-iframe-video="startIframeVideo">
        <template v-slot:body>
          <div v-if="getPath === '/register/'">
            <iframe
              ref="iframeVideo"
              class="video"
              src="https://www.youtube.com/embed/GXxaYWnZdyk?enablejsapi=1"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope;"
              allowfullscreen
            />
          </div>
          <div v-else>
            <iframe
              ref="iframeVideo"
              class="video"
              src="https://www.youtube.com/embed/iR9WK373sQo?enablejsapi=1"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope;"
              allowfullscreen
            />
          </div>
        </template>
      </video-modal>
    </div>
    <portal-target name="modals-outlet" multiple />
  </v-app>
</template>

  <script>
import Logo from '@/components/Logo'
import VideoModal from '@/components/VideoModal'

export default {
  name: 'AuthLayout',

  components: {
    Logo,
    VideoModal
  },

  computed: {
    getPath() {
      return this.$route.path
    }
  },

  mounted() {
    //
  },

  methods: {
    viewModal() {
      this.$refs.modalVideo.open()
    },
    pauseIframeVideo() {
      const video = this.$refs.iframeVideo
      video.contentWindow.postMessage(
        '{"event":"command", "func":"pauseVideo", "args":""}',
        '*'
      )
    },
    startIframeVideo() {
      const video = this.$refs.iframeVideo
      video.contentWindow.postMessage(
        '{"event":"command", "func":"playVideo", "args":""}',
        '*'
      )
    }
  }
}
</script>

  <style lang="postcss" scoped>
.side-img-02 {
  background-image: url('../assets/images/signup.jpg');
}

.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}

@media (max-width: 639px) {
  .left-col {
    order: 2;
  }
  .right-col {
    width: 100%;
    height: 40vh;
    order: 1;
  }

  .side-img-02 {
    height: 100%;
  }
}
</style>
