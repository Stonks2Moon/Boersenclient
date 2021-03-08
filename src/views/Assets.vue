<template>
  <div class="view-assets" content>
    <div max-width>
      <h1>Assets</h1>
      <BPriceGraph />
    </div>
  </div>
</template>

<script lang="ts">
import BPriceGraph from '@/components/BPriceGraph.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BPriceGraph
  }
})
export default class Assets extends Vue {}
</script>

<style lang="scss" scoped>
.view-assets {
  //
}
</style>
