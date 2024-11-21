<template>
  <div class="blog__wrapper flex flex-col min-h-screen">
    <public-menu class="public-menu" :permanent-dark-logo="true" />

    <div class="w-full flex relative min-h-screen container px-4 mx-auto">
      <div class="w-4 lg:w-16 xl:w-1/5 sm:pl-4 xl:pl-10 z-10">
        <div class="w-3/4 relative flex flex-col xl:border-r border-grey-l3 pt-24 h-full">
          <div class="scroll-info hidden xl:block">
            <span>
              {{ $t('public.scroll') }}
            </span>
          </div>
        </div>
      </div>
      <div class="content xl:w-4/5">
        <nuxt class="m-2 lg:m-12" />
      </div>
    </div>

    <app-footer />

    <portal-target name="modals-outlet" multiple />
  </div>
</template>

<script>
import App from './app'
import Logo from '@/components/Logo'
import AppFooter from '@/components/AppFooter'
import PublicMenu from '@/components/menus/PublicMenu'

export default App.extend({
  name: 'Blog',

  components: {
    Logo,
    // PublicHeader,
    PublicMenu,
    AppFooter
  },

  head: {
    title: 'News',
    titleTemplate: '%s | SPONSOR.ONLINE'
  }
})
</script>

<style lang="postcss">
.blog__wrapper .public-menu {
  ul li {
    a {
      @apply .text-black;

      &:hover {
        @apply .text-grey;
      }
    }

    span {
      @apply .text-black;

      &:hover {
        @apply .text-grey;
      }
    }
  }

  span {
    @apply .text-black;
  }

  a {
    @apply .text-black;

    &:hover {
      @apply .text-grey;
    }
  }
}

.blog__wrapper .content {
  @apply .w-full;
  padding-top: 6rem;
}

.blog__wrapper .scroll-info {
  @apply .relative .mt-128 .h-8 .-mr-px .uppercase .border-r .border-red;
}

.blog__wrapper .scroll-info > span {
  @apply .absolute .block .font-serif .text-grey .text-p3;
  transform: rotate(-90deg);
  right: -2rem;
  top: 2.25rem;
}
</style>
