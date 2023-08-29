import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      email: "",
      name: "",
      token: "",
    }
  },
  getters: {
    
  },
  actions: {
    changeState(params){
      this.categoryList = params
    }
  }

})