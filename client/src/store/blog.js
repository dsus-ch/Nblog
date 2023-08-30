import { defineStore } from "pinia"

export const useBlogStore = defineStore('blog', {
  state: () => {
    return {
      article:[],
      categoryList:[],
    }
  },
  getters: {
    
  },
  actions: {
    getAllArticle(){
      const res =  this.$axios.get('/blog/search')
      console.log(res)
    },
    updataArticle(){

    },
    delectArticle(){

    },
    searchArticleByCondition(){
      //提供文章id，分类名称、作者
    },
    getCategory(){
      const res = this.$axios.get('/category/list')
      console.log(res)
    },
    updataCategory(){

    },
    delectCategory(){

    },
  }
})