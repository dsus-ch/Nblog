import { defineStore } from "pinia" // 定义容器

export const useMain = defineStore('main', {
  state: () => {
    return {
      token:"",
      categoryList:[]
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

  }

})