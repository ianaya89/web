<template>
  <scrollactive
    :offset="offset"
    active-class="active"
    tag="ol"
    class="terms--menu"
  >
    <li>
      <a class="scrollactive-item uppercase" href="#section--general-provisions" @click.stop="$emit('item-clicked')">{{ $t('termsOfUse.general_provisions') }}</a>
    </li>
    <li>
      <a class="scrollactive-item uppercase" href="#section--subscriptions" @click.stop="$emit('item-clicked')">{{ $t('termsOfUse.subcriptions') }}</a>
    </li>
    <li>
      <a class="scrollactive-item uppercase" href="#section--sponsorship-deal-and-commision" @click.stop="$emit('item-clicked')">{{ $t('termsOfUse.sponsorship_deal') }}</a>
    </li>
    <li>
      <a class="scrollactive-item uppercase" href="#section--further-undertakings" @click.stop="$emit('item-clicked')">{{ $t('termsOfUse.further_undertakings') }}</a>
    </li>
    <li>
      <a class="scrollactive-item uppercase" href="#section--final-provisions" @click.stop="$emit('item-clicked')">{{ $t('termsOfUse.final_provisions') }}</a>
    </li>
  </scrollactive>
</template>

<script>
export default {
  name: 'TermsMenu',

  props: {
    offset: {
      type: Number,
      default: 80
    }
  }
}
</script>

<style lang="postcss" scoped>
.terms--menu {
  li {
    @apply .text-h7 .py-1;

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
