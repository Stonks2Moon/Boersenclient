<template>
  <div class="b-token-graph">
    <VueApexCharts />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';

@Component({
  components: {
    VueApexCharts
  }
})
export default class BTokenGraph extends Vue {}
</script>

<style lang="scss" scoped>
.b-token-graph {
  //
}
</style>
