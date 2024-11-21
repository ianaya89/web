<template>
  <div class="w-full h-full flex flex-col justify-end">
    <div>
      <dropzone
        v-if="canDropzoneMount"
        id="dropzone"
        ref="uploadDropzone"
        :options="dropzoneOptions"
        :destroy-dropzone="true"
        :use-custom-slot="true"
        @vdropzone-files-added="addedFiles($event)"
        @vdropzone-success="fileSuccess($event)"
        @vdropzone-complete="fileCompleted($event)"
        @vdropzone-error="onError"
        @vdropzone-processing="processingFile($event)"
        @vdropzone-upload-progress="fileProgress($event)"
      >
        <div class="dropzone-custom-content" @click.stop="startSelection">
          <div :class="{'mb-4':infoText!==null || !hideRestriction}">
            <h6 v-if="infoText!==null">
              {{ infoText }}
            </h6>
            <p v-if="!hideRestriction" class="font-serif text-grey text-p3">
              {{ restrictionText }}
            </p>
          </div>
          <slot name="selection-initiator">
            <app-button :title="buttonText" :btn-class="'link'" class="z-10" />
          </slot>
        </div>
      </dropzone>
    </div>
  </div>
</template>

<script>
import { merge, uniq } from 'lodash'
import * as mime from 'mime-types'
import Dropzone from 'nuxt-dropzone'
import AppButton from '@/components/AppButton'
import isDev from '@/services/mixins/isDev'

export default {
  name: 'MiniUpload',

  components: {
    AppButton,
    Dropzone
  },

  mixins: [isDev],

  props: {
    infoText: {
      type: String,
      default: 'Your photo'
    },
    buttonText: {
      type: String,
      default: 'Upload file'
    },
    hideRestriction: {
      type: Boolean,
      default: false
    },
    extensions: {
      type: Array,
      default: () => ['jpeg', 'jpg', 'png', 'gif']
    },
    uploadUrl: {
      type: String,
      default: '/upload/image'
    },
    paramName: {
      type: String,
      default: 'image'
    },
    size: {
      // in MB
      type: Number,
      default: 5
    },
    dropzoneCustomOptions: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    uploadInstance: null,
    canDropzoneMount: false,
    dropzoneOptions: {
      acceptedFiles: 'image/jpeg,image/jpg,image/png,image/gif',
      autoProcessQueue: true, // autoupload
      createImageThumbnails: false,
      thumbnailWidth: 150, // px
      thumbnailHeight: 150,
      uploadMultiple: false,
      headers: {
        'Cache-Control': '',
        'X-Requested-With': ''
      },
      maxFiles: 1 // maximal number of uploaded files
    }
  }),

  computed: {
    restrictionText() {
      if (this.extensions.length > 1) {
        return (
          this.extensions
            .slice(0, -1)
            .join(', ')
            .toLowerCase() +
          ' ' +
          this.$t('general.or') +
          ' ' +
          this.extensions
            .slice(-1)
            .join()
            .toLowerCase() +
          ' max. ' +
          this.size +
          ' MB'
        )
      } else {
        return (
          this.$t('general.supported_format') +
          ': ' +
          this.extensions[0].toUpperCase() +
          ' max. ' +
          this.size +
          ' MB'
        )
      }
    }
  },

  mounted() {
    this.dropzoneOptions.acceptedFiles = this.parseAcceptedFiles()
    this.dropzoneOptions.paramName = this.paramName
    this.dropzoneOptions.url = process.env.VUE_APP_BACKEND_URL + this.uploadUrl
    this.dropzoneOptions = merge(
      {},
      this.dropzoneOptions,
      this.dropzoneCustomOptions,
      {
        maxFilesize: this.size,
        headers: {
          authorization: 'Bearer ' + this.$store.getters['auth/accessToken']
        }
      }
    )

    this.canDropzoneMount = true
    this.$nextTick(() => {
      this.uploadInstance = this.$refs.uploadDropzone.dropzone
    })
  },

  methods: {
    startSelection() {
      this.$refs.uploadDropzone.dropzone.hiddenFileInput.click()
    },

    uploadFiles() {
      this.uploadInstance.processQueue()
    },

    addedFiles(files) {
      if (files[0].accepted) {
        this.updatedValue(files[0])
      }
    },

    processingFile(file) {
      this.updatedValue(file)
    },

    fileCompleted(file) {
      this.uploadInstance.removeAllFiles(true)
    },

    fileProgress(file) {
      this.updatedValue(file)
    },

    fileSuccess(file) {
      this.updatedValue(file)
    },

    updatedValue(value) {
      this.$emit('input', value)
    },

    removeFile(file) {
      this.uploadInstance.removeFile(file)
    },

    onError(file, message) {
      if (this.isDevEnv) {
        // eslint-disable-next-line no-console
        console.error(file, message)
      }
      this.$emit('upload-error', message)
    },

    parseAcceptedFiles() {
      const acceptedFiles = []
      this.extensions.forEach(ext => {
        const mimeType = mime.lookup(ext)
        if (mimeType) {
          acceptedFiles.push(mimeType)
        }
      })
      return uniq(acceptedFiles).join(',')
    }
  }
}
</script>

<style lang="postcss">
.dz-default.dz-message {
  @apply .hidden;
}
.dz-preview {
  @apply .hidden;
}
</style>
