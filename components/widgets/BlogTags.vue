<template>
  <div class="blog__tags py-4 mt-8">
    <p class="text-p2 uppercase font-medium text-grey border-b border-grey-l3 pb-4 mb-4">
      {{ $t('blog.headings.sections.tags') }}
    </p>

    <div class="flex flex-wrap">
      <blog-tag-link v-for="tag in tags" :key="tag.id" :tag="tag" />

      <p v-if="tags.length === 0" class="no-results">
        {{ $t('errors.no-tags') }}
      </p>
    </div>
  </div>
</template>

<script>
import BlogTagLink from '@/components/BlogTagLink'
import { TagsQuery } from '@/services/graphql/index'

export default {
  components: {
    BlogTagLink
  },

  apollo: {
    tags: TagsQuery
  },

  data: () => ({
    tags: TagsQuery.mock
  })
}
</script>
