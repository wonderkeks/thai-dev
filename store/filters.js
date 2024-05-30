import { defineStore } from 'pinia'
const defaultState = {
  type: '',
  minPrice: 4000000,
  maxPrice: 20000000,
};

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    ...defaultState,
  }),
  actions: {
    setType(type) {
      this.type = type;
    },
    setMinPrice(price) {
      this.minPrice = price;
    },
    setMaxPrice(price) {
      this.maxPrice = price;
    },
    resetFilters() {
      this.$patch({ ...defaultState });
    },
  },
});

