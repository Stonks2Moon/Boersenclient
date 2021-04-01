<template>
  <div class="view-edit-pricing" content>
    <h1>Edit Pricing</h1>
    <BPricingForm v-if="pricing" :pricing="pricing" />
  </div>
</template>

<script lang="ts">
import BPricingForm from '@/components/pricing/PricingForm.vue';
import { Pricing, PricingManager } from '@/utils/PricingManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BPricingForm
  }
})
export default class EditPricing extends Vue {
  async mounted() {
    await PricingManager.loadPricings();
    if (!this.pricing) {
      this.$router.push({ name: 'mgmt-pricings' });
    }
  }

  get pricing(): Pricing | null {
    return PricingManager.getPricing(this.$route.params.id);
  }
}
</script>

<style lang="scss" scoped>
.view-edit-pricing {
  //
}
</style>
