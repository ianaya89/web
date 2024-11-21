<template>
  <div class="contact-us overflow-hidden">
    <div class="w-full flex relative">
      <div class="hidden sm:block w-4 sm:w-32 xl:w-1/5 pl-4 xl:pl-10 z-10">
        <div class="w-3/5 relative flex flex-col pt-24 h-full" />
      </div>
      <div class="contact-us-content w-full xl:w-4/5 z-10 pr-32">
        <div :percentage-offset="0.5" class="border-l pt-56 pb-5">
          <div class="mb-8">
            <div class="flex flex-wrap pl-8 items-center">
              <!-- eslint-disable vue/no-v-html -->
              <h1
                class="uppercase text-5xl sm:text-h1 max-w-md pr-12 leading-none mb-8 xl:mb-0"
                v-html="$t('contact_us.title')"
              />
            </div>
          </div>

          <div class="w-full flex flex-wrap pl-8 mb-10">
            <div class="md:w-2/5">
              <div class="contact-us-subtitle links max-w-xs">
                <h4>
                  {{ $t('contact_us.subtitle_1') }}
                </h4>
              </div>
            </div>

            <div class="md:w-3/5 hidden md:block">
              <div class="contact-us-subtitle form">
                <h4 class="max-w-sm">
                  {{ $t('contact_us.subtitle_2') }}
                </h4>
              </div>
            </div>
          </div>

          <div :percentage-offset="0.5" class="w-full flex flex-wrap pl-8">
            <div class="w-full md:w-2/5">
              <div class="contact-us-links pr-10">
                <div class="contact-us-mail flex mb-5">
                  <div class="contact-us-icon">
                    <i class="fas fa-envelope" />
                  </div>
                  <div>
                    <div class="font-bold">
                      {{ $t('contact_us.team_brands_enquires') }}: <a class="font-normal" :href="'mailto:info@sponsoronline.eu'">info@sponsoronline.eu</a>
                    </div>
                    <!-- <div class="font-bold">
                      {{ $t('contact_us.media_enquires') }}: <a class="font-normal" v-bind:href="'mailto:zafer.ersoz@sponsoronline.eu'">zafer.ersoz@sponsoronline.eu</a>
                    </div> -->
                  </div>
                </div>
                <div class="contact-us-map flex mb-5">
                  <div class="contact-us-icon">
                    <i class="fas fa-map-marker-alt" />
                  </div>
                  <div>
                    <div><a :href="'https://www.google.com/maps/dir//Nower+End,+Nower+Rd,+Dorking+RH4+3BX,+UK/@51.228318,-0.3408862,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x4875e70f70b2629d:0x29a6bd38852c0806!2m2!1d-0.3386922!2d51.228318!3e0'" target="_blank">Nower End, Nower Road, Dorking, England, RH4 3BX</a></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full block md:hidden mb-10">
              <div class="">
                <h4 class="max-w-sm">
                  {{ $t('contact_us.subtitle_2') }}
                </h4>
              </div>
            </div>
            <div class="hubspot-form-wrapper w-full md:w-3/5 pl-10">
              <div v-once id="hubspotForm" class="max-w-sm" />
            </div>
          </div>
        </div>

        <div class="work-with-section border-l">
          <div class="w-full flex flex-wrap pl-8">
            <div class="border-r w-full logos-title-wrapper lg:w-1/4">
              <appear-transition :percentage-offset="0.5">
                <h2
                  class="work-with-title uppercase text-xl max-w-md pr-12 leading-none mb-8 xl:mb-0"
                  v-html="$t('contact_us.work_with.title')"
                />
              </appear-transition>
            </div>
            <!-- <div class="w-full lg:w-3/4 py-20 pl-8 border-b hidden md:block"> -->
            <appear-transition :percentage-offset="0.5" class="logos-wrapper w-full lg:w-3/4 py-20 pl-8 border-b hidden md:block">
              <alt-step-pager
                :items="imagesBatchesDesktop"
                :totalitems="images.length"
              >
                <template v-slot:content="props">
                  <logo-slider
                    class="w-full max-w-full"
                    :logobatches="props.item"
                  />
                </template>
              </alt-step-pager>
            </appear-transition>
            <appear-transition :percentage-offset="0.5" class="w-full py-5 block md:hidden">
              <alt-step-pager
                :items="imagesBatchesMobile"
                :totalitems="images.length"
              >
                <template v-slot:content="props">
                  <logo-slider
                    class="w-full max-w-full"
                    :logobatches="props.item"
                  />
                </template>
              </alt-step-pager>
            </appear-transition>
          </div>
        </div>

        <div class="testimonial-section border-l pb-32">
          <appear-transition :percentage-offset="0.5" class="w-full flex flex-wrap pl-8 mb-10">
            <div class="testimonial-title-wrapper border-r w-full py-20 lg:w-1/4">
              <appear-transition :percentage-offset="0.5">
                <h2
                  class="testimonial-title uppercase text-xl max-w-md pr-12 leading-none mb-8 xl:mb-0"
                  v-html="$t('contact_us.testimonials.title')"
                />
              </appear-transition>
            </div>
            <div class="testomonials-wrapper w-full lg:w-3/4 py-20 pl-8">
              <alt-step-pager
                :items="getTestimonials"
                :totalitems="getTestimonials.length"
              >
                <template v-slot:content="props">
                  <testimonial-card
                    :key="props.item.id"
                    class="w-full max-w-full"
                    :testimonial="props.item"
                  />
                </template>
              </alt-step-pager>
            </div>
          </appear-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppearTransition from '@/components/transitions/AppearTransition'
