import store from '@/store';
import { Price } from 'moonstonks-boersenapi';
import backend from './backend';
import { ShareManager } from './ShareManager';

export class PriceHistoryManager {
  private static commit(histories: Record<string, Price[]>) {
    if (!histories) return;
    store.commit('priceHistories', histories);
  }

  public static get histories(): Record<string, Price[]> {
    return store.state.priceHistories;
  }

  public static loadHistory(shareId: string) {
    backend.get('share/prices/' + shareId).then(res => {
      if (res.data) this.historyChanged(shareId, res.data);
    });
  }

  public static loadHistories() {
    const shares = ShareManager.shares;
    if (shares) {
      shares.forEach(x => this.loadHistory(x.id));
    }
  }

  private static historyChanged(shareId: string, prices: Price[]) {
    const histories = this.histories;
    histories[shareId] = prices;
    this.commit(histories);
  }

  public static priceChanged(shareId: string, price: Price) {
    const histories = this.histories;
    price = { price: price.price, timestamp: price.timestamp };
    if (!histories[shareId]) histories[shareId] = [price];
    else histories[shareId].push(price);
    this.commit(histories);
    ShareManager.priceChanged({ ...price, shareId: shareId });
  }
}
