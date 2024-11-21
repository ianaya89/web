<template>
  <div class="deal-message w-full flex mb-6">
    <avatar
      class="mt-6"
      :src="$get(message, 'user.profile.photo.url')"
      :class="{'hidden' : isCurrentUserMessage}"
      :classes="'w-12 h-12'"
    />
    <div :class="[{'current-user-message' : isCurrentUserMessage}, {'income-message' : !isCurrentUserMessage}]">
      <div v-if="!message.hasAttachments" class="w-full">
        <span class="text-grey-l1 text-p3 pl-4" :title="$filters.dateTime(message.createdAt)">
          {{ message.createdAt | dateTimeShort }}
        </span>
        <div class="message-content">
          <div class="left-top font-serif leading-tight px-4 py-3">
            {{ message.body }}
          </div>
        </div>
      </div>
      <div v-else class="w-full">
        <span class="text-grey-l1 text-p3 pl-4" :title="$filters.dateTime(message.createdAt)">
          {{ message.createdAt | dateTimeShort }}
        </span>
        <div class="message-content">
          <div v-if="isAttachmentImage" class="left-top p-3">
            <img class="cursor-pointer" :src="attachmentSrc" alt="Attachment image" @click="viewImage(attachmentSrc)">
            <media-modal ref="modalImage" :header="false" :footer="false">
              <template v-slot:body>
                <img :src="attachmentSrc" alt="Attachment image">
              </template>
            </media-modal>
          </div>
          <div v-else-if="isAttachmentVideo" class="left-top p-3">
            <video controls class="w-full">
              <source :src="attachmentSrc">
              {{ $t('errors.video.not_supported') }}
            </video>
          </div>
          <div v-else-if="isAttachmentAudio" class="left-top p-3">
            <audio controls>
              <source :src="attachmentSrc">
              {{ $t('errors.audio.not_supported') }}
            </audio>
          </div>
          <div v-else class="left-top p-3">
            <a :href="attachmentSrc" target="_blank" rel="noopener" class="flex">
              <span :class="getAttachmentFileIcon" class="text-p1" />
              <span class="ml-3 mt-1 leading-tight">{{ attachmentName | truncate(20) }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import { MeQuery } from '@/services/graphql'
import {
  ARCHIVE_EXTENSIONS,
  AUDIO_EXTENSIONS,
  DOC_EXTENSIONS,
  EXCEL_EXTENSIONS,
  IMAGE_EXTENSIONS,
  PDF_EXTENSIONS,
  PRESENTATION_EXTENSIONS,
  VIDEO_EXTENSIONS
} from '@/services/helpers'
import MediaModal from '@/components/MediaModal'

export default {
  name: 'DealMessage',

  components: {
    Avatar,
    MediaModal
  },

  props: {
    message: {
      type: Object,
      required: true
    }
  },

  apollo: {
    me: MeQuery
  },

  data: () => ({
    modalImage: null
  }),

  computed: {
    isCurrentUserMessage() {
      return this.me && this.message.user.id === this.me.id
    },

    attachmentExtension() {
      return this.$get(this.message, 'attachments.0.extension', null)
    },

    attachmentSrc() {
      return this.$get(this.message, 'attachments.0.url', null)
    },

    attachmentName() {
      return this.$get(this.message, 'attachments.0.name', null)
    },

    isAttachmentImage() {
      return IMAGE_EXTENSIONS.includes(this.attachmentExtension)
    },

    isAttachmentVideo() {
      return VIDEO_EXTENSIONS.includes(this.attachmentExtension)
    },

    isAttachmentAudio() {
      return AUDIO_EXTENSIONS.includes(this.attachmentExtension)
    },

    getAttachmentFileIcon() {
      if (ARCHIVE_EXTENSIONS.indexOf(this.attachmentExtension) !== -1) {
        return 'fas fa-file-archive'
      } else if (DOC_EXTENSIONS.indexOf(this.attachmentExtension) !== -1) {
        return 'fas fa-file-word'
      } else if (PDF_EXTENSIONS.indexOf(this.attachmentExtension) !== -1) {
        return 'fas fa-file-pdf'
      } else if (EXCEL_EXTENSIONS.indexOf(this.attachmentExtension) !== -1) {
        return 'fas fa-file-excel'
      } else if (
        PRESENTATION_EXTENSIONS.indexOf(this.attachmentExtension) !== -1
      ) {
        return 'fas fa-file-powerpoint'
      } else {
        return 'fas fa-file'
      }
    }
  },

  methods: {
    viewImage(image) {
      this.modalImage = image
      if (this.modalImage !== null) {
        this.$refs.modalImage.open()
      }
    },

    close() {
      this.$refs.modalImage.close()
    }
  }
}
</script>

<style lang="postcss">
.deal-message {
  .current-user-message {
    @apply .w-full .pl-14;

    .message-content {
      @apply .bg-grey-l5 .ml-4 .relative;
    }

    .left-top::before {
      content: ' ';
      position: absolute;
      width: 0;
      height: 0;
      right: -15px;
      top: 1rem;
      bottom: auto;
      border: 0.875rem solid;
      border-color: #fafafa transparent transparent transparent;
    }
  }

  .income-message {
    @apply .w-4/5;

    .message-content {
      @apply .bg-white .ml-4 .relative;
    }

    .left-top::before {
      content: ' ';
      position: absolute;
      width: 0;
      height: 0;
      left: -15px;
      right: auto;
      top: 1rem;
      bottom: auto;
      border: 0.875rem solid;
      border-color: white transparent transparent transparent;
    }
  }
}
</style>
