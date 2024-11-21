<template>
  <section class="blog">
    <h1 class="container flex mt-16 lg:mt-0">
      <nuxt-link :to="localePath({name: 'news'})" class="mb-8 font-medium uppercase text-h1 text-black hover:text-red leading-none">
        {{ $t('blog.headings.main.index') }}
      </nuxt-link>
    </h1>

    <div class="container flex-col lg:flex lg:flex-row">
      <div class="w-full lg:w-2/3 lg:pr-8">
        <blog-latest-posts />
      </div>
      <div class="w-full lg:w-1/3">
        <blog-top-posts />
        <blog-newsletter />
        <blog-tags />
      </div>
    </div>
  </section>
</template>

<script>
import BlogTags from '@/components/widgets/BlogTags'
import BlogTopPosts from '@/components/widgets/BlogTopPosts'
import BlogLatestPosts from '@/components/widgets/BlogLatestPosts'
import BlogNewsletter from '@/components/widgets/BlogNewsletter'

export default {
  layout: 'blog',

  transition: 'slide-fade',

  components: {
    BlogTags,
    BlogTopPosts,
    BlogLatestPosts,
    BlogNewsletter
  }
}
</script>

<style lang="postcss">
</style>
