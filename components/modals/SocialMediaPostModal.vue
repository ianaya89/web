<template>
  <modal
    ref="modal"
    :header="false"
    :footer="false"
    :modal-size-classes="'min-h-screen sm:min-h-auto sm:max-w-xl sm:mx-12'"
    :class="{'': hasMedia, 'modal-social-no-media': !hasMedia}"
  >
    <template v-slot:body>
      <div class="modal-closer" @click="close">
        <span class="lni-close" />
      </div>
      <div class="w-full flex flex-wrap h-128">
        <div v-if="socialPost.type==='image' || socialPost.type==='video'" class="w-full lg:w-1/2 image-container flex-wrap overflow-hidden h-full">
          <div class="bg-black w-full h-full absolute" />
          <div class="social-post-image-bg" :style="{ 'background-image': 'url('+$get(socialPost,'image.url', undefined)+')' }" />
          <div class="flex justify-center items-center">
            <div class="z-40 relative">
              <img
                ref="postImage"
                class="post-img w-5/6"
                :src="$get(socialPost,'image.url', undefined)"
                alt="Social media post cover image"
              >
              <canvas ref="imageCanvas" class="w-5/6 image-canvas z-50" />
            </div>
          </div>
        </div>
        <div class="w-full p-6 flex flex-col bg-white" :class="{'lg:w-1/2': hasMedia, 'lg:w-full': !hasMedia}">
          <div class="w-full flex mt-10 sm:mt-0 mb-2">
            <avatar :src="$get(socialPost,'socialAccount.profilePicture.url')" :classes="'w-10 h-10'" />
            <div class="ml-2 my-auto">
              <h6 class="font-medium font-sans">
                {{ $get(socialPost,'socialAccount.name', '-') }}
              </h6>
              <!--        <p class="text-grey">-->
              <!--          @tag-->
              <!--        </p>-->
            </div>
            <span class="social-type" :class="$helpers.socialMediaIcon(socialType)" />
          </div>
          <div class="relative">
            <div class="hidden xl:block fading-gradient h-16" />
            <div class="w-full py-2 border-b border-grey-l2 xl:h-48 overflow-y-scroll">
              <p class="xl:pb-14">
                {{ $get(socialPost,'content', '-') }}
              </p>
            </div>
          </div>
          <div class="w-full flex pt-2 pb-6">
            <social-media-post-stats :social-type="socialType" :post="socialPost" />
            <span class="ml-auto my-auto text-grey text-p3">{{ $get(socialPost,'publishedAt', '-') | dateTimeShort }}</span>
          </div>
          <transition name="fade-up">
            <div v-show="!$apollo.queries.taggedUnitsInSocialPosts.loading" class="w-full mt-auto xl:overflow-y-auto sponsored-brands">
              <div class="w-full flex">
                <div class="w-1/2 sm:w-3/5 pr-1">
                  <span class="text-p5 font-sans text-grey uppercase leading-tight">{{ $tc('app.brand.profile.social.sponsored_brand', $get(socialPost, 'orgUnitsOccurred',[]).length) }}</span>
                </div>
                <div class="w-1/4 sm:w-1/5 pr-1">
                  <span class="text-p5 font-sans text-grey uppercase leading-tight">{{ $t('app.brand.profile.social.reach_valuation') }}</span>
                </div>
                <div class="w-1/4 sm:w-1/5 pr-1">
                  <span class="text-p5 font-sans text-grey uppercase leading-tight">{{ $t('app.brand.profile.social.engagement_valuation') }}</span>
                </div>
              </div>
              <div v-for="taggedUnitsInSocialPost in taggedUnitsInSocialPosts" :key="taggedUnitsInSocialPost.id" class="sponsored-brand">
                <div class="w-1/2 sm:w-3/5 pr-1">
                  <div class="bg-grey-l4 px-2 font-medium flex min-h-16">
                    <div class="w-9 h-9 my-auto">
                      <avatar :src="$get(taggedUnitsInSocialPost, 'organizationUnit.entity.logo.url', undefined)" :classes="'w-9 h-9'" />
                    </div>
                    <div class="mx-2 my-auto text-p2 font-sans font-medium leading-tight">
                      {{ $get(taggedUnitsInSocialPost, 'organizationUnit.entity.name', '-') | truncate(40) }}
                    </div>
                  </div>
                </div>
                <div class="w-1/4 sm:w-1/5 pr-1">
                  <div class="bg-grey-l4 px-2 font-medium min-h-16 flex">
                    <span class="my-auto ml-auto font-sans text-right">{{ $get(taggedUnitsInSocialPost, 'reachValuation', 0) | currency($get(taggedUnitsInSocialPost, 'reachValuation', 0) > 99999) }}</span>
                  </div>
                </div>
                <div class="w-1/4 sm:w-1/5 pr-1">
                  <div class="bg-grey-l4 px-2 font-medium min-h-16 flex">
                    <span class="my-auto ml-auto font-sans text-right">{{ $get(taggedUnitsInSocialPost, 'engagementValuation', 0) | currency($get(taggedUnitsInSocialPost, 'engagementValuation', 0) > 99999) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'
import Avatar from '@/components/Avatar'
import SocialMediaPostStats from '@/components/social/SocialMediaPostStats'
import { SocialPostTaggedOrganizationsQuery } from '@/services/graphql'

export default {
  name: 'SocialMediaPostModal',

  components: {
    Modal,
    Avatar,
    SocialMediaPostStats
  },

  props: {
    socialPost: {
      type: Object,
      required: true
    },
    socialType: {
      type: String,
      required: true
    }
  },

  apollo: {
    taggedUnitsInSocialPosts: {
      ...SocialPostTaggedOrganizationsQuery,
      variables() {
        return {
          id: this.socialPost.id
        }
      }
    }
  },

  data: () => ({
    canvasContext: null,
    taggedUnitsInSocialPosts: []
  }),

  computed: {
    hasMedia() {
      return (
        this.$get(this.socialPost, 'type', null) === 'image' ||
        this.$get(this.socialPost, 'type', null) === 'video'
      )
    },

    imageSize() {
      if (!this.$refs.postImage) {
        return null
      }

      return {
        width: this.$refs.postImage.width,
        height: this.$refs.postImage.height
      }
    }
  },

  mounted() {
    // if (this.socialPost.type === 'image' && this.$refs.imageCanvas != null) {
    //   this.canvasContext = this.$refs.imageCanvas.getContext('2d')
    // }
  },

  methods: {
    open() {
      this.$refs.modal.open()

      this.$nextTick(() => {
        if (this.imageSize !== null) {
          this.$refs.imageCanvas.width = this.imageSize.width
          this.$refs.imageCanvas.height = this.imageSize.height
          this.drawTagsPolygons()
        }
      })
    },

    close() {
      this.$refs.modal.close()
    },

    drawTagsPolygons() {
      const canvasContext = this.$refs.imageCanvas.getContext('2d')
      canvasContext.lineWidth = 1
      canvasContext.strokeStyle = '#00ff00'
      canvasContext.lineCap = 'square'

      this.taggedUnitsInSocialPosts.map(socialAccPostOrgUnit => {
        this.$get(socialAccPostOrgUnit, 'logoCoordinates', []).map(
          logoCoords => {
            canvasContext.beginPath()

            logoCoords.values.map((coords, index) => {
              if (index === 0) {
                canvasContext.moveTo(
                  coords.x * this.imageSize.width,
                  coords.y * this.imageSize.height
                )
              } else {
                canvasContext.lineTo(
                  coords.x * this.imageSize.width,
                  coords.y * this.imageSize.height
                )
              }
            })

            canvasContext.lineTo(
              logoCoords.values[0].x * this.imageSize.width,
              logoCoords.values[0].y * this.imageSize.height
            )
            canvasContext.closePath()
            canvasContext.stroke()
          }
        )
      })
    }
  }
}
</script>

<style lang="postcss">
.modal {
  .modal-body {
    @apply .p-0 .font-serif .relative !important;

    .modal-closer {
      @apply .absolute .top-0 .py-3 .px-4 .text-white .font-bold .text-p1 .cursor-pointer z-50;
      right: -3rem;
      top: -1rem;
    }

    @media (max-width: 640px) {
      .modal-closer {
        @apply .bg-white .text-black .shadow-lg;
        right: 0rem;
        top: -00rem;
      }
    }

    .image-container {
      @apply .flex .relative;

      .image-canvas {
        @apply .absolute .inset-0;
      }

      .social-post-image-bg {
        @apply .bg-center .bg-no-repeat .bg-cover .absolute .inset-0 .opacity-50;
        -webkit-filter: blur(10px);
        -moz-filter: blur(10px);
        -o-filter: blur(10px);
        -ms-filter: blur(10px);
        filter: blur(10px);
        transform: scale(1.1);
      }
    }

    .sponsored-brand {
      @apply .w-full .flex .mb-1;

      &:last-of-type {
        @apply .mb-0;
      }
    }
  }
}

.modal-footer {
  @apply .border-grey-l3 .pt-0 .pb-4 .px-8 .font-serif .w-full;
}

.sponsored-brands {
  max-height: 15rem;
}

@media (max-width: 991px) {
  .sponsored-brands {
    max-height: 100%;
  }
}

.social-type {
  @apply .ml-auto .text-h3 .mb-auto;

  &.fa-facebook-square {
    color: #3c5a99;
  }

  &.fa-facebook-f {
    color: #3c5a99;
  }

  &.fa-instagram {
    color: #dc4175;
  }

  &.fa-youtube {
    color: #c4302b;
  }

  &.fa-twitter-square {
    color: #00aced;
  }
}
.modal-social-no-media {
  .modal {
    @apply .w-1/3;
  }

  @media (max-width: 576px) {
    .modal {
      @apply .w-full;
    }
  }

  @media (min-width: 577px) and (max-width: 992px) {
    .modal {
      @apply .w-2/3;
    }
  }
}
</style>
