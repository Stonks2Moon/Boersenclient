import store from '@/store';
import backend from './backend';
import { Broker, BrokerManager } from './BrokerManager';

export class InvoiceManager {
  public static get invoices(): Invoice[] {
    const inv = (store.getters.invoices || []) as Invoice[];
    return inv.sort((a, b) => a.timestamp - b.timestamp);
  }

  private static commit(invoices: Invoice[]) {
    if (!invoices) return;
    invoices = invoices.filter(x => x.amount > 0);
    store.commit('invoices', invoices);
  }

  public static async loadInvoices(): Promise<void> {
    if (this.invoices.length > 0) return;
    const { data } = await backend.get('invoice/all');
    this.commit(data);
  }

  public static getUniqueBroker(): Broker[] {
    const broker = [...(this.invoices || [])].map(x => x.brokerId);
    const unqiue = [...new Set(broker)];
    return unqiue
      .map(x => BrokerManager.getBroker(x))
      .filter(x => !!x) as Broker[];
  }

  public static get total(): number {
    return [...this.invoices]
      .filter(x => !x.payed)
      .reduce((a, b) => a + b.amount, 0);
  }

  public static get due(): number {
    return [...this.invoices].filter(x => !x.payed).length;
  }

  public static get avg(): number {
    return this.total / this.due;
  }
}

export interface Invoice {
  brokerId: string;
  timestamp: number;
  month: number;
  year: number;
  payed: boolean;
  amount: number;
  description?: string;
}
