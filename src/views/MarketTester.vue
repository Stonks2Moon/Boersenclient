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
import backend from '@/utils/backend';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MarketTester extends Vue {
  public amount = 0;
  public limit = 0;

  public buy(): void {
    this.submit('buy');
  }

  public sell(): void {
    this.submit('sell');
  }

  public submit(type: 'buy' | 'sell'): void {
    const data = {
      shareId: '6037e67c8407c737441517d6',
      amount: +this.amount,
      onMatch: 'string',
      onComplete: 'string',
      onDelete: 'string',
      type: type,
      limit: +this.limit
    };
    backend
      .post('order', data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.view-MarketTester {
  //
}
</style>
