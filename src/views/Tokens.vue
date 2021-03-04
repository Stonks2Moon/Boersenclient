<template>
  <div class="view-tokens" content>
    <div max-width>
      <h1>Tokens</h1>
      <BTokenGraph />
    </div>
  </div>
</template>

<script lang="ts">
import BTokenGraph from '@/components/BTokenGraph.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BTokenGraph
  }
})
export default class Tokens extends Vue {}
</script>

<style lang="scss" scoped>
.view-tokens {
  //
}
</style>
