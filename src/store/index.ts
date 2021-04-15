/* eslint-disable */
import { socket } from '@/main';
import { getToken } from '@/utils/auth';
import { Broker, BrokerManager } from '@/utils/BrokerManager';
import { Orderbook, OrderbookManager } from '@/utils/OrderbookManager';
import { PriceHistoryManager } from '@/utils/PriceHistoryManager';
import { Pricing, PricingManager } from '@/utils/PricingManager';
import { ShareManager } from '@/utils/ShareManager';
import { Price, Share } from 'moonstonks-boersenapi';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isDesktop: false,
    user: {} as Broker,
    userValidated: false,
    shares: null,
    priceHistories: {},
    brokers: null,
    orderbooks: null,
    pricings: null
  },
  getters: {
    isDesktop: (state: any): boolean => {
      return state.isDesktop;
    },
    valid: (state: any): boolean => {
      return state.userValidated;
    },
    user: (state: any): Broker => {
      return state.user;
    },
    shares: (state: any): Share[] | null => {
      return state.shares;
    },
    priceHistories: (state: any): Record<string, Price[]> => {
      return state.priceHistories;
    },
    brokers: (state: any): Broker[] | null => {
      return state.brokers;
    },
    orderbooks: (state: any): Orderbook[] | null => {
      return state.orderbooks;
    },
    pricings: (state: any): Pricing[] | null => {
      return state.pricings;
    }
  },
  mutations: {
    isDesktop(state: any, isDesktop: boolean) {
      state.isDesktop = isDesktop;
    },
    signOut(state: any) {
      state.userValidated = false;
      state.user = undefined;
    },
    signIn(state: any, user: Broker) {
      if (user && user.type === 'stockmarket') {
        state.user = user;
        state.userValidated = true;
        socket.emit('join', getToken());
        BrokerManager.loadBrokers();
        ShareManager.loadShares().then(() => {
          OrderbookManager.loadBooks();
          PriceHistoryManager.loadHistories();
        });

        PricingManager.loadPricings();
      }
    },
    shares(state: any, shares: Share[]) {
      state.shares = shares;
    },
    priceHistories(state: any, priceHistories: Record<string, Price[]>) {
      state.priceHistories = priceHistories;
      // console.log('Storing history', state.priceHistories);
    },
    brokers(state: any, brokers: Broker[]) {
      state.brokers = brokers;
    },
    orderbooks(state: any, books: Orderbook[]) {
      state.orderbooks = books;
    },
    pricings(state: any, pricings: Pricing[]) {
      state.pricings = pricings;
    }
  }
});

export default store;
