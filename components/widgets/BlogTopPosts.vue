<template>
  <div class="blog__top-posts mt-12 lg:mt-0">
    <p class="text-p2 uppercase font-medium text-grey mb-6">
      {{ $t('blog.headings.sections.top_posts') }}
    </p>

    <div>
      <blog-post v-for="post in posts" :key="post.id" :post="post" class="w-full border-b border-grey-l4 pb-2 mb-6" />

      <p v-if="posts.length === 0" class="no-results">
        {{ $t('errors.no-posts') }}
      </p>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/widgets/BlogPost'
import { TopPostsQuery } from '@/services/graphql/index'

export default {
  components: {
    BlogPost
  },

  apollo: {
    posts: TopPostsQuery
  },

  data: () => ({
    posts: TopPostsQuery.mock
  })
}
</script>
