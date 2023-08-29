import axios from 'axios'
import { useRoute } from 'vue-router'

// TODO
// 1. 公共拦截器，处理各种错误400，501..
// 2. 剥离重复配置
// 3. 请求缓冲区，减少重复请求

const router = useRoute()

const axiosInstance = axios.create({
	baseURL:'http://localhost:8080',
	timeout: 1000,             
})

//不需要token验证的url
const excludedUrls = ['login','register']

//请求拦截器
axiosInstance.interceptors.request.use((config) => {
	const { url } = config
	if(!excludedUrls.some((excludedUrl) => url.includes(excludedUrl))) {
		return config
	}

	const {token} = localStorage.getItem('token')
	if(token){
		config.headers.Authorization = `Bearer ${token}`
	}else{
		console.log('没有token')
	}
	return config
})

//响应拦截器
axiosInstance.interceptors.response.use((response) => {
	console.log(res)
	return response
})

export default function axiosPlugin({ store }) {
  store.$axios = axiosInstance
}