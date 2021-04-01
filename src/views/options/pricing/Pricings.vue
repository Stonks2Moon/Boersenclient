<template>
  <div class="view-pricings" content>
    <tl-flow horizontal="space-between">
      <h1>Pricings</h1>
      <tc-link tfcolor="error" routeName="mgmt-create-pricing">
        create pricing
      </tc-link>
    </tl-flow>

    <tl-flow flow="column" v-if="!pricings">
      <br />
      <tc-spinner :dark="true" size="20" />
      <p>Loading pricings</p>
    </tl-flow>

    <p v-else-if="pricings.length === 0">
      There are now pricings :(
    </p>

    <tc-list :dark="true" v-else>
      <tc-list-item
        v-for="p in pricings"
        :key="p.type"
        :title="p.type"
        :to="{ name: 'mgmt-edit-pricing', params: { id: p.type } }"
      />
    </tc-list>
  </div>
</template>

<script lang="ts">
import { Pricing, PricingManager } from '@/utils/PricingManager';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Pricings extends Vue {
  get pricings(): Pricing[] | null {
    return PricingManager.pricings;
  }
}
</script>

<style lang="scss" scoped>
.view-pricings {
  //
}
</style>
