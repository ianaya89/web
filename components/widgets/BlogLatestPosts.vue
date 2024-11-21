<template>
  <div class="blog__latest-posts">
    <p class="text-p2 uppercase font-medium text-grey mb-6">
      {{ title }}
    </p>

    <div class="flex flex-wrap">
      <blog-post :post="featuredPost" size="large" class="w-ful pb-12" />
      <blog-post v-for="post in additionalPosts" :key="post.id" :post="post" size="medium" class="w-full md:w-1/2 pb-8" />

      <p v-if="posts.length === 0" class="no-results">
        {{ $t('errors.no-posts') }}
      </p>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/widgets/BlogPost'
import { FilteredPostsQuery } from '@/services/graphql/index'

export default {
  components: {
    BlogPost
  },

  apollo: {
    posts: {
      ...FilteredPostsQuery,
      variables() {
        return {
          author: this.$route.query.author || null,
          tag: this.$route.query.tag || null
        }
      }
    }
  },

  data: () => ({
    posts: FilteredPostsQuery.mock
  }),

  computed: {
    title() {
      if (this.$route.query.author) {
        return this.$t('blog.filters.author') + ': ' + this.$route.query.author
      }

      if (this.$route.query.tag) {
        return this.$t('blog.filters.category') + ': ' + this.$route.query.tag
      }

      return this.$t('blog.headings.sections.news')
    },

    featuredPost() {
      return this.posts[0]
    },

    additionalPosts() {
      return this.posts.slice(1)
    }
  }
}
</script>
