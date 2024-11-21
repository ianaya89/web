<template>
  <div class="container">
    <h2>Uploads</h2>

    <upload />
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <mini-upload />
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import MiniUpload from '@/components/internal/MiniUpload'

export default {
  name: 'UploadExamples',

  components: {
    Upload,
    MiniUpload
  }
}
</script>

<style scoped>
</style>
