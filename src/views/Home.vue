<template>
  <div class="view-home" content>
    <br />
    <br />
    <BPriceGraph />

    <h2>Shares</h2>
    <BList>
      <BListItem
        v-for="s in shares"
        :key="s.id"
        :title="s.name"
        :subtitle="s.price + ' €'"
        :avatar="s.thumbnail"
        :to="{ name: 'share-details', params: { id: s.id } }"
      />
    </BList>
  </div>
</template>

<script lang="ts">
import BPriceGraph from '@/components/charts/BPriceGraph.vue';
import BList from '@/components/list/BList.vue';
import BListItem from '@/components/list/BListItem.vue';
import { Share, ShareManager } from '@/utils/ShareManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BPriceGraph,
    BList,
    BListItem
  }
})
export default class Home extends Vue {
  get shares(): Share[] {
    return ShareManager.shares || [];
  }
}
</script>

<style lang="scss" scoped>
.view-home {
  //
}
</style>
