<template>
  <div class="w-full">
    <span v-if="soloLabel" class="text-grey text-p2 uppercase tracking-wide">
      {{ soloLabel }}
    </span>
    <span class="text-red text-p2">
      *
    </span>
    <div class="upload-area border border-dashed border-grey-l2 flex flex-wrap justify-center items-center text-center">
      <transition-group name="fade-down" class="flex p-4 w-full flex-wrap flex-grow justify-center sm:justify-start">
        <div v-for="file in files" :key="file.upload.uuid" class="w-5/6 sm:w-1/5 lg:w-1/3 max-w-xs m-2 bg-white pt-4 pb-2 px-4 relative">
          <span class="absolute top-0 right-0 p-2 bg-white rounded-full">
            <span v-if="fileNotProccessing(file)" class="text-grey text-menu sm:text-menu far fa-clock " />
            <span v-if="fileUploading(file)" class="text-grey text-menu sm:text-menu fas fa-spin fa-spinner" />
            <span v-if="fileComplete(file)" class="text-green text-menu sm:text-menu fas fa-check" />
            <span v-if="fileError(file)" class="text-red text-menu sm:text-menu fas fa-exclamation" />
          </span>
          <div class="text-center">
            <span :class="fileIcon(file)" class="fa text-h2" />
          </div>
          <div class="text-center mt-2 truncate">
            {{ file.name }}
          </div>
        </div>
      </transition-group>

      <div class="-mt-24">
        <dropzone
          id="dropzone"
          ref="uploadDropzone"
          :options="dropzoneOptions"
          :destroy-dropzone="true"
          :use-custom-slot="true"
          @vdropzone-files-added="addedFiles($event)"
          @vdropzone-success="fileSuccess"
          @vdropzone-complete="fileCompleted($event)"
          @vdropzone-processing="processingFile($event)"
          @vdropzone-upload-progress="fileProgress($event)"
        >
          <div class="dropzone-custom-content">
            <transition name="fade-delayed">
              <div v-if="! files || files.length === 0">
                <div>
                  <span class="text-h3 pb-4" :class="icon" />
                </div>
                <div class="px-8">
                  <span class="uppercase text-h7 hidden lg:inline-block">{{ infoText }}</span>
                  <span class="text-grey text-h7 uppercase mx-1 hidden lg:inline-block">{{ $t('general.or') }}</span>
                  <app-button :title="buttonText" class="z-10" @clicked="startSelection" />
                </div>
              </div>
            </transition>
          </div>
        </dropzone>
      </div>
    </div>
    <span class="font-serif text-grey text-p3 mt-2 leading-tight">{{ restrictionText }}</span>
  </div>
</template>

<script>
import { merge } from 'lodash'
import Dropzone from 'nuxt-dropzone'
import AppButton from '@/components/AppButton'
import {
  hasFileError,
  isFileComplete,
  isFileNotProccessing,
  isFileUploading
} from '@/services/helpers'

