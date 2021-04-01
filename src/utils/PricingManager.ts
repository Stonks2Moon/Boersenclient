import store from '@/store';
import backend from './backend';

export class PricingManager {
  private static commit(pricings: Pricing[]): void {
    if (!pricings) return;
    store.commit('pricings', pricings);
  }

  public static async loadPricings(): Promise<void> {
    if (!this.pricings) {
      const { data } = await backend.get('pricing/all');
      if (data) this.commit(data);
    }
  }

  public static get pricings(): Pricing[] | null {
    return store.getters.pricings;
  }

  public static getPricing(type: string): Pricing | null {
    const pricings = this.pricings;
    if (!pricings) return null;
    return pricings.filter(x => x.type === type)[0] || null;
  }

  public static addPricing(pricing: Pricing): void {
    let pricings = this.pricings;
    if (!pricings || pricings.length === 0) {
      this.commit([pricing]);
      return;
    }

    let exsits = false;
    pricings = pricings.map(x => {
      if (x.type === pricing.type) {
        exsits = true;
        return pricing;
      }
      return x;
    });
    if (!exsits) pricings.push(pricing);
    this.commit(pricings);
  }

  public static removePricing(type: string): void {
    const pricings = this.pricings;
    if (!pricings) return;
    this.commit(pricings.filter(x => x.type !== type));
  }
}

export interface Pricing {
  type: string;
  entries: PricingEntry[];
}

export interface PricingEntry {
  changeoverLimit: number;

  fixum: number;

  transactionPromille: number;
  transactionMin: number;
  transactionMax: number;

  tradePromille: number;
  tradeMin: number;
  tradeMax: number;
}
