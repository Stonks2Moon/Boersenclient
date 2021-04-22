import store from '@/store';
import backend from './backend';

export class ClearingManager {
  public static get dailyClearings(): DailyClearing[] {
    return store.getters.dailyClearings || [];
  }

  public static async loadDailyClearings(): Promise<void> {
    if (this.dailyClearings.length > 0) return;
    const { data } = await backend.get('clearing/daily');
    store.commit('dailyClearings', data);
  }

  public static get sorted(): DailyClearing[] {
    return [...this.dailyClearings]
      .sort((a, b) => b.year - a.year)
      .sort((a, b) => b.month - a.month)
      .sort((a, b) => b.day - a.day);
  }
}

export interface DailyClearing {
  id: string;
  brokerId: string;
  orderAmount: number;
  volumeBuy: number;
  volumeSell: number;
  day: number;
  month: number;
  year: number;
  transactionPrice: number;
  tradePrice: number;
  fixum: number;
}
