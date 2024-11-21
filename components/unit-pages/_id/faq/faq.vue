<template>
  <section class="team__faq p-6 sm:p-10">
    <h2 class="text-h3 leading-tight">
      {{ $t('app.team.how_it_works.title') }}
    </h2>

    <div class="flex flex-wrap w-full mt-6">
      <div class="sm:w-full lg:w-1/2 xxl:w-1/4 mb-10 pr-0 lg:pr-10">
        <div class="app-card">
          <div>
            <h4>{{ $t('app.team.how_it_works.get_started.title') }}</h4>
            <p class="mb-6 mt-4 text-grey">
              {{ $t('app.team.how_it_works.get_started.body') }}
            </p>
          </div>
          <div class="self-end">
            <app-button :btn-class="'secondary'" :title="$t('app.team.how_it_works.get_started.button')" @clicked="openHubspotChat()" />
          </div>
        </div>
      </div>

      <div class="sm:w-full lg:w-1/2 xxl:w-1/4 mb-10 xxl:pr-10">
        <div class="app-card">
          <div>
            <h4>{{ $t('app.team.how_it_works.inventory.title') }}</h4>
            <p class="mb-6 mt-4 text-grey">
              {{ $t('app.team.how_it_works.inventory.body') }}
            </p>
          </div>
          <div class="self-end">
            <app-button :btn-class="'secondary'" :title="$t('app.team.how_it_works.inventory.button')" @clicked="onInventoryClicked()" />
          </div>
        </div>
      </div>

      <div class="sm:w-full lg:w-1/2 xxl:w-1/4 mb-10 pr-0 lg:pr-10">
        <div class="app-card">
          <div>
            <h4>{{ $t('app.team.how_it_works.deals.title') }}</h4>
            <p class="mb-6 mt-4 text-grey">
              {{ $t('app.team.how_it_works.deals.body') }}
            </p>
          </div>
          <div class="self-end">
            <app-button :btn-class="'secondary'" :title="$t('app.team.how_it_works.deals.button')" @clicked="onPackagesClicked()" />
          </div>
        </div>
      </div>

      <div class="sm:w-full lg:w-1/2 xxl:w-1/4 mb-10 xxl:pr-10">
        <div class="app-card">
          <div>
            <h4>{{ $t('app.team.how_it_works.communication.title') }}</h4>
            <p class="mb-6 mt-4 text-grey">
              {{ $t('app.team.how_it_works.communication.body') }}
            </p>
          </div>
          <div class="self-end">
            <app-button :title="$t('app.team.how_it_works.communication.button')" @clicked="onDealsClicked()" />
          </div>
        </div>
      </div>
    </div>

    <h2 class="mt-10">
      <span class="text-h3 leading-tight">{{ $t('app.team.faq.title') }}
        <span class="text-grey-l1 text-h3">({{ faqCount }})</span>
      </span>
    </h2>

    <div class="flex flex-wrap w-full mt-2">
      <div class="sm:w-full md:w-1/2 pr-0 sm:pr-10">
        <accordion-item
          v-for="(faqItem, index) in faqFirstHalf"
          :key="index"
          :show-icon="'lni-chevron-down'"
          :hide-icon="'lni-chevron-up'"
          class="pt-6"
        >
          <template v-slot:header>
            <h6>
              {{ faqItem.title }}
            </h6>
          </template>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <p :class="{'mb-4' : faqItem.link}" class="text-grey font-serif pb-4" v-html="faqItem.body" />
          <nuxt-link v-if="faqItem.link" :to="localePath(faqItem.link.to)">
            {{ faqItem.link.label }}
          </nuxt-link>
        </accordion-item>
      </div>

      <div class="sm:w-full md:w-1/2 xxl:pr-10">
        <accordion-item
          v-for="(faqItem, index) in faqSecondHalf"
          :key="index"
          :show-icon="'lni-chevron-down'"
          :hide-icon="'lni-chevron-up'"
          class="pt-6"
        >
          <template v-slot:header>
            <h6>
              {{ faqItem.title }}
            </h6>
          </template>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <p :class="{'mb-4' : faqItem.link}" class="text-grey font-serif" v-html="faqItem.body" />

          <nuxt-link v-if="faqItem.link" :to="localePath(faqItem.link.to)">
            {{ faqItem.link.label }}
          </nuxt-link>
        </accordion-item>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from '@/components/AppButton'
import AccordionItem from '@/components/AccordionItem'
import { openHubspotChat } from '@/plugins/hubspot'

export default {
  name: 'Faq',

  components: {
    AppButton,
    AccordionItem
  },

  computed: {
    faqFirstHalf() {
      const faq = this.$get(
        this.$i18n.messages[this.$i18n.locale],
        'app.team.faq.questions',
        []
      )
      return faq.splice(0, Math.ceil(faq.length / 2))
    },

    faqSecondHalf() {
      const faq = this.$get(
        this.$i18n.messages[this.$i18n.locale],
        'app.team.faq.questions',
        []
      )
      faq.splice(0, Math.ceil(faq.length / 2))
      return faq.splice(0, faq.length)
    },

    faqCount() {
      return this.faqFirstHalf.length + this.faqSecondHalf.length
    }
  },

  methods: {
    openHubspotChat,

    onInventoryClicked() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-inventory',
          params: this.$route.params
        })
      )
    },

    onDealsClicked() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-deals-dealId',
          params: this.$route.params
        })
      )
    },

    onPackagesClicked() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-packages-create',
          params: this.$route.params
        })
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.app-card {
  @apply .bg-white .p-6 .h-full .flex .flex-wrap .shadow-xl;
}

.team__faq {
}
</style>
