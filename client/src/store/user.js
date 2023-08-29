import { defineStore } from "pinia"
import { useRouter } from 'vue-router'

const router = useRouter()

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
    login(email,password){
      return this.$axios.post('/admin/login',{
        date:{
          account: email,
          password: password,
        },
        headers: {
            'content-type': 'application/json',
            // "content-type": "application/x-www-form-urlencoded" 字符串形式传输 形如："paw=111&d=xx"
          },
      })
    },

    register(){

    },

    logout(){

    },
  }
})