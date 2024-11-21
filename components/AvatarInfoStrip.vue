<template>
  <div class="avatar-strip-info">
    <avatar class="px-2 my-auto" v-bind="$props" :classes="classes" />
    <div class="px-2 flex flex-col">
      <div class="my-auto">
        <div class="font-medium leading-tight pt-1">
          {{ title }}
        </div>
        <div class="text-grey leading-tight">
          {{ info }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'AvatarInfoStrip',

  components: {
    Avatar
  },

  props: {
    alt: {
      type: String,
      default: 'Image alt'
    },
    src: {
      type: String,
      default:
        'https://worldsportlogos.com/wp-content/uploads/2018/01/Chelsea-logo-768x432.png'
    },
    title: {
      type: String,
      default: 'Title'
    },
    info: {
      type: String,
      default: 'Info'
    },
    classes: {
      type: String,
      default: 'w-12 h-12'
    }
  }
}
</script>

<style lang="postcss" scoped>
.avatar-strip-info {
  @apply .w-full .flex .py-2;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 4px solid transparent;
  transition: border-left-color 0.15s ease-in-out;
  will-change: border-left-color;

  &:hover {
    border-left-color: #ff553f;
  }
}
</style>
