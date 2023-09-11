import { defineStore } from "pinia"
import { useGeneralStore } from "./general"
import { localforageInstance as lfI } from '@/plugins/localforageInstance'

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
        account: email,
        password: password,
      })
      
      if(data.code === 200){
        const generalStore = useGeneralStore()

        const token = data.token
        lfI.setItem('token',token)
        this.token = token
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
})