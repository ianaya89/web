<template>
  <div :class="size" class="widget__blog-post has-transition">
    <content-placeholders v-if="showMock">
      <content-placeholders-heading :img="true" />
      <content-placeholders-text :lines="mockedLines" />
    </content-placeholders>

    <nuxt-link v-else :to="localePath({ name: 'news-slug', params: { slug: post.slug }})" class="widget__blog-post__link flex">
      <div class="widget__blog-post__image relative has-transition">
        <img :data-src="post.title_photo.url" :alt="post.title" class="block w-full lazyload">
        <span v-if="mainTag" class="widget__blog-post__tag p5">
          #{{ mainTag }}
        </span>
      </div>
      <div class="widget__blog-post__details">
        <h6 :title="post.title" class="pb-1 text-black font-medium font-sans">
          {{ post.title | truncate(70) }}
        </h6>

        <div>
          <nuxt-link :to="localePath({ name: 'news', query: { author: post.author }})" class="block text-red hover:text-red-d1 p2 py-0 leading-tight">
            {{ post.author }}
          </nuxt-link>
          <p class="p2 py-1 text-grey-l1 leading-tight">
            {{ post.published_at | date }} &mdash; {{ post.read_time }} {{ $t('general.read_time') }}
          </p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'small'
    }
  },

  computed: {
    showMock() {
      return !this.post.title
    },

    mockedLines() {
      switch (this.size) {
        case 'medium':
          return 3
        case 'large':
          return 8
        default:
          return 0
      }
    },

    mainTag() {
      return this.post.tags.length && this.$get(this.post, 'tags.0.name', null)
    }
  }
}
</script>

<style lang="postcss">
.widget__blog-post {
  &__tag {
    @apply .absolute .bg-grey-l4 .font-serif .font-normal .text-grey .py-1 .px-2;
  }

  &__details {
    @apply .font-serif;
  }

  &__image:hover {
    transform: scale(1.05);
  }

  &.small {
    ^&__tag {
      bottom: 26px;
      @apply .relative;
    }

    ^&__image {
      @apply .w-1/3 .pr-4;
    }

    ^&__details {
      @apply .w-2/3;

      > h6 {
        @apply .text-h7;
      }
    }
  }

  &.medium {
    ^&__details {
      > h6 {
        @apply .text-h4;
      }
    }
  }

  &.large {
    ^&__details {
      @apply .w-full .flex-col .leading-tight;

      > h6 {
        @apply .w-full .text-h3;
      }

      > div {
        @apply .w-full .py-2;
      }
    }
  }

  &.medium,
  &.large {
    @apply .mb-4;

    ^&__tag {
      bottom: 0;
    }

    ^&__link {
      @apply .flex-col;
    }

    ^&__image {
      @apply .w-full .mb-3;
    }
  }
}

@screen md {
  .widget__blog-post {
    &.medium,
    &.large {
      @apply .mb-4 .pr-4;
    }
  }
}

@screen lg {
  .widget__blog-post {
    &.large {
      ^&__details {
        @apply .flex .flex-row .text-right;

        > h6 {
          @apply .w-2/3 .text-left;
        }

        > div {
          @apply .w-1/3 .text-right;
        }
      }
    }

    &.medium,
    &.large {
      @apply .mb-12 .pr-12;
    }
  }
}
</style>
