<template>
  <div class="flex">
    <div class="w-full relative h-full">
      <slot v-if="fileUploading || fileError" name="status-placeholder" :file="uploadedFile">
        <div class="pin absolute bg-white flex m-auto z-30" :class="statusPlaceholderClasses">
          <span v-if="fileUploading" class="m-auto text-grey-l1 fas fa-2x fa-spin fa-spinner" />
          <span v-if="fileError" class="m-auto text-red fas fa-2x fa-exclamation" />
        </div>
      </slot>
      <div v-if="lastFileUrl!==null" class="flex flex-wrap items-end inset-0 absolute z-20" :class="statusPlaceholderClasses">
        <avatar class="cursor-pointer" :classes="'w-full h-24'" :rounded="false" :src="lastFileUrl" @click.native="viewImage(lastFileUrl)" />
        <div v-if="showReupload" class="w-full text-p5 py-px px-1 cursor-pointer" @click.stop="$refs.upload.startSelection()">
          <span class="fas fa-upload text-red mr-2" />
          <span class="text-red text-menu font-serif">
            {{ $t('general.reupload') }}
          </span>
        </div>
      </div>
      <mini-upload
        ref="upload"
        mini-upload
        :class="[uploadClasses, {'invisible':lastFileUrl!==null}]"
        :info-text="infoText"
        :button-text="btnText"
        :hide-restriction="hideRestriction"
        :extensions="extensions"
        :param-name="paramName"
        :upload-url="uploadUrl"
        :size="size"
        @upload-error="onError"
        @input="onInput"
      >
        <template v-slot:selection-initiator>
          <slot name="selection-initiator" />
        </template>
      </mini-upload>
    </div>
    <media-modal ref="modalImage" :header="false" :footer="false">
      <template v-slot:body>
        <img class="mx-auto" :src="modalImage" alt="Inventory image">
      </template>
    </media-modal>
  </div>
</template>

<script>
import MiniUpload from '@/components/internal/MiniUpload'
import {
  hasFileError,
  isFileComplete,
  isFileUploading
} from '@/services/helpers'
import Avatar from '@/components/Avatar'
import MediaModal from '@/components/MediaModal'

export default {
  name: 'SingleUpload',

  components: {
    Avatar,
    MiniUpload,
    MediaModal
  },

  props: {
    infoText: {
      type: String,
      default: 'Info'
    },
    paramName: {
      type: String,
      default: 'image'
    },
    uploadUrl: {
      type: String,
      default: '/upload/image'
    },
    uploadClasses: {
      type: String,
      default: 'w-full p-4 border border-dashed border-grey-l3'
    },
    statusPlaceholderClasses: {
      type: String,
      default: 'bg-grey-l4'
    },
    hideRestriction: {
      type: Boolean,
      default: false
    },
    showReupload: {
      type: Boolean,
      default: true
    },
    btnText: {
      type: String,
      default: 'Upload'
    },
    extensions: {
      type: Array,
      default: () => ['jpeg', 'jpg', 'png', 'gif']
    },
    size: {
      // in MB
      type: Number,
      default: 5
    },
    defaultFileUrl: {
      type: String,
      default: null
    }
  },

  data: () => ({
    uploadedFile: null,
    modalImage: null
  }),

  computed: {
    fileUploading() {
      return isFileUploading(this.uploadedFile)
    },
    fileComplete() {
      return isFileComplete(this.uploadedFile)
    },
    fileError() {
      return hasFileError(this.uploadedFile)
    },
    lastFileUrl() {
      if (this.uploadedFile !== null && this.fileComplete) {
        return this.getUploadedFile().url
      } else {
        return this.defaultFileUrl
      }
    }
  },

  methods: {
    getUploadedFile() {
      return JSON.parse(this.uploadedFile.xhr.responseText).data
    },

    startSelection() {
      this.$refs.upload.startSelection()
    },

    onError(message) {
      if (typeof message === 'object') {
        this.$toast.error(
          this.$t('errors.general') +
            ' ' +
            this.$t('general.reason') +
            this.$get(message, 'message', '')
        )
      } else {
        this.$toast.error(
          this.$t('errors.general') +
            ' ' +
            this.$t('general.reason') +
            ' ' +
            message
        )
      }
      setTimeout(() => {
        this.resetUpload()
      }, 3000)
    },

    onInput(file) {
      this.uploadedFile = { ...file }
      if (isFileComplete(file)) {
        this.$emit('file-uploaded', this.getUploadedFile())
      } else if (isFileUploading(file)) {
        this.$emit('file-uploading', this.uploadedFile)
      } else if (hasFileError(file)) {
        this.$emit('file-error', this.uploadedFile)
        setTimeout(() => {
          this.resetUpload()
        }, 3000)
      }
    },

    resetUpload() {
      this.uploadedFile = null
    },

    viewImage(image) {
      this.modalImage = image
      if (this.modalImage !== null) {
        this.$refs.modalImage.open()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
