<template>
  <section class="page--contact-us">
    <h3>
      {{ $t('app.contact_us.title') }}
    </h3>

    <contact-with-map />
  </section>
</template>

<script>
import ContactWithMap from '@/components/widgets/ContactWithMap'

export default {
  name: 'Contact',

  components: {
    ContactWithMap
  }
}
</script>

<style lang="postcss" scoped>
.page--contact-us {
  @apply .p-12 .w-full;

  .hide-button {
    @apply .absolute;
    top: -1rem;
    right: -1rem;
  }
}
</style>
