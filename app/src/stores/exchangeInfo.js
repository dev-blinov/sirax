import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useExchangeInfoStore = defineStore('exchangeInfo', {
  state: () => ({
    symbols: [],
  }),
  actions: {
    async getExchangeInfo() {
      const { symbols } = (await api.get('/binance/exchange-info')).data;
      this.symbols = symbols;
    },
  },
});
