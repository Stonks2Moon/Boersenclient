/* eslint-disable */
import { Broker, BrokerManager } from '@/utils/BrokerManager';
import { Share, ShareManager } from '@/utils/ShareManager';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {} as Broker,
    userValidated: false,
    shares: null,
    brokers: null
  },
  getters: {
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
    }
  },
  mutations: {
    signOut(state: any) {
      state.userValidated = false;
      state.user = undefined;
    },
    signIn(state: any, user: Broker) {
      if (user && user.type === 'stockmarket') {
        state.user = user;
        state.userValidated = true;
        ShareManager.loadShares();
        BrokerManager.loadBrokers();
      }
    },
    shares(state: any, shares: Share[]) {
      state.shares = shares;
    },
    brokers(state: any, brokers: Broker[]) {
      state.brokers = brokers;
    }
  }
});

export default store;
