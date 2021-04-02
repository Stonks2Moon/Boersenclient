<template>
  <BChartWrapper
    class="b-orderbook"
    v-if="share && orderbook"
    :subtitle="share.name"
    title="Orderbook"
  >
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Limit</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td colspan="3">
            ... {{ Math.max(orderbook.totalSellOrders - 10, 0) }} more
          </td>
        </tr>
        <tr v-for="o in orderbook.sellOrders" :key="o.id">
          <td></td>
          <td></td>
          <td :type="o.limit ? 'sell' : 'market'">{{ o.limit || 'Market' }}</td>
          <td>{{ Math.round(o.amount * 100) / 100 }}</td>
          <td>{{ formatTime(o.timestamp) }}</td>
        </tr>
        <tr v-for="o in orderbook.buyOrders" :key="o.id">
          <td>{{ formatTime(o.timestamp) }}</td>
          <td>{{ Math.round(o.amount * 100) / 100 }}</td>
          <td :type="o.limit ? 'buy' : 'market'">{{ o.limit || 'Market' }}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="3">
            ... {{ Math.max(orderbook.totalBuyOrders - 10, 0) }} more
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </BChartWrapper>
</template>

<script lang="ts">
import { OrderbookManager, Orderbook } from '@/utils/OrderbookManager';
import { ShareManager } from '@/utils/ShareManager';
import { Vue, Component, Prop } from 'vue-property-decorator';
import BChartWrapper from './BChartWrapper.vue';

import { Share } from 'moonstonks-boersenapi';

@Component({
  components: {
    BChartWrapper
  }
})
export default class BOrderbook extends Vue {
  @Prop() shareId!: string;

  get share(): Share | null {
    return ShareManager.getShare(this.shareId);
  }

  get orderbook(): Orderbook | null {
    return OrderbookManager.getBook(this.shareId);
  }

  public formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const hh = ('0' + date.getHours()).slice(-2);
    const mm = ('0' + date.getMinutes()).slice(-2);
    const ss = ('0' + date.getSeconds()).slice(-2);
    return `${d}.${m}.${y}\n${hh}:${mm}:${ss}`;
  }
}
</script>

<style lang="scss" scoped>
.b-orderbook {
  .table-wrapper {
    overflow-x: auto;

    table {
      overflow: hidden;
      width: 100%;
      border-collapse: collapse;
      tr {
        &:first-child {
          background: rgba(#111, 0.3);
          backdrop-filter: blur(20px);
          border-radius: $border-radius;
          overflow: hidden;
        }
        th {
          padding: 5px 10px;
        }
        td {
          text-align: center;

          white-space: pre-wrap;

          &:nth-child(3) {
            font-weight: bold;
          }

          &:first-child,
          &:last-child {
            opacity: 0.5;
            font-weight: 550;
            font-size: 11px;
          }

          &[type='sell'] {
            color: $error;
            &::after {
              content: ' €';
            }
          }
          &[type='buy'] {
            color: $success;
            &::after {
              content: ' €';
            }
          }
          &[type='market'] {
            color: $alarm;
          }
        }

        &:nth-child(2),
        &:last-child {
          td {
            padding: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
