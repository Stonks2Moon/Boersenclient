import backend from './backend';
import { IShare } from './inerfaces';

export class ShareManager {
  private static shares: IShare[] | null = null;

  public static async loadShares(): Promise<void> {
    if (this.getShares()) return;
    const { data } = await backend.get('share');
    this.shares = data;
    if (this.shares) {
      this.shares = this.shares.map(x => {
        x.prices = [];
        return x;
      });
      this.shares = await Promise.all(
        this.shares.map(async x => {
          x.prices = (await backend.get('share/prices/' + x.id)).data;
          return x;
        })
      );
    }
  }

  public static getShares(): IShare[] | null {
    return this.shares;
  }

  public static getShare(shareId: string): IShare | null {
    if (!this.shares) return null;
    return this.shares.filter(x => x.id === shareId)[0] || null;
  }

  public static updateShare(share: IShare): void {
    if (!this.shares) return;
    this.shares = this.shares.map(x => {
      if (x.id === share.id) {
        return { ...x, ...share };
      }
      return x;
    });
  }

  public static createShare(share: IShare): void {
    const createShare: IShare = { ...share, prices: [] };
    if (!this.shares) this.shares = [createShare];
    else {
      this.shares.push(createShare);
    }
  }
}
