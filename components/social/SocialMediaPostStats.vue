<template>
  <div>
    <div v-if="socialType === 'instagram'" class="w-full flex text-menu">
      <span class="fas fa-heart my-auto" />
      <span class="ml-2 lowercase my-auto font-serif">{{ post.likes | number(post.likes > 10000) }}</span>
      <span class="fas fa-comments ml-4 my-auto" />
      <span class="ml-2 lowercase my-auto font-serif text-menu">{{ post.comments | number(post.comments > 10000) }}</span>
      <span class="fas fa-users ml-4 my-auto" />
      <span class="ml-2 lowercase my-auto font-serif text-menu">{{ $get(post,'reach','-') | number(post.reach > 10000) }}</span>
    </div>
    <div v-if="socialType === 'facebook'" class="w-full flex text-menu">
      <span class="fas fa-thumbs-up my-auto" />
      <span class="ml-2 lowercase my-auto font-serif">{{ post.likes | number(post.likes > 10000) }}</span>
      <span class="fas fa-comments ml-4 my-auto" />
      <span class="ml-2 lowercase my-auto font-serif text-menu">{{ post.comments | number(post.comments > 10000) }}</span>
      <span class="fas fa-users ml-4 my-auto" />
      <span class="ml-2 lowercase my-auto font-serif text-menu">{{ $get(post,'reach','-') | number(post.reach > 10000) }}</span>
    </div>
    <div v-if="socialType === 'twitter'" class="w-full flex text-menu">
      <span class="fas fa-thumbs-up my-auto" />
      <span class="ml-2 lowercase my-auto font-serif">{{ post.likes | number(post.likes > 10000) }}</span>
      <span class="fas fa-comments ml-4 my-auto text-menu" />
      <span class="ml-2 lowercase my-auto">{{ post.comments | number(post.comments > 10000) }}</span>
      <span class="fas fa-users ml-4 my-auto" />
      <span class="ml-2 lowercase my-auto font-serif text-menu">{{ $get(post,'reach','-') | number(post.reach > 10000) }}</span>
    </div>
    <div v-if="socialType === 'youtube'" class="w-full flex text-menu">
      <span class="fas fa-thumbs-up my-auto" />
      <span class="ml-2 lowercase my-auto font-serif">{{ post.likes | number(post.likes > 10000) }}</span>
      <span class="fas fa-comments ml-4 my-auto" />
      <span class="ml-2 lowercase my-auto font-serif">{{ post.comments | number(post.comments > 10000) }}</span>
      <span class="fas fa-users ml-4 my-auto" />
      <span class="ml-2 lowercase my-auto font-serif text-menu">{{ $get(post,'reach','-') | number(post.reach > 10000) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialMediaPostStats',
  props: {
    post: {
      type: Object,
      required: true
    },
    socialType: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.social-type {
  @apply .ml-auto .text-h3 .my-auto;

  &.fa-facebook-square {
    color: #3c5a99;
  }

  &.fa-instagram {
    @apply .text-p2;
    color: #dc4175;
  }

  &.fa-youtube {
    color: #c4302b;
  }

  &.fa-twitter-square {
    color: #00aced;
  }
}
</style>
