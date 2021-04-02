import store from '@/store';
import backend from './backend';
import { EventBus } from './eventbus';
import { ShareManager } from './ShareManager';

export class OrderbookManager {
  private static commit(books: Orderbook[]) {
    if (books && books.length > 0) {
      store.commit('orderbooks', books);
    }
  }

  public static loadBook(shareId: string) {
    backend.get('orderbook/' + shareId).then(res => {
      if (res.data) this.updateOrderbook(res.data);
    });
  }

  public static loadBooks() {
    const shares = ShareManager.shares;
    if (!shares) return;
    shares.forEach(s => this.loadBook(s.id));
  }

  public static get books(): null | Orderbook[] {
    return store.getters.orderbooks;
  }

  public static getBook(shareId: string): Orderbook | null {
    return (this.books || []).filter(x => x.shareId === shareId)[0] || null;
  }

  public static updateOrderbook(book: Orderbook) {
    let books = this.books || [];
    let exists = false;
    books = books.map(b => {
      if (b.shareId === book.shareId) {
        exists = true;
        return book;
      }
      return b;
    });
    if (!exists) books.push(book);
    this.commit(books);
    EventBus.$emit('order-book-updated', book.shareId);
  }
}

export interface Orderbook {
  shareId: string;
  price: number;
  totalOrders: number;
  totalSellOrders: number;
  totalBuyOrders: number;
  totalStopOrders: number;
  sellOrders: OrderbookOrder[];
  buyOrders: OrderbookOrder[];
}

export interface OrderbookOrder {
  timestamp: number;
  amount: number;
  limit?: number;
  stop?: number;
}

export interface LimitAndAmount {
  type: 'buy' | 'sell';
  amount: number;
  limit: number;
}
