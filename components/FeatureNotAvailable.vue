<template>
  <section class="feature__not__available">
    <div class="mt-4 mb-8">
      <p>{{ $t('app.profile.team.feature_not_available_in_plan') }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeatureNotAvailable'
}
</script>

<style lang="postcss" scoped>
.feature__not__available {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  @apply .relative;
}

@media (max-width: 768px) {
  .feature__not__available {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .feature__not__available {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
