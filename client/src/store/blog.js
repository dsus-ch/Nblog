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
    async updateCategory(index, newRow){
      // index与数组是不对应的，但是我们可以知道内容在表格的位置
      const { data } = await this.$axios.put('api/update-category', newRow)
      if(data.code === 200){
        this.categoryList.forEach((value, index, array) =>{
          if(value.id === newRow.id) array[index] = newRow
        })
      }
    },
    async deleteCategory(index, id){
      const { data } = await this.$axios.delete('api/delete-category', { params: { id } })
      if(data.code === 200){
        this.categoryList.forEach((value, index, array) => {
          if(value.id == id) array.splice(index,1)
        })
      }
    },
  }
})