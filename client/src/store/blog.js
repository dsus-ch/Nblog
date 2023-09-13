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
    async updateArticle(){

    },
    async deleteArticle(){

    },
    async searchArticleByCondition(){
      //提供文章id，分类名称、作者
    },
    async getCategory(){
      const { data } = await this.$axios.post('/api/search-category')
      this.categoryList = data.body
    },
    async updateCategory(index,body){
      const { data } = await this.$axios.put('api/update-category', body)
      if(data.code === 200){
        this.categoryList[index] = body.name
      }

    },
    async deleteCategory(index, id){
      const { data } = await this.$axios.delete('api/delete-category', { params: { id } })
      if(data.code === 200){
        this.categoryList.splice(index,1)
      }
    },
  }
})