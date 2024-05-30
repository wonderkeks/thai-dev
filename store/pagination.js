import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    currentPage: 1,
    itemsPerPage: 6,
  }),
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    setItemsPerPage(count) {
      this.itemsPerPage = count;
    },
  },
  getters: {
    paginatedItems: (state) => (items) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = state.currentPage * state.itemsPerPage;
      return items.slice(start, end);
    },
    totalPages: (state) => (items) => {
      return Math.ceil(items.length / state.itemsPerPage);
    },
  },
});
