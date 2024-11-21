<template>
  <section class="blog-post min-h-screen">
    <div v-if="$apollo.loading">
      <content-placeholders>
        <content-placeholders-heading :img="true" />
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </div>

    <div v-else>
      <div class="flex-col lg:flex lg:flex-row">
        <div class="w-full lg:w-1/4">
          <nuxt-link :to="localePath({ name: 'news' })" class="flex items-center justify-start text-grey hover:text-red py-2">
            <span class="text-h3 pr-2">&lsaquo;</span> <span class="pt-2">{{ $t('blog.links.back') }}</span>
          </nuxt-link>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="font-serif mb-12">
            <h1 :title="post.title" class="text-left text-h3 pb-1 text-black font-medium font-sans">
              {{ post.title | truncate(70) }}
            </h1>

            <div class="flex flex-wrap justify-start">
              <nuxt-link :to="localePath({ name: 'news', query: { author: post.author }})" class="block text-red p2 py-1 mr-8 hover:text-red-d1">
                {{ post.author }}
              </nuxt-link>
              <p class="w-full sm:w-auto p2 py-1 text-grey-l1">
                {{ post.published_at | date }} &mdash; {{ post.read_time }} {{ $t('general.read_time') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative w-full lg:w-1/2 mb-12">
        <img :src="post.title_photo.url" :alt="post.title" class="block w-full">
        <span v-if="mainTag" class="absolute bg-grey-l4 font-normal text-grey py-px px-2 p3 bottom-0">
          #{{ mainTag }}
        </span>
      </div>

      <div class="flex-col lg:flex lg:flex-row">
        <div class="w-full lg:w-1/4">
          <div class="flex items-center">
            <h6 class="font-normal text-p4 pr-2">
              {{ $t('blog.headings.sections.share') }}:
            </h6>
            <social-media-share :url="postUrl" />
          </div>
        </div>

        <div class="w-full lg:w-2/3">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="blog-post__body" v-html="post.body" />

          <div class="flex flex-col items-center border-t border-grey-l3 py-12">
            <h4 class="font-medium">
              {{ $t('blog.headings.social.claim') }}
            </h4>
            <social-media-share :url="postUrl" />
          </div>
        </div>
      </div>

      <div class="w-full">
        <p class="text-p2 uppercase text-grey border-t border-grey-l2 pt-6 my-4">
          {{ $t('blog.headings.sections.recommended') }}
        </p>

        <div class="flex flex-wrap">
          <div v-for="post in post.related" :key="post.id" class="w-full lg:w-1/3">
            <blog-post :post="post" size="medium" class="w-full" />
          </div>

          <p v-if="post.related.length === 0" class="no-results">
            {{ $t('errors.no-posts') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { metaDescriptions, metaTitles } from '@/services/seo'
import BlogPost from '@/components/widgets/BlogPost'
import SocialMediaShare from '@/components/social/SocialMediaShare'
import { SinglePostQuery } from '@/services/graphql/index'

export default {
  layout: 'blog',

  transition: 'slide-fade',

  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.post.title_photo.url
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.postUrl
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.post.title_photo.url
        },
        ...metaTitles(this.post.title),
        ...metaDescriptions(this.post.excerpt)
      ]
    }
  },

  components: {
    BlogPost,
    SocialMediaShare
  },

  apollo: {
    post: {
      ...SinglePostQuery,
      skip() {
        return this.postId === null
      },
      variables() {
        return {
          postId: this.postId
        }
      },
      error() {
        this.redirectToIndex()
      }
    }
  },

  data: () => ({
    post: SinglePostQuery.mock
  }),

  computed: {
    postId() {
      const slug = this.$route.params.slug
      const id = slug.substring(0, slug.indexOf('__'))

      if (!id) {
        this.redirectToIndex()
        return null
      }

      return id
    },

    mainTag() {
      return this.post.tags.length && this.$get(this.post, 'tags.0.name', null)
    },

    postUrl() {
      return window.location.href
    }
  },

  methods: {
    redirectToIndex() {
      this.$router.push(this.localePath({ name: 'news-index' }))
    }
  }
}
</script>

<style lang="postcss">
.blog-post__body {
  @apply .pb-6 .font-serif .text-h7 .leading-normal;

  p,
  ul {
    @apply .mb-6 .text-grey;
  }

  strong {
    @apply .text-black;
  }

  h1 {
    @apply .font-sans .text-black .text-h2 .font-normal;
  }

  h2 {
    @apply .font-sans .text-black .text-h3 .font-normal;
  }

  ul {
    li {
      @apply .leading-loose;
    }
  }

  img {
    @apply .block .w-full;

    + em {
      @apply .block .w-full .mt-2 .text-center .text-p3;
    }
  }

  blockquote {
    @apply .text-h3 .font-normal .leading-tight .pt-16 .pb-6 .relative;

    &:before {
      @apply .block .absolute .text-grey-l3;
      content: '\201C';
      left: 0rem;
      top: -4rem;
      font-size: 12rem;
    }
  }
}

@screen lg {
  .blog-post__body {
    blockquote {
      @apply .py-6 .-ml-20;

      &:before {
        left: -8rem;
        top: 0;
        font-size: 12rem;
      }
    }
  }
}
</style>
