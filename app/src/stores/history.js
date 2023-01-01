import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useHistoryStore = defineStore('history', {
  state: () => ({
    symbols: {},
  }),
  actions: {
    async getHistory(symbol) {
      const { data } = await api.get(`/binance/history/${symbol}`);
      this.symbols[symbol] = data;
    },
  },
});
