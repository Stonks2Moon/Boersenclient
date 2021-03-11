import store from '@/store';
import { Price } from 'moonstonks-boersenapi/dist/models/Price.model';
import backend from './backend';
export class ShareManager {
  private static commit(shares: Share[]): void {
    if (!shares) return;
    store.commit('shares', shares);
  }

  public static async loadShares(): Promise<void> {
    let shares = this.getShares();
    if (shares) return;
    const { data } = await backend.get('share');
    shares = data;
    if (shares) {
      shares = shares.map(x => {
        x.prices = [];
        return x;
      });

      shares = await Promise.all(
        shares.map(async x => {
          x.prices = (await backend.get('share/prices/' + x.id)).data;
          return x;
        })
      );
      this.commit(shares);
    }
  }

  public static getShares(): Share[] | null {
    return store.getters.shares;
  }

  public static getShare(shareId: string): Share | null {
    const shares = this.getShares();
    if (!shares) return null;
    return shares.filter(x => x.id === shareId)[0] || null;
  }

  public static updateShare(share: Share): void {
    let shares = this.getShares();
    if (!shares) return;
    shares = shares.map(x => {
      if (x.id === share.id) {
        return { ...x, ...share };
      }
      return x;
    });
    this.commit(shares);
  }

  public static addPrice(price: Price & { shareId: string }) {
    let shares = this.getShares();
    if (!shares) return;
    shares = shares.map(x => {
      if (x.id === price.shareId) {
        x.prices.push({ price: price.price, timestamp: price.timestamp });
        x.price = x.prices.sort((a, b) => b.timestamp - a.timestamp)[0].price;
      }
      return x;
    });
    this.commit(shares);
  }

  public static createShare(share: Share): void {
    let shares = this.getShares();
    const createShare: Share = { ...share, prices: [] };
    if (!shares) shares = [createShare];
    else shares.push(createShare);

    this.commit(shares);
  }
}

export interface Share {
  id: string;
  name: string;
  color: string;
  thumbnail: string;
  price: number;
  prices: Price[];
}
