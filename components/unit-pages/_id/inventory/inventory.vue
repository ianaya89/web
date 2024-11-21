<template>
  <section class="team__inventory bg-grey-l5">
    <div class="tab-bar w-full flex flex-wrap-reverse bg-white px-8 md:px-10 border-b border-grey-l3" data-cy="inventory-tabs-bar">
      <div class="w-full md:w-3/4">
        <ul class="-mx-2 md:-mx-4 text-h6 md:pt-2">
          <nuxt-link
            class="inline-block py-4 mx-2 md:mx-4 font-medium"
            tag="li"
            :active-class="'active'"
            data-cy="inventory-link"
            :exact="true"
            :to="localePath({name: 'unit-id-inventory', params: {id: unitId}})"
          >
            {{ $t('app.inventory.your') }}
          </nuxt-link>
          <nuxt-link
            class="inline-block py-4 mx-2 md:mx-4 font-medium"
            tag="li"
            :active-class="'active'"
            data-cy="packages-link"
            :exact="true"
            :to="localePath({name: 'unit-id-inventory-packages', params: {id: unitId}})"
          >
            {{ $t('app.inventory.packages.title') }}
          </nuxt-link>
          <!-- <nuxt-link
            class="inline-block py-4 mx-2 md:mx-4 font-medium"
            tag="li"
            :active-class="'active'"
            data-cy="campaigns-link"
            :exact="true"
            :to="localePath({name: 'unit-id-inventory-campaigns', params: {id: unitId}})"
          >
            {{ $t('app.inventory.campaigns.title') }}
          </nuxt-link> -->
        </ul>
      </div>
      <div class="w-full md:w-1/4 flex md:justify-end mt-2 md:mt-0">
        <label-chart
          v-if="!$apollo.loading"
          data-cy="uploaded-inventory"
          :label="`${$get(unit,'entity.inventoryStatus.percentage',0)}%`"
          :chart-value="$get(unit,'entity.inventoryStatus.percentage',0) / 100"
          :info="$t('app.inventory.inventory_uploaded')"
        />
      </div>
    </div>

    <nuxt-child />
  </section>
</template>

<script>
import LabelChart from '@/components/LabelChart'
import {
  PageVisitedMutation,
  UnitInventoryStatusQuery
} from '@/services/graphql'

export default {
  name: 'Inventory',

  components: {
    LabelChart
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitInventoryStatusQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  mounted() {
    this.recordProfileVisit()
  },

  methods: {
    async recordProfileVisit() {
      try {
        await this.$apollo.mutate({
          ...PageVisitedMutation,
          variables: {
            input: {
              page: 'INVENTORY',
              actor_unit_id: this.unitId,
              target_unit_id: this.unitId
            }
          }
        })
      } catch (err) {
        //
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.team__inventory {
  @apply .w-full;

  .tab-bar {
    @apply .sticky .z-30;
  }
  ul li {
    @apply .border-transparent .cursor-pointer;
    transition: border-color 400ms ease;
    will-change: border-color;

    &.active {
      @apply .border-b-2 .border-red .cursor-default;
    }
  }
}
</style>
