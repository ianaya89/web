<template>
  <scrollactive
    active-class="active"
    tag="ol"
    :offset="offset"
    class="privacy--menu overflow-y-auto h-screen"
  >
    <li>
      <a class="scrollactive-item" href="#section--introduction" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.intro') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--who-controls-the-provessed-personal-data" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.personal_data') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--what-kind-of-personal-data-is-being-collected" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.personal_data_kind') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--why-are-we-allowed-to-process-personal-data" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.personal_data_allowed') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--for-what-purpose-do-we-process-personal-data" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.personal_data_purpose') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--with-who-is-the-personal-data-shared-with" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.personal_data_share') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--for-how-long-do-we-keep-personal-data" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.personal_data_keep') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--how-do-we-secure-the-safety-of-data" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.personal_data_security') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--what-are-the-rights-of-the-individuals" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.personal_data_rights') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--how-do-you-contact-us" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.contact_us') }}</a>
    </li>
    <li>
      <a class="scrollactive-item" href="#section--how-do-we-keep-our-policies-up-to-date" @click.stop="$emit('item-clicked')">{{ $t('privacy.sections.up_to_date') }}</a>
    </li>
  </scrollactive>
</template>

<script>
export default {
  name: 'PrivacyMenu',

  props: {
    offset: {
      type: Number,
      default: 80
    }
  }
}
</script>

<style lang="postcss" scoped>
.privacy--menu {
  li {
    @apply .text-h7;

    a {
      @apply .text-black;

      &.active {
        @apply .text-red;
      }
    }
  }

  @media (max-width: 991px) {
    li {
      @apply .py-4 .text-h6;
    }
  }
}
</style>
