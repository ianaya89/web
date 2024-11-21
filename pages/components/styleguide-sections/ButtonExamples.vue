<template>
  <div class="container">
    <h2>Buttons</h2>
    <div>
      <app-button title="Primary" btn-class="primary" />
      <app-button title="PrimaryOutlined" btn-class="primary-outlined" />
      <app-button title="Secondary" btn-class="secondary" icon="lni-download" />
      <app-button :show-arrow="true" title="Button Light" btn-class="light" />
      <app-button :show-arrow="true" title="Button Link" btn-class="link" />

      <app-button ref="loadingBtn" :loader="true" title="With Loader" />

      <app-button
        :show-arrow="true"
        title="Button Large"
        btn-class="primary-lg my-4"
      />
      <app-button
        :show-arrow="true"
        title="Button Large with long text for two lines and more"
        btn-class="primary-lg w-full"
      />
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  components: {
    AppButton
  }
}
</script>

<style lang="postcss">
</style>
