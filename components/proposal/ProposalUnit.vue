<template>
  <accordion-item class="" :bottom-border="false" :header-classes="'py-4 flex-wrap'">
    <template v-slot:header>
      <avatar
        class="my-auto"
        :classes="'w-10 h-10'"
        :src="$get(unit,'entity.logo.url',undefined)"
      />

      <data-label class="w-1/2 my-auto ml-4" :label="$get(unit,'entity.teamLeagues.0.league.name', '-')">
        {{ $get(unit,'entity.name','-') }}
      </data-label>

      <div class="w-1/2 md:w-auto flex md:justify-end">
        <span v-if="unitSum[1]===0 ||unitSum[1]===null || unitSum[0]===unitSum[1]" class="my-auto text-h5 font-medium">{{ unitSum[0] | currency }}</span>
        <span v-else class="my-auto text-h5 font-medium">{{ unitSum[0] | currency }} - {{ unitSum[1] | currency }}</span>
      </div>
    </template>

    <div v-for="(item, index) in items" :key="index" class="w-full flex">
      <proposal-item v-if="item.marketplaceItem.itemType !== 'package'" class="min-h-20" :item="item" />
      <proposal-package-item v-else class="border-t border-grey-l4" :item="item" />
    </div>
  </accordion-item>
</template>

<script>
import AccordionItem from '@/components/AccordionItem'
import Avatar from '@/components/Avatar'
import ProposalItem from '@/components/proposal/ProposalItem'
import DataLabel from '@/components/DataLabel'
import ProposalPackageItem from '@/components/proposal/ProposalPackageItem'

export default {
  name: 'ProposalUnit',

  components: {
    DataLabel,
    ProposalItem,
    AccordionItem,
    Avatar,
    ProposalPackageItem
  },

  props: {
    unit: {
      type: Object,
      required: true
    }
  },

  computed: {
    unitSum() {
      return this.$store.getters['proposal/unitSum'](this.unit.id)
    },

    items() {
      return this.$store.getters['proposal/items'](this.unit.id)
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
