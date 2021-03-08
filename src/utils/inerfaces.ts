import { Price } from 'moonstonks-boersenapi/dist/models/Price.model';

export interface IBroker {
  id: string;
  token: string;
  type: 'private' | 'business' | 'simulation' | 'stockmarket';
  displayName: string;
}

export interface IOrder {
  id: string;
  shareId: string;
  timestamp: number;
  amount: number;
  type: 'buy' | 'sell';
  limit?: number;
  stop?: number;
  stopLimit?: number;
}

export interface IPriceShare {
  shareId: string;
  price: number;
  timestamp: number;
}

export interface IShare {
  id: string;
  name: string;
  color: string;
  thumbnail: string;
  price: number;
  prices: Price[];
}
