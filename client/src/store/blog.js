import { defineStore } from "pinia"

export const useBlogStore = defineStore('blog', {
  state: () => {
    return {
      articleList:[],
      categoryList:[],
    }
  },
  getters: {
    
  },
  actions: {
    async getAllArticle(){
      const { data } = await this.$axios.post('/api/search')
      this.articleList = data.data.rows
    },
    async updataArticle(){

    },
    async delectArticle(){

    },
    async searchArticleByCondition(){
      //提供文章id，分类名称、作者
    },
    async getCategory(){
      const { data } = await this.$axios.post('/api/search-category')
      this.categoryList = data.body
    },
    async updataCategory(){

    },
    async delectCategory(){

    },
  }
})