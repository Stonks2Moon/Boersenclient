<template>
  <div class="view-create-pricing" content>
    <h1>Create Pricing</h1>
    <BPricingForm />
  </div>
</template>

<script lang="ts">
import BPricingForm from '@/components/pricing/PricingForm.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BPricingForm
  }
})
export default class CreatePricing extends Vue {}
</script>

<style lang="scss" scoped>
.view-create-pricing {
  //
}
</style>
