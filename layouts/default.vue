<script setup>
import { useLangStore } from '~/store/lang'

const langStore = useLangStore()

const changeLang = (lang) => {
  langStore.setLang(lang)
}
</script>

<template>
  <header class="flex justify-between p-4 mb-10 items-center">
    <NuxtLink to="/">
      <img src="/logo.svg" alt="" style="width: 100px;">
    </NuxtLink>

    <div class="flex gap-2" style="height: 30px;">
      <button type="button" :class="{ 'bg-indigo-600 text-white': langStore.lang === 'RU' }"
        class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-500 "
        @click="changeLang('RU')">RU</button>
      <button type="button" :class="{ 'bg-indigo-600 text-white': langStore.lang === 'EN' }"
        class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-500"
        @click="changeLang('EN')">ENG</button>
    </div>
  </header>
  <main class="py-8">
    <div class="px-2 lg:px-10 w-full">
      <slot />
    </div>
  </main>
  <Footer />
</template>

<style lang="">

</style>