import AltStepPager from '@/components/widgets/AltStepPager'
import TestimonialCard from '@/components/TestimonialCard'
import LogoSlider from '@/components/LogoSlider'

export default {
  layout: 'landing',

  name: 'Contact',

  components: {
    AppearTransition,
    AltStepPager,
    TestimonialCard,
    LogoSlider
  },

  props: {},

  data() {
    return {
      images: [],
      imagesBatchesDesktop: [],
      imagesBatchesMobile: []
    }
  },

  computed: {
    getTestimonials() {
      return this.$get(
        this.$i18n.messages[this.$i18n.locale],
        'contact_us.testimonials.content',
        []
      )
    }
  },

  mounted() {
    this.importAll(require.context('../assets/images/clients/', true, /\.png$/))
    this.$store.dispatch('public-menu/setPermanentMenu', true)
    const script = document.createElement('script')
    script.src = '//js.hsforms.net/forms/v2.js?pre=1'
    document.body.appendChild(script)
    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '3982395',
          formId: '696a6902-644c-473a-8405-f460d05afe98',
          region: 'na1',
          target: '#hubspotForm'
        })
      }
    })

    this.sortLogosInBatches()
  },

  destroyed() {
    this.$store.dispatch('public-menu/setPermanentMenu', false)
  },

  methods: {
    redirectToTeamSignup() {
      return this.$router.push(this.localePath({ name: 'register' }))
    },

    importAll(r) {
      r.keys().forEach(key =>
        this.images.push({ pathLong: r(key), pathShort: key })
      )
    },

    sortLogosInBatches() {
      let tempArrDesktop = []
      let tempArrMobile = []
      for (let i = 1; i <= this.images.length; i++) {
        tempArrDesktop.push(this.images[i - 1])
        tempArrMobile.push(this.images[i - 1])
        if (i % 4 === 0) {
          this.imagesBatchesMobile.push(tempArrMobile)
          tempArrMobile = []
        }

        if (i % 5 === 0) {
          this.imagesBatchesDesktop.push(tempArrDesktop)
          tempArrDesktop = []
        }
      }

      if (tempArrMobile.length > 0) {
        this.imagesBatchesMobile.push(tempArrDesktop)
      }

      if (tempArrDesktop.length > 0) {
        this.imagesBatchesDesktop.push(tempArrDesktop)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.work-with-title,
.testimonial-title {
  font-size: 3rem;
  line-height: 1;
}

@media (max-width: 1600px) {
  .work-with-title,
  .testimonial-title {
    font-size: 2.5rem;
  }
}

.contact-us {
  @apply .w-full;
  counter-reset: section;

  &-subtitle {
    &.links {
      padding-right: 2.5rem;
    }
    &.form {
      padding-left: 2.5rem;
    }
  }

  a {
    color: #797979;
  }

  &-icon {
    margin-right: 0.5rem;

    i.fas {
      color: #ff553f;
    }
  }
  .logos-title-wrapper {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  @media (max-width: 1023px) {
    .logos-title-wrapper,
    .testimonial-title-wrapper {
      padding-top: 5rem;
      padding-bottom: 0;
      border-right: none !important;
    }
    .logos-wrapper {
      border-bottom: none !important;
    }
  }
  @media (max-width: 767px) {
    &-content.pr-32 {
      padding-right: 2rem;
    }
    &-links {
      margin-bottom: 4rem;
    }
    .hubspot-form-wrapper.pl-10 {
      padding-left: 0;
    }
    .testomonials-wrapper {
      padding-left: 0;
      padding-top: 1.25rem;
    }
    .testimonial-section.pb-32 {
      padding-bottom: 2rem;
    }
    .pt-56 {
      padding-top: 12rem;
    }
  }
  @media (max-width: 500px) {
    &-content.pr-32 {
      padding-right: 1rem;
    }
    .work-with-section,
    .testimonial-section {
      > div.pl-8 {
        padding-left: 1rem;
      }
    }
    .pl-8 {
      padding-left: 1rem;
    }
    .testomonials-wrapper {
      padding-left: 0;
    }
  }
  .clearfix {
    overflow: auto;
  }
}
</style>
