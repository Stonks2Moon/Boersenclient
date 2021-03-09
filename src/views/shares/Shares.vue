<template>
  <div class="view-shares" content>
    <h1>Shares</h1>
    <BPriceGraph />

    <br />

    <tl-flow horizontal="space-between">
      <h2>Manage Shares</h2>
      <tc-button
        variant="opaque"
        icon="plus"
        tfbackground="error"
        routeName="create-share"
      />
    </tl-flow>

    <tc-table :dark="true" v-if="shares">
      <tc-tr v-for="s in shares" :key="s.id">
        <tc-td>
          <tc-avatar size="tiny" :src="s.thumbnail" />
        </tc-td>
        <tc-td :color="s.color">
          <i class="ti-circle"></i>
        </tc-td>
        <tc-td>
          {{ s.name }}
        </tc-td>
        <tc-td>
          <tc-link
            tfcolor="alarm"
            :to="{ name: 'edit-share', params: { id: s.id } }"
          >
            edit
          </tc-link>
        </tc-td>
      </tc-tr>
    </tc-table>
  </div>
</template>

<script lang="ts">
import BPriceGraph from '@/components/BPriceGraph.vue';
import { Share, ShareManager } from '@/utils/ShareManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BPriceGraph
  }
})
export default class Shares extends Vue {
  mounted() {
    ShareManager.loadShares();
  }

  get shares(): Share[] | null {
    return ShareManager.getShares();
  }
}
</script>

<style lang="scss" scoped>
.view-shares {
  //
  .tc-avatar {
    height: 30px;
    width: 30px;
    margin: 5px 0;
  }
}
</style>
