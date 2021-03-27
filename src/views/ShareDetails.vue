<template>
  <div class="view-share-details">
    <tc-hero :dark="true" background="#111">
      <img src="assets/navigation-card-bg.png" slot="background" alt="" />
      <tl-flow v-if="!share" flow="column">
        <tc-spinner size="20" :dark="true" />
        <p>Gathering information</p>
      </tl-flow>
      <tl-flow v-else>
        <tc-avatar size="tiny" :src="share.thumbnail" />
        <h1>{{ share.name }}</h1>
      </tl-flow>
    </tc-hero>

    <div content>
      <br />
      <BBuySellCumulative :shareId="id" />
    </div>
  </div>
</template>

<script lang="ts">
import BBuySellCumulative from '@/components/charts/BBuySellCumulative.vue';
import { Share, ShareManager } from '@/utils/ShareManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BBuySellCumulative
  }
})
export default class ShareDetails extends Vue {
  get id(): string {
    return this.$route.params.id;
  }

  get share(): Share | null {
    return ShareManager.getShare(this.id);
  }
}
</script>

<style lang="scss" scoped>
.view-share-details {
  .tc-hero {
    .tc-avatar {
      margin-right: 20px;
    }
  }

  [content] {
    padding-top: 0;
  }
}
</style>
