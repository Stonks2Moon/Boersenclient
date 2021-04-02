import store from '@/store';
import { Price, Share } from 'moonstonks-boersenapi';
import backend from './backend';
export class ShareManager {
  private static commit(shares: Share[]): void {
    if (!shares) return;
    store.commit('shares', shares);
  }

  public static async loadShares(): Promise<void> {
    if (this.shares) return;
    const { data } = await backend.get('share');
    if (data) this.commit(data);
  }

  public static get shares(): Share[] | null {
    return store.getters.shares;
  }

  public static getShare(shareId: string): Share | null {
    const shares = this.shares;
    if (!shares) return null;
    return shares.filter(x => x.id === shareId)[0] || null;
  }

  public static updateShare(share: Share): void {
    let shares = this.shares || [];
    let exists = false;
    shares = shares.map(x => {
      if (x.id === share.id) {
        exists = true;
        return share;
      }
      return x;
    });
    if (!exists) shares.push(share);
    this.commit(shares);
  }

  public static priceChanged(update: Price & { shareId: string }) {
    let shares = this.shares;
    if (!shares) return;
    shares = shares.map(x => {
      if (x.id === update.shareId) {
        x.price = update.price;
      }
      return x;
    });
    this.commit(shares);
  }
}
