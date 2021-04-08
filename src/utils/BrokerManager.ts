import store from '@/store';
import backend from './backend';

export class BrokerManager {
  private static commit(brokers: Broker[]): void {
    if (!brokers) return;
    store.commit('brokers', brokers);
  }

  public static async loadBrokers(): Promise<void> {
    if (!this.brokers) {
      const { data } = await backend.get('broker');
      if (data) this.commit(data);
    }
  }

  public static get brokers(): Broker[] | null {
    return store.getters.brokers;
  }

  public static getBroker(id: string): Broker | null {
    const brokers = this.brokers;
    if (!brokers) return null;
    return brokers.filter(x => x.id === id)[0] || null;
  }

  public static addBroker(broker: Broker): void {
    if (!broker) return;
    let brokers = this.brokers;
    if (!brokers) {
      this.commit([broker]);
    } else {
      let exists = false;
      brokers = brokers.map(x => {
        if (x.id === broker.id) {
          exists = true;
          return broker;
        }
        return x;
      });
      if (!exists) brokers.push(broker);
      this.commit(brokers);
    }
  }

  public static removeBroker(id: string): void {
    const brokers = this.brokers;
    if (!brokers || !id) return;
    this.commit(brokers.filter(x => x.id !== id));
  }
}

export interface Broker {
  id: string;
  token: string;
  type: 'private' | 'business' | 'simulation' | 'stockmarket' | 'liquiditydonor';
  displayName: string;
  banned?: boolean;
}
