<template>
  <section class="page--terms-of-use px-8 sm:px-12 pt-32 w-full flex flex-wrap-reverse sm:flex-no-wrap relative">
    <div class="w-full lg:w-2/3 pt-24 lg:pt-0">
      <h1 class="font-medium mb-6">
        {{ $t("termsOfUse.title" ) }}
      </h1>
      <p class="font-serif h7 text-grey-d1 leading-normal mb-2">
        {{ $t("termsOfUse.effective_date") }}
        <br>{{ $t("termsOfUse.last_updated") }}
        <br>
        <br>{{ $t("termsOfUse.p1") }}
        <br>
        <br>{{ $t("termsOfUse.p2") }}
      </p>

      <ol class="font-serif h7 text-grey-d1 leading-normal mb-6 pl-8">
        <span id="section--general-provisions" class="section--terms">{{ $t("termsOfUse.general_provisions") }}</span>
        <li>
          <span v-html="$t('termsOfUse.p3')" />
        </li>
        <li>
          {{ $t("termsOfUse.p4") }} <a href="https://sponsoronline.eu" target="_blank">https://sponsoronline.eu</a>.
        </li>
        <li>{{ $t("termsOfUse.p5") }}</li>
        <li>{{ $t("termsOfUse.p6") }}</li>
        <li>{{ $t("termsOfUse.p7") }}</li>
        <li>{{ $t("termsOfUse.p8") }}</li>
        <li>{{ $t("termsOfUse.p9") }}</li>
        <li>{{ $t("termsOfUse.p10") }}</li>
        <li>{{ $t("termsOfUse.p11") }}</li>
        <li v-html="$t('termsOfUse.p12')" />
        <li v-html="$t('termsOfUse.p13')" />
        <li v-html="$t('termsOfUse.p14')" />
        <li>
          {{ $t("termsOfUse.p15") }}
        </li>
        <li v-html="$t('termsOfUse.p16')" />
        <li>
          {{ $t("termsOfUse.p17") }}
        </li>
        <li>
          {{ $t("termsOfUse.p18") }}
        </li>
        <li>
          {{ $t("termsOfUse.p19") }}
        </li>
        <li>
          {{ $t("termsOfUse.p20") }}
        </li>
        <li>
          {{ $t("termsOfUse.p21") }}
        </li>
        <li>
          {{ $t("termsOfUse.p22") }}
        </li>
        <li>
          {{ $t("termsOfUse.p23") }}
        </li>
        <li>
          {{ $t("termsOfUse.p24") }}
        </li>

        <span id="section--subscriptions" class="section--terms">{{ $t("termsOfUse.subcriptions") }}</span>
        <li>
          {{ $t("termsOfUse.p25") }}
        </li>
        <li>
          {{ $t("termsOfUse.p26") }}
        </li>
        <li v-html="$t('termsOfUse.p27')" />
        <li>
          {{ $t("termsOfUse.p28") }}
        </li>
        <li>
          {{ $t("termsOfUse.p29") }}
        </li>
        <li>
          {{ $t("termsOfUse.p30") }}
        </li>

        <span id="section--sponsorship-deal-and-commision" class="section--terms">{{ $t("termsOfUse.sponsorship_deal") }}</span>
        <li v-html="$t('termsOfUse.p31')" />
        <li>
          {{ $t("termsOfUse.p32") }}
        </li>
        <li>
          {{ $t("termsOfUse.p33") }}
        </li>
        <li v-html="$t('termsOfUse.p34')" />
        <li>
          {{ $t("termsOfUse.p35") }}
        </li>
        <li>
          {{ $t("termsOfUse.p36") }}
        </li>
        <li>
          {{ $t("termsOfUse.p37") }}
        </li>
        <li>
          {{ $t("termsOfUse.p38") }}
        </li>
        <li>
          {{ $t("termsOfUse.p39") }}
        </li>
        <li>
          {{ $t("termsOfUse.p40") }}
        </li>
        <li>
          {{ $t("termsOfUse.p41") }}
        </li>
        <li>
          {{ $t("termsOfUse.p42") }}
        </li>
        <li>
          {{ $t("termsOfUse.p43") }}
        </li>
        <li>
          {{ $t("termsOfUse.p44") }}
        </li>
        <li>
          {{ $t("termsOfUse.p45") }}
        </li>
        <li>
          {{ $t("termsOfUse.p46") }}
        </li>
        <li>
          {{ $t("termsOfUse.p47") }}
        </li>

        <span id="section--further-undertakings" class="section--terms">{{ $t("termsOfUse.further_undertakings") }}</span>
        <li>
          {{ $t("termsOfUse.p48") }}
        </li>
        <li>
          {{ $t("termsOfUse.p49") }}
        </li>
        <li>
          {{ $t("termsOfUse.p50") }}
          <nuxt-link :to="localePath({'name': 'privacy'})">
            {{ $t("termsOfUse.our_privacy_policy") }}
          </nuxt-link>.
        </li>
        <li>
          {{ $t("termsOfUse.p51") }}
        </li>
        <li>
          {{ $t("termsOfUse.p52") }}
        </li>
        <li>
          {{ $t("termsOfUse.p53") }}
        </li>
        <li>
          {{ $t("termsOfUse.p54") }}
        </li>
        <li>
          {{ $t("termsOfUse.p55") }}
        </li>
        <li>
          {{ $t("termsOfUse.p56") }}
        </li>
        <li>
          {{ $t("termsOfUse.p57") }}
        </li>
        <li>
          {{ $t("termsOfUse.p58") }}
        </li>
        <li>
          {{ $t("termsOfUse.p59") }}
        </li>

        <span id="section--final-provisions" class="section--terms">{{ $t("termsOfUse.final_provisions") }}</span>
        <li>
          {{ $t("termsOfUse.p60") }}
        </li>
        <li>
          {{ $t("termsOfUse.p61") }}
          <a
            href="mailto:info@sponsoronline.eu"
          >info@sponsoronline.eu</a>
          {{ $t("termsOfUse.p62") }}
        </li>
        <li>{{ $t("termsOfUse.p63") }}</li>
        <li>{{ $t("termsOfUse.p64") }}</li>
        <li>{{ $t("termsOfUse.p65") }}</li>
        <li class="pb-2">
          {{ $t("termsOfUse.p66") }}
        </li>
      </ol>
      <!-- <span class="font-serif pb-10 cursor-pointer">
        Read
        <nuxt-link :to="localePath({ name: 'privacy'})" class="text-grey my-auto ml-auto">
          {{ $t('app.sidebar.team.privacy') }}
        </nuxt-link>
      </span> -->
    </div>

    <div class="w-auto lg:w-1/3 sm:ml-6 lg:ml-12">
      <div class="sidenav--contents w-full hidden lg:block fixed">
        <terms-menu />
      </div>
    </div>
  </section>
