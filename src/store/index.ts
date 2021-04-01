/* eslint-disable */
import { socket } from '@/main';
import { getToken } from '@/utils/auth';
import { Broker, BrokerManager } from '@/utils/BrokerManager';
import { Pricing } from '@/utils/PricingManager';
import { Share, ShareManager } from '@/utils/ShareManager';
import { Order } from 'moonstonks-boersenapi';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isDesktop: false,
    user: {} as Broker,
    userValidated: false,
    shares: null,
    brokers: null,
    orderbook: null,
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
    brokers: (state: any): Broker[] | null => {
      return state.brokers;
    },
    orderbook: (state: any): Order[] | null => {
      return state.orderbook;
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
        ShareManager.loadShares();
        BrokerManager.loadBrokers();
      }
    },
    shares(state: any, shares: Share[]) {
      state.shares = shares;
    },
    brokers(state: any, brokers: Broker[]) {
      state.brokers = brokers;
    },
    orderbook(state: any, orderbook: Order[]) {
      state.orderbook = orderbook;
    },
    pricings(state: any, pricings: Pricing[]) {
      state.pricings = pricings;
    }
  }
});

export default store;
