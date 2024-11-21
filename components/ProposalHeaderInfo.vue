<template>
  <li class="proposal-items" @click="onDealsClick()">
    <span>
      <i class="fas fa-hands-helping" />
      <badge :value="proposalItemsCount" />
    </span>
  </li>
</template>

<script>
import Badge from '@/components/Badge'
import proposal from '@/services/mixins/proposal'

export default {
  name: 'ProposalHeaderInfo',

  components: {
    Badge
  },

  mixins: [proposal],

  methods: {
    onDealsClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-proposal',
          params: {
            id: this.$route.params.id
          }
        })
      )
    }
  }
}
</script>

<style lang="postcss">
.proposal-items {
  @apply .relative .list-none;

  > span {
    @apply .pr-4 .h-full .flex .items-center .text-grey-d1 .font-medium .border-transparent .border-b-3 .cursor-pointer;
    &:hover {
      @apply .text-black;
    }
  }
}
</style>
