import { defineStore } from "pinia"
import { useGeneralStore } from "./general"

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      email: '',
      name: '',
      token: '',
    }
  },
  getters: {
    
  },
  actions: {
    async login(email,password){
      const { data } =  await this.$axios.post('/api/login',{
        data:{
          account: email,
          password: password,
        },
        headers: {
            'content-type': 'application/json',
            // "content-type": "application/x-www-form-urlencoded" 字符串形式传输 形如："paw=111&d=xx"
          },
      })
      
      if(data.code === 200){
        const generalStore = useGeneralStore()

        this.token = data.token
        generalStore.nextPage = '/control-panel'
      }
    },

    async register(){

    },

    logout(){
      const generalStore = useGeneralStore()

      this.email = ''
      this.name = ''
      this.token =  ''
      generalStore.token = '/login'
    },
  },

  persist: true,
})