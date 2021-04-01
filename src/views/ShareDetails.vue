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

    <div content v-if="share">
      <br />
      <tl-grid minWidth="170" gap="20">
        <BChartWrapper title="Sell Orders" subtitle="Total">
          <BAnimatedNumber :number="sellAmount" />
          <i class="ti-offer"></i>
        </BChartWrapper>
        <BChartWrapper title="Buy Orders" subtitle="Total">
          <BAnimatedNumber :number="buyAmount" />
          <i class="ti-bell"></i>
        </BChartWrapper>
        <BChartWrapper title="Stops" subtitle="Active">
          <BAnimatedNumber :number="stopCount" />
          <i class="ti-blocked"></i>
        </BChartWrapper>
        <BChartWrapper title="Price" subtitle="Reference">
          <BAnimatedNumber :number="share.price * 100" :divider="100" />
          <span>€</span>
          <i class="ti-dollar"></i>
        </BChartWrapper>
      </tl-grid>
      <br />
      <BBuySellCumulative :shareId="id" />
    </div>
  </div>
</template>

<script lang="ts">
import BAnimatedNumber from '@/components/BAnimatedNumber.vue';
import BBuySellCumulative from '@/components/charts/BBuySellCumulative.vue';
import BChartWrapper from '@/components/charts/BChartWrapper.vue';
import { Share, ShareManager } from '@/utils/ShareManager';
import { Order } from 'node_modules/moonstonks-boersenapi/dist/main';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BBuySellCumulative,
    BAnimatedNumber,
    BChartWrapper
  }
})
export default class ShareDetails extends Vue {
  get id(): string {
    return this.$route.params.id;
  }

  get share(): Share | null {
    return ShareManager.getShare(this.id);
  }

  get orders(): Order[] | null {
    return this.$store.getters.orderbook;
  }

  get ordersOfShare(): Order[] {
    if (!this.share) return [];
    // eslint-disable-next-line
    return (this.orders || []).filter(o => o.shareId === this.share!.id);
  }

  get buyAmount(): number {
    return this.ordersOfShare.filter(x => x.type === 'buy').length;
  }

  get sellAmount(): number {
    return this.ordersOfShare.filter(x => x.type === 'sell').length;
  }

  get stopCount(): number {
    return this.ordersOfShare.filter(x => x.stop).length;
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

  .b-chart-wrapper {
    position: relative;
    i {
      position: absolute;
      top: 50%;
      right: 20px;
      font-size: 30px;
      transform: translateY(-50%);
      opacity: 0.75;
    }
    .b-animated-number {
      font-size: 25px;
    }
    span {
      font-size: 20px;
      font-weight: bold;
      color: $error;
    }
  }
}
</style>
