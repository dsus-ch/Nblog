import { defineStore } from "pinia"

export const useGeneralStore = defineStore('general', {
  state: () => {
    return {
      backPage: '/',
      currPage: '/',
      nextPage: '/',
    }
  },
})