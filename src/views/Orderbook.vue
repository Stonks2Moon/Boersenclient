<template>
  <div class="view-orderbook" content>
    <h1>Orderbook</h1>
    <template v-if="shares">
      <div v-for="s in shares" :key="s.id">
        <tl-flow horizontal="space-between">
          <h3>{{ s.name }}</h3>
          <h4>{{ s.price }} €</h4>
        </tl-flow>
        <tc-table :dark="true">
          <tc-tr key="a">
            <tc-th>Datum</tc-th>
            <tc-th>Stop</tc-th>
            <tc-th>Anzahl</tc-th>
            <tc-th>Preis</tc-th>
            <tc-th>Anzahl</tc-th>
            <tc-th>Stop</tc-th>
            <tc-th>Datum</tc-th>
          </tc-tr>
          <tc-tr v-for="so in getSellOrders(s.id)" :key="so.id">
            <tc-td></tc-td>
            <tc-td></tc-td>
            <tc-td></tc-td>
            <tc-td :tfcolor="so.limit ? 'error' : 'alarm'">
              {{ so.limit || 'Market' }}
            </tc-td>
            <tc-td tfcolor="error">{{ so.amount }}</tc-td>
            <tc-td>{{ so.stop }}</tc-td>
            <tc-td>{{ formatTime(so.timestamp) }}</tc-td>
          </tc-tr>
          <tc-tr v-for="bo in getBuyOrders(s.id)" :key="bo.id">
            <tc-td>{{ formatTime(bo.timestamp) }}</tc-td>
            <tc-td>{{ bo.stop }}</tc-td>
            <tc-td tfcolor="success">{{ bo.amount }}</tc-td>
            <tc-td :tfcolor="bo.limit ? 'success' : 'alarm'">
              {{ bo.limit || 'Market' }}
            </tc-td>
            <tc-td></tc-td>
            <tc-td></tc-td>
            <tc-td></tc-td>
          </tc-tr>
        </tc-table>
      </div>
    </template>

    <br /><br /><br /><br /><br />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Share } from '@/utils/ShareManager';
import { Order } from 'moonstonks-boersenapi';

@Component
export default class Orderbook extends Vue {
  get orders(): Order[] | null {
    return this.$store.getters.orderbook;
  }

  get shares(): Share[] | null {
    return this.$store.getters.shares;
  }

  getSellOrders(shareId: string): Order[] {
    if (!this.orders) return [];
    return this.orders
      .filter(x => x.shareId === shareId && x.type === 'sell')
      .sort((a, b) => {
        if (!a.limit && b.limit) return 1;
        if (a.limit === b.limit || !(a.limit && b.limit))
          return b.timestamp - a.timestamp;
        return (b.limit || 0) - (a.limit || 0);
      });
  }

  getBuyOrders(shareId: string): Order[] {
    if (!this.orders) return [];
    return this.orders
      .filter(x => x.shareId === shareId && x.type === 'buy')
      .sort((a, b) => {
        if (!a.limit && b.limit) return -1;
        if (a.limit === b.limit || !(a.limit && b.limit))
          return a.timestamp - b.timestamp;
        return (b.limit || 0) - (a.limit || 0);
      });
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const hh = ('0' + date.getHours()).slice(-2);
    const mm = ('0' + date.getMinutes()).slice(-2);
    const ss = ('0' + date.getSeconds()).slice(-2);
    return `${d}.${m}.${y} ${hh}:${mm}:${ss}`;
  }
}
</script>

<style lang="scss" scoped>
.view-orderbook {
  //
}
</style>
