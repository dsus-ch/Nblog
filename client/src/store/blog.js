import { defineStore } from "pinia"

export const useBolgStore = defineStore('category', {
  state: () => {
    return {
      article:[],
      categoryList:[],
    }
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   */
  getters: {
    
  },
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    changeState(params){
      this.categoryList = params
    }
  }

})