<template>
  <div class="relative w-full h-full">
    <div class="thread-mask" />
    <div class="thread-content">
      <div v-if="messagesLoader" class="w-full h-full flex">
        <span class="fas fa-spinner fa-spin m-auto text-grey" />
      </div>
      <transition v-else name="fade-down-delayed" :appear="true">
        <div ref="threadContent" class="thread-content-scroll">
          <transition name="fade-down-delayed">
            <app-button
              v-if="showMoreButton"
              ref="showMoreBtn"
              class="w-full mb-4"
              :loader="true"
              btn-class="link"
              icon="lni-arrow-up"
              @clicked="showMore"
            >
              {{ $t('general.show_more') }}
            </app-button>
          </transition>
          <deal-message v-for="message in sortedMessages" :key="message.id" :message="message" />
        </div>
      </transition>
    </div>

    <transition name="fade-up" :appear="true">
      <div class="absolute bottom-0 w-full bg-white px-4 flex border-t border-grey-l4 pb-16">
        <text-area
          v-model="messageBody"
          class="message-input w-3/4 font-serif"
          :placeholder="$t('app.deals.thread_area_placeholder')"
          :no-resize-prop="true"
          :rows="3"
          :label="null"
          :disabled="isSending"
          @enterClick="sendMessage"
        />
        <div>
          <app-button
            class="mx-2 mt-6"
            :title="$t('general.send')"
            btn-class="primary-outlined"
            :loader="isSending"
            :disabled="messageBody.trim().length === 0"
            loading-text=""
            @clicked="sendMessage"
          />
        </div>
        <div class="absolute flex bottom-0 max-h-16 mb-4">
          <single-upload
            ref="upload"
            class=""
            :status-placeholder-classes="'bg-white'"
            :extensions="supportedExtensions"
            :info-text="null"
            :size="10"
            :param-name="'file'"
            :upload-url="'/upload/file'"
            :hide-restriction="true"
            :upload-classes="''"
            @file-uploaded="uploadedAttachment"
          >
            <template v-slot:selection-initiator>
              <span class="lni-paperclip text-h3 text-red cursor-pointer text-black" />
            </template>
          </single-upload>

          <!--          <span class="text-red cursor-pointer text-h3 ml-2 fas fa-microphone" @click="toggleRecord" />-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import Recorder from 'recorder-js/src'
import DealMessage from '@/components/deals/DealMessage'
import AppButton from '@/components/AppButton'
import TextArea from '@/components/TextArea'
import {
  ARCHIVE_EXTENSIONS,
  AUDIO_EXTENSIONS,
  DOC_EXTENSIONS,
  EXCEL_EXTENSIONS,
  IMAGE_EXTENSIONS,
  PDF_EXTENSIONS,
  PRESENTATION_EXTENSIONS,
  scrollTo,
  VIDEO_EXTENSIONS
} from '@/services/helpers'
import {
  MeQuery,
  MessagesQuery,
  SendMessageAttachmentMutation,
  SendMessageMutation
} from '@/services/graphql'
import SingleUpload from '@/components/SingleUpload'
import isDev from '@/services/mixins/isDev'

export default {
  name: 'DealThread',

  components: {
    DealMessage,
    AppButton,
    TextArea,
    SingleUpload
  },

  mixins: [isDev],

  props: {
    dealId: {
      type: String,
      required: true
    }
  },

  apollo: {
    me: {
      ...MeQuery
    },

    messages: {
      ...MessagesQuery,
      variables() {
        return {
          dealId: this.dealId,
          page: 1
        }
      },
      result({ data }) {
        this.messagesLoader = false
        if (data.messages.data.length === 0) {
          this.showMoreButton = false
        }

        if (data.messages.data.length > 0 && this.canScroll) {
          this.$nextTick(() => {
            try {
              this.scrollToLastMessage()
            } catch (err) {
              //
            }
          })
        }
      }
    }
  },

  data: () => ({
    messageBody: '',
    messagesLoader: true,
    isSending: false,
    page: 1,
    canScroll: true,
    recording: false,
    showMoreButton: true,
    recorder: null,
    audio_stream: null,
    audio_context: null,
    messages: { data: [] }
  }),

  computed: {
    sortedMessages() {
      return sortBy(this.messages.data, m => m.createdAt)
    },

    currentMobileView() {
      return this.$store.getters['deals/activeViewMobile']
    },

    supportedExtensions() {
      let arr = ARCHIVE_EXTENSIONS
      arr = arr.concat(IMAGE_EXTENSIONS)
      arr = arr.concat(VIDEO_EXTENSIONS)
      arr = arr.concat(AUDIO_EXTENSIONS)
      arr = arr.concat(DOC_EXTENSIONS)
      arr = arr.concat(PDF_EXTENSIONS)
      arr = arr.concat(EXCEL_EXTENSIONS)
      arr = arr.concat(PRESENTATION_EXTENSIONS)
      return arr
    }
  },

  watch: {
    dealId() {
      this.canScroll = true
    },

    currentMobileView(newVal) {
      if (newVal === 'messages') {
        this.scrollToLastMessage()
      }
    }
  },

  methods: {
    scrollToLastMessage() {
      if (
        this.$refs.threadContent !== undefined &&
        this.$refs.threadContent.lastChild !== null
      ) {
        scrollTo(
          this.$refs.threadContent,
          this.$refs.threadContent.lastChild,
          null,
          1
        )
      }
    },

    /**
     * Starts the recording process by requesting the access to the microphone.
     * Then, if granted proceed to initialize the library and store the stream.
     *
     * It only stops when the method stopRecording is triggered.
     */
    startRecording() {
      // Access the Microphone using the navigator.getUserMedia method to obtain a stream
      // Monkeypatch for AudioContext, getUserMedia and URL
      const AudioContext = window.AudioContext || window.webkitAudioContext
      navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia
      window.URL = window.URL || window.webkitURL

      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(stream => {
          // Store the instance of AudioContext globally
          this.audio_context = new AudioContext()
          // eslint-disable-next-line no-console
          console.log('Audio context is ready !')
          // eslint-disable-next-line no-console
          console.log(
            'navigator.getUserMedia ' +
              (navigator.getUserMedia ? 'available.' : 'not present!')
          )
          // Expose the stream to be accessible globally
          this.audio_stream = stream
          // Create the MediaStreamSource for the Recorder library
          const input = this.audio_context.createMediaStreamSource(stream)
          // eslint-disable-next-line no-console
          console.log('Media stream succesfully created', input)

          // Initialize the Recorder Library
          this.recorder = new Recorder(input, { numChannels: 1 })
          // eslint-disable-next-line no-console
          console.log('Recorder initialised')

          // eslint-disable-next-line no-console
          console.log(this.recorder)
          // Start recording !
          this.recorder && this.recorder.record()
          // eslint-disable-next-line no-console
          console.log('Recording...')
        })
        .catch(e => {
          if (this.isDevEnv) {
            // eslint-disable-next-line no-console
            console.error('No live audio input: ' + e)
          }
        })
    },

    /**
     * Stops the recording process. The method expects a callback as first
     * argument (function) executed once the AudioBlob is generated and it
     * receives the same Blob as first argument. The second argument is
     * optional and specifies the format to export the blob either wav or mp3
     */
    stopRecording(callback, AudioFormat) {
      // Stop the recorder instance
      this.recorder && this.recorder.stop()
      // eslint-disable-next-line no-console
      console.log('Stopped recording.')

      // Stop the getUserMedia Audio Stream !
      this.audio_stream.getAudioTracks()[0].stop()

      // Use the Recorder Library to export the recorder Audio as a .wav file
      // The callback providen in the stop recording method receives the blob
      if (typeof callback === 'function') {
        /**
         * Export the AudioBLOB using the exportWAV method.
         * Note that this method exports too with mp3 if
         * you provide the second argument of the function
         */
        this.recorder &&
          this.recorder.exportWAV(blob => {
            callback(blob)

            // create WAV download link using audio data blob
            // createDownloadLink();

            // Clear the Recorder to start again !
            this.recorder.clear()
          }, AudioFormat || 'audio/wav')
      }
    },

    toggleRecord(data) {
      if (!this.recording) {
        this.startRecording()
      } else {
        const _AudioFormat = 'audio/wav'
        this.stopRecording(AudioBLOB => {
          // Note:
          // Use the AudioBLOB for whatever you need, to download
          // directly in the browser, to upload to the server, you name it !

          // In this case we are going to add an Audio item to the list so you
          // can play every stored Audio
          const url = URL.createObjectURL(AudioBLOB)
          const li = document.createElement('li')
          const au = document.createElement('audio')
          const hf = document.createElement('a')

          au.controls = true
          au.src = url
          hf.href = url
          // Important:
          // Change the format of the file according to the mimetype
          // e.g for audio/wav the extension is .wav
          //     for audio/mpeg (mp3) the extension is .mp3
          hf.download = new Date().toISOString() + '.wav'
          hf.innerHTML = hf.download
          li.appendChild(au)
          li.appendChild(hf)
        }, _AudioFormat)
      }
      this.recording = !this.recording
    },

    async uploadedAttachment(attachment) {
      this.$refs.upload.resetUpload()
      this.isSending = true
      try {
        const res = await this.$apollo.mutate({
          ...SendMessageAttachmentMutation,
          variables: {
            dealId: this.$route.params.dealId,
            unitId: this.$route.params.id,
            attachment: attachment.id
          }
        })

        this.messages.data.push(res.data.sendMessageAttachment)
        this.$nextTick(() => {
          try {
            this.scrollToLastMessage()
          } catch (err) {
            //
          }
        })

        this.$toast.success(this.$t('success.general'))
      } catch (err) {
        if (this.isDevEnv) {
          this.$toast.error(err.message || this.$t('errors.general'))
        } else {
          this.$toast.error(this.$t('errors.general'))
        }
      }

      this.isSending = false
    },

    showMore() {
      this.canScroll = false
      this.page++

      this.$apollo.queries.messages.fetchMore({
        variables: {
          page: this.page,
          dealId: this.dealId
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.$refs.showMoreBtn.loaded()
          if (fetchMoreResult.messages.data.length === 0) {
            this.showMoreButton = false
          }

          return {
            messages: {
              __typename: previousResult.messages.__typename,
              data: [
                ...fetchMoreResult.messages.data,
                ...previousResult.messages.data
              ],
              paginatorInfo: fetchMoreResult.messages.paginatorInfo
            }
          }
        }
      })
    },

    async sendMessage() {
      if (!this.messageBody || this.messageBody.trim().length === 0) {
        return
      }

      this.isSending = true
      try {
        const res = await this.$apollo.mutate({
          ...SendMessageMutation,
          variables: {
            dealId: this.$route.params.dealId,
            unitId: this.$route.params.id,
            body: this.messageBody
          }
        })

        // todo: sigh
        this.messages.data.push(res.data.sendMessage)
        this.$nextTick(() => {
          try {
            this.scrollToLastMessage()
          } catch (err) {
            //
          }
        })

        this.messageBody = ''

        this.$toast.success(this.$t('success.general'))
      } catch (err) {
        if (this.isDevEnv) {
          this.$toast.error(err.message || this.$t('errors.general'))
        } else {
          this.$toast.error(this.$t('errors.general'))
        }
      }

      this.isSending = false
    }
  }
}
</script>

<style lang="postcss">
.thread-mask {
  @apply .absolute .top-0 .left-0 .right-0 .h-16 .z-10;
  background-image: linear-gradient(
    to bottom,
    rgba(242, 242, 242, 1),
    rgba(242, 242, 242, 0)
  );
}

.thread-content {
  @apply .overflow-y-scroll .h-full;
  min-height: calc(100vh - 240px);
  padding-bottom: 10.8rem;

  .thread-content-scroll {
    @apply .pt-16 .pb-4 .px-4 .overflow-y-scroll .h-full;
  }
}

.message-input {
  @apply .text-menu;
}
</style>
