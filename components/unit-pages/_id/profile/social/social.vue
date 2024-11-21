<template>
  <transition name="fade-up" :appear="true">
    <section class="brand__profile__social">
      <div class="w-full mt-12">
        <h5 class="uppercase">
          {{ $t('app.brand.profile.social.title') }}
          <span class="text-grey">({{ postsPaginator.total }})</span>
        </h5>
      </div>
      <div class="w-full flex flex-wrap xl:flex-no-wrap py-4">
        <app-select v-model="selectedSocialSource" :items="socialSourcesItems" :solo-label="$t('app.brand.profile.social.social_network')" class="w-1/2 sm:w-auto pr-2" />
        <app-select v-model="selectedTeam" :items="teamItems" :solo-label="$t('app.brand.profile.social.followed_team')" class="w-1/2 sm:w-auto sm:pr-2" />
        <app-select v-model="selectedMentionType" :items="mentionTypeItems" :solo-label="$t('app.brand.profile.social.mention_type')" class="w-1/3 sm:w-auto sm:max-w-3xs pr-2 xl:pr-16" />
        <app-select v-model="selectedOrder" :items="orderTypeItems" :solo-label="$t('app.brand.profile.social.order_type')" class="w-1/3 sm:w-auto sm:max-w-3xs pr-2" />
        <app-select v-model="selectedOrderDirection" :items="orderTypeDirectionItems" :solo-label="$t('app.brand.profile.social.order_direction')" class="w-1/3 sm:w-auto sm:max-w-32" />
      </div>
      <div class="w-full -ml-1">
        <content-placeholders v-if="$apollo.queries.postsWhereWasOccurred.loading" class="w-full">
          <content-placeholders-text class="w-full" :lines="10" />
        </content-placeholders>
        <div v-else class="w-full flex flex-wrap mb-16">
          <div v-masonry transition-duration="1s" item-selector=".post-item" class="w-full pb-4">
            <div v-for="post in postsWhereWasOccurred.data" :key="post.id" v-masonry-tile class="post-item p-1 w-full sm:w-64">
              <social-media-post :post="post" :social-type="selectedSocialSource" />
            </div>
          </div>
          <div v-if="postsWhereWasOccurred.data.length === 0" class="w-1/5 text-center text-h4 text-grey m-auto flex flex-col pt-4">
            <span class="lni-star-empty text-h3 text-grey-l2 mb-4" />
            <span>{{ $t('app.brand.profile.social.no_posts') }}</span>
          </div>
          <div v-else-if="postsPaginator.lastPage > 1" class="w-full pt-8">
            <pagination v-model="page" :length="postsPaginator.lastPage" />
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import {
  BrandSocialMediaQuery,
  BrandSocialWasOccurredQuery
} from '@/services/graphql'
import AppSelect from '@/components/AppSelect'
import SocialMediaPost from '@/components/social/SocialMediaPost'
import Pagination from '@/components/Pagination'

export default {
  name: 'Social',

  components: {
    SocialMediaPost,
    AppSelect,
    Pagination
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...BrandSocialMediaQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    },
    postsWhereWasOccurred: {
      ...BrandSocialWasOccurredQuery,
      variables() {
        return {
          id: this.unitId,
          page: this.page,
          count: 12,
          filter: {
            socialAccountType: this.selectedSocialSource.toUpperCase(),
            postedByTeamId: this.selectedTeam,
            postType: this.selectedMentionType
          },
          orderBy: {
            field: this.selectedOrder,
            order: this.selectedOrderDirection
          }
        }
      },
      skip() {
        return this.selectedSocialSource === null
      },
      update(data) {
        return this.$get(data, 'unit.entity.postsWhereWasOccurred', {
          data: [],
          paginatorInfo: {
            lastPage: 0
          }
        })
      }
    }
  },

  data: () => ({
    unit: BrandSocialMediaQuery.mock,
    socialPosts: [],
    selectedSocialSource: 'facebook',
    selectedTeam: null,
    selectedMentionType: 'IMAGE',
    selectedOrder: 'published_at',
    selectedOrderDirection: 'DESC',
    postsWhereWasOccurred: {
      data: [],
      paginatorInfo: {
        lastPage: 0,
        total: 0
      }
    },
    page: 1
  }),

  computed: {
    posts() {
      return this.$get(this.postsWhereWasOccurred, 'data', [])
    },

    postsPaginator() {
      return this.$get(this.postsWhereWasOccurred, 'paginatorInfo', {
        lastPage: 0,
        total: 0
      })
    },

    socialSourcesItems() {
      return [
        {
          text: this.$t('general.facebook'),
          value: 'facebook'
        },
        {
          text: this.$t('general.twitter'),
          value: 'twitter'
        },
        {
          text: this.$t('general.instagram'),
          value: 'instagram'
        }
      ]
    },

    teamItems() {
      return [
        ...this.$get(this.unit, 'entity.followedTeams', []).map(item => ({
          text: item.name,
          value: item.id
        })),
        { text: this.$t('general.none'), value: null }
      ]
    },

    orderTypeDirectionItems() {
      return [
        {
          text: this.$t('general.desc'),
          value: 'DESC'
        },
        {
          text: this.$t('general.asc'),
          value: 'ASC'
        }
      ]
    },

    orderTypeItems() {
      return [
        {
          text: this.$t('app.brand.profile.social.order.published_at'),
          value: 'published_at'
        },
        {
          text: this.$t('app.brand.profile.social.order.likes'),
          value: 'likes'
        },
        {
          text: this.$t('app.brand.profile.social.order.shares'),
          value: 'shares'
        },
        {
          text: this.$t('app.brand.profile.social.order.comments'),
          value: 'comments'
        },
        {
          text: this.$t('app.brand.profile.social.order.engagement'),
          value: 'engagement'
        },
        {
          text: this.$t('app.brand.profile.social.order.reach'),
          value: 'reach'
        },
        {
          text: this.$t('app.brand.profile.social.order.valuation'),
          value: 'valuation'
        }
      ]
    },

    mentionTypeItems() {
      return [
        {
          text: this.$t('general.image'),
          value: 'IMAGE'
        },
        {
          text: this.$t('general.text'),
          value: 'TEXT'
        },
        {
          text: this.$t('general.video'),
          value: 'VIDEO'
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.brand__profile__social {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
  @apply .relative .pb-16;
}

@media (max-width: 768px) {
  .brand__profile__social {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .brand__profile__social {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
