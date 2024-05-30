<script setup>
import { useObjectsQuery } from '~/components/floors/useObjectsQuery';
import { useFiltersStore } from '~/store/filters';
import { usePaginationStore } from '~/store/pagination';
import { computed } from 'vue';
import { useLangStore } from '~/store/lang';

const langStore = useLangStore();

const { data, isLoading } = useObjectsQuery();
const filtersStore = useFiltersStore();
const paginationStore = usePaginationStore();

const filteredData = computed(() => {
  if (!data.value) return [];
  return data.value.filter(floor => {
    const matchesType = filtersStore.type ? floor.type.includes(filtersStore.type) : true;
    const matchesMinPrice = filtersStore.minPrice ? floor.price >= filtersStore.minPrice : true;
    const matchesMaxPrice = filtersStore.maxPrice ? floor.price <= filtersStore.maxPrice : true;
    return matchesType && matchesMinPrice && matchesMaxPrice;
  });
});

const paginatedData = computed(() => {
  return paginationStore.paginatedItems(filteredData.value);
});

const totalPages = computed(() => {
  return paginationStore.totalPages(filteredData.value);
});

watch(filteredData, () => {
    paginationStore.setCurrentPage(1)
})

</script>

<template>
  <div>
    <div class="filters flex gap-4 items-center flex-wrap mb-16">
      <!-- Фильтры здесь -->
      <label>
        {{ langStore.lang === 'RU' ? 'Тип' : "Type" }}
        <select v-model="filtersStore.type" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option value="">{{ langStore.lang === 'RU' ? 'Все' : "All" }}</option>
          <option value="Condo">Condo</option>
          <option value="Villa">Villa</option>
        </select>
      </label>

      <div>
        <label for="price" class="block text-sm font-medium leading-6 text-gray-900">{{ langStore.lang === 'RU' ? 'Цена мин.' : "Min Price:" }}</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div>
          <input v-model.number="filtersStore.minPrice" type="text" name="price" id="price"
                 class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 placeholder="0.00" aria-describedby="price-currency" />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 sm:text-sm" id="price-currency">USD</span>
          </div>
        </div>
      </div>

      <div>
        <label for="price" class="block text-sm font-medium leading-6 text-gray-900">{{ langStore.lang === 'RU' ? 'Цена макс.' : "Max Price:" }}</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div>
          <input v-model.number="filtersStore.maxPrice" type="text" name="price" id="price"
                 class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 placeholder="0.00" aria-describedby="price-currency" />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 sm:text-sm" id="price-currency">USD</span>
          </div>
        </div>
      </div>

      <button @click="filtersStore.resetFilters" type="button" class="justify-self-end self-end rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {{ langStore.lang === 'RU' ? 'Сброс' : "Reset" }}
      </button>
    </div>

    <h1 v-if="isLoading">Loading...</h1>
    <div v-else>
      <div class="grid lg:grid-cols-2 grid-cols-1 justify-center gap-12">
        <FloorCard v-for="floor in paginatedData" :floor="floor" :key="floor.id" />
      </div>
      <div class="flex justify-center mt-16 gap-8 items-center">
        <button class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" @click="paginationStore.setCurrentPage(paginationStore.currentPage - 1)" :disabled="paginationStore.currentPage === 1">
            <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#0F0F0F"/>
            </svg>
        </button>
        <span>{{ paginationStore.currentPage }} / {{ totalPages }}</span>
        <button class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" @click="paginationStore.setCurrentPage(paginationStore.currentPage + 1)" :disabled="paginationStore.currentPage === totalPages">
            <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#0F0F0F"/>
            </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>

</style>
