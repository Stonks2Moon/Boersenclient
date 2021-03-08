<template>
  <div class="view-market-tester" content>
    <div max-width>
      <h1>Market Tester</h1>
      <br />
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BörsenAPI } from 'moonstonks-boersenapi';
import { getToken } from '@/utils/auth';
import backend from '@/utils/backend';

@Component
export default class MarketTester extends Vue {
  public amount = 0;
  public limit = 0;
  public api = new BörsenAPI(getToken() || '', 'd', 'd', 'd');

  public buy(): void {
    this.submit('buy');
  }

  public sell(): void {
    this.submit('sell');
  }

  public submit(type: 'buy' | 'sell'): void {
    backend
      .post('order', {
        shareId: '6037e67c8407c737441517d6',
        amount: +this.amount,
        onPlace: 'string',
        onMatch: 'string',
        onComplete: 'string',
        onDelete: 'string',
        type: type,
        limit: +this.limit
      })
      .then(res => {
        console.log('Queue', res.data);
      })
      .catch(console.error);

    // this.api
    //   .placeOrder(type, '6037e67c8407c737441517d6', +this.amount, +this.limit)
    //   .then(order => {
    //     console.log('Order', order);
    //   })
    //   .catch(error => console.error('Error', error));
  }
}
</script>

<style lang="scss" scoped>
.view-MarketTester {
  //
}
</style>