</template>

<script>
import TermsMenu from '@/components/menus/TermsMenu'
import { TERMS_PRIVACY_MENU } from '@/services/helpers'

export default {
  layout: 'terms-privacy',

  name: 'Terms',

  components: { TermsMenu },

  mounted() {
    this.$store.dispatch(
      'public-menu/setTermsPrivacyMenu',
      TERMS_PRIVACY_MENU.values.terms
    )
  },

  destroyed() {
    this.$store.dispatch('public-menu/resetTermsPrivacyMenu')
  }
}
</script>

<style lang="postcss">
.page--terms-of-use {
  li {
    @apply .border-l-2 .border-transparent .pl-5 .mb-5;
  }

  .sidenav--contents {
    @apply .text-h7 .leading-tight .bg-white .py-6 .mb-16 .overflow-y-auto;
    max-width: 25rem;
    max-height: 75vh;
    top: 7rem;

    li {
      @apply .pl-0;
    }

    a {
      @apply .border-l-2 .border-transparent;

      &.active {
        @apply .text-red;
      }
    }

    ol {
      @apply pl-10 max-w-xs;
      counter-reset: my-awesome-counter;
      list-style: none;

      li {
        @apply .relative;
        margin: 0 0 0.5rem 0;
        counter-increment: my-awesome-counter;

        &::before {
          @apply .text-grey;
          content: counter(my-awesome-counter);
          position: absolute;
          --size: 32px;
          left: calc(-1 * var(--size) - 10px);
          width: var(--size);
          text-align: right;
        }
      }
    }

    a {
      @apply .text-grey-d1;
    }
  }

  .section--terms {
    @apply .font-sans .font-medium .tracking-wide .border-b .border-grey-l3 .pt-6 .mb-4 .-ml-8;
    width: 106%;
  }
  .section-active {
    @apply .border-b-2 .border-red;
  }
}
</style>