export default {
  name: 'Upload',

  components: {
    AppButton,
    Dropzone
  },

  props: {
    icon: {
      type: String,
      default: 'lni-image'
    },
    infoText: {
      type: String,
      default: 'Drag & Drop File/s'
    },
    buttonText: {
      type: String,
      default: 'Upload file/s'
    },
    value: {
      type: Array,
      default: () => []
    },
    extensions: {
      type: Array,
      default: () => ['jpeg', 'jpg', 'zip', 'pdf', 'png', 'gif']
    },
    accepted: {
      type: String,
      default:
        'image/jpeg,image/jpg,application/zip,application/pdf,image/png,image/gif'
    },
    size: {
      // in bytes 5 MB
      type: Number,
      default: 5000000
    },
    dropzoneCustomOptions: {
      type: Object,
      default: () => {}
    },
    soloLabel: {
      type: String,
      default: 'Label'
    },
    path: {
      type: String,
      default: '/upload/image'
    },
    param: {
      type: String,
      default: 'image'
    },
    max: {
      type: Number,
      default: 99999
    }
  },

  data() {
    return {
      uploadInstance: null,
      dropzoneOptions: {
        acceptedFiles: this.accepted,
        autoProcessQueue: true, // autoupload
        createImageThumbnails: false,
        thumbnailWidth: 150, // px
        thumbnailHeight: 150,
        parallelUploads: 100,
        paramName: this.param,
        uploadMultiple: false,
        url: process.env.VUE_APP_BACKEND_URL + this.path, // required
        headers: {
          'Cache-Control': '',
          'X-Requested-With': ''
        },
        maxFiles: this.max === 99999 ? null : this.max
      },
      files: []
    }
  },

  computed: {
    restrictionText() {
      if (this.extensions.length > 1) {
        return (
          this.$t('general.supported_formats') +
          ': ' +
          this.extensions
            .slice(0, -1)
            .join(', ')
            .toUpperCase() +
          ' or ' +
          this.extensions
            .slice(-1)
            .join()
            .toUpperCase() +
          ' max. ' +
          this.size / 1000000 +
          ' MB'
        )
      } else {
        return (
          this.$t('general.supported_format') +
          ': ' +
          this.extensions[0].toUpperCase() +
          ' max. ' +
          this.size / 1000000 +
          ' MB'
        )
      }
    },

    fileNotProccessing() {
      return file =>
        isFileNotProccessing(
          this.files.find(item => item.upload.uuid === file.upload.uuid)
        )
    },
    fileUploading() {
      return file =>
        isFileUploading(
          this.files.find(item => item.upload.uuid === file.upload.uuid)
        )
    },
    fileComplete() {
      return file =>
        isFileComplete(
          this.files.find(item => item.upload.uuid === file.upload.uuid)
        )
    },
    fileError() {
      return file =>
        hasFileError(
          this.files.find(item => item.upload.uuid === file.upload.uuid)
        )
    }
  },

  watch: {
    value(newVal) {
      this.files = newVal
    }
  },

  mounted() {
    this.uploadInstance = this.$refs.uploadDropzone.dropzone
    this.dropzoneOptions = merge(
      {},
      this.dropzoneOptions,
      this.dropzoneCustomOptions,
      {
        maxFilesize: this.size / 1000000,
        headers: {
          authorization: 'Bearer ' + this.$store.getters['auth/accessToken']
        }
      }
    )

    this.uploadInstance.options = merge(
      {},
      this.uploadInstance.options,
      this.dropzoneOptions
    )

    this.files = this.value
  },

  methods: {
    startSelection() {
      const input = document.querySelector('input[class="dz-hidden-input"]')
      input.click()
    },

    uploadFiles() {
      this.uploadInstance.processQueue()
    },

    addedFiles(files) {
      this.updatedValue([...files].filter(item => item.accepted))
    },

    findAndUpdateFile: function(file) {
      const fileIndex = this.files.findIndex(
        item => item.upload.uuid === file.upload.uuid
      )
      this.files[fileIndex] = file
    },

    processingFile(file) {
      this.findAndUpdateFile(file)
      this.updatedValue(this.files)
    },

    fileProgress(file) {
      this.findAndUpdateFile(file)
      this.updatedValue(this.files)
    },

    fileCompleted(file) {
      this.findAndUpdateFile(file)
      this.updatedValue(this.file)
    },

    fileSuccess(file, response) {
      this.findAndUpdateFile(file)
      this.updatedValue(this.files)
      this.$emit('success', { file, response })
    },

    updatedValue(value) {
      this.$emit('input', value)
      this.files = value
    },

    removeFile(file) {
      this.uploadInstance.removeFile(file)
    },

    fileIcon(file) {
      switch (file.type) {
        case 'application/pdf': {
          return 'fa-file-pdf'
        }
        case 'image/png': {
          return 'fa-file-image'
        }
        case 'image/jpeg': {
          return 'fa-file-image'
        }
        case 'image/gif': {
          return 'fa-file-image'
        }
        case 'image/jpg': {
          return 'fa-file-image'
        }
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
          return 'fa-file-powerpoint'
        }
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
          return 'fa-file-word'
        }
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
          return 'fa-file-excel'
        }
        case 'application/x-rar-compressed': {
          return 'fa-file-archive'
        }
        case 'application/zip': {
          return 'fa-file-archive'
        }
        default: {
          return 'fa-file'
        }
      }
    }
  }
}
</script>

<style lang="postcss">
.upload-area {
  min-height: 12rem;
}

.dz-default.dz-message {
  @apply .hidden;
}
.dz-preview {
  @apply .hidden;
}
</style>
