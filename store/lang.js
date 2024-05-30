import { defineStore } from 'pinia'

export const useLangStore = defineStore({
  id: 'lang',
  state: () => ({
    lang: 'RU'
  }),
  actions: {
    setLang(lang) {
      this.lang = lang
    }
  }
})