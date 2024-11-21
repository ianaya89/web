<template>
  <div class="employee-card flex bg-white py-6 px-4 shadow-xl">
    <div class="flex w-1/4 justify-center">
      <avatar v-bind="$props" :classes="'w-16 h-16'" />
    </div>
    <div class="w-3/4 flex flex-col justify-between">
      <div>
        <h5 class="font-medium">
          {{ fullName }}
        </h5>
        <p class="text-grey-l1 -mt-1">
          {{ position }}
        </p>
      </div>

      <a v-if="email" :href="mailTo" class="">{{ email }}</a>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'Employee',

  components: {
    Avatar
  },

  props: {
    src: {
      type: String,
      default: require('../../assets/images/thumb-fallback.svg')
    },
    fullName: {
      type: String,
      default: 'First name'
    },
    alt: {
      type: String,
      default: 'Image alt'
    },
    email: {
      type: String,
      default: null
    },
    position: {
      type: String,
      required: true
    }
  },

  computed: {
    mailTo() {
      return 'mailto:' + this.email
    }
  }
}
</script>

<style lang="postcss" scoped>
.employee-card {
  min-height: 10rem;
}
</style>
