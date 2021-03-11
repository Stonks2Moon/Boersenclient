<template>
  <div class="view-market-tester" content>
    <h1>Market Tester</h1>
    <br />
    <tl-grid minWidth="230" gap="0 10">
      <tc-input
        :dark="true"
        type="number"
        title="Amount"
        placeholder="Amount"
        v-model="amount"
        :step="10"
      />
      <tc-input
        :dark="true"
        type="number"
        title="Limit"
        placeholder="Limit"
        v-model="limit"
        :step="10"
      />

      <tc-input
        :dark="true"
        type="number"
        title="Stop"
        placeholder="Stop"
        v-model="stop"
        :step="10"
      />
      <tc-input
        :dark="true"
        type="number"
        title="Stop Limit"
        placeholder="Stop Limit"
        v-model="stopLimit"
        :step="10"
      />
    </tl-grid>
    <br />
    <tl-grid minWidth="20" gap="10">
      <tc-button
        tfbackground="error"
        variant="filled"
        name="Sell Order"
        @click="sell"
      />
      <tc-button
        tfbackground="success"
        variant="filled"
        name="Buy Order"
        @click="buy"
      />
    </tl-grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getToken } from '@/utils/auth';
import { BörsenAPI, OrderManager } from 'moonstonks-boersenapi';

@Component
export default class MarketTester extends Vue {
  public amount = 0;
  public limit = 0;
  public stop = 0;
  public stopLimit = 0;
  public api = new BörsenAPI(getToken() || '');
  public orderManager = new OrderManager(
    this.api,
    'onPlace',
    'onMatch',
    'onComplete',
    'onDelete'
  );

  public buy(): void {
    this.submit('buy');
  }

  public sell(): void {
    this.submit('sell');
  }

  public submit(type: 'buy' | 'sell'): void {
    this.orderManager
      .placeOrder(
        type,
        '6037e67c8407c737441517d6',
        +this.amount,
        +this.limit,
        +this.stop,
        +this.stopLimit
      )
      .then(job => {
        console.log('Job', job);
      })
      .catch(console.error);
  }
}
</script>

<style lang="scss" scoped>
.view-MarketTester {
  //
}
</style>
