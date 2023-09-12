import axios from 'axios'
import { ElMessage } from 'element-plus'
import { localforageInstance as lfI } from '@/plugins/localforageInstance'

// TODO
// 1. 公共拦截器，处理各种错误400，501..
// 2. 剥离重复配置
// 3. 请求缓冲区，减少重复请求

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080',           
	timeout: 1000,  
})

//不需要token验证的url
const excludedUrls = ['login','register']

//请求拦截器
axiosInstance.interceptors.request.use((config) => {
	const { url } = config
	if(excludedUrls.some(() =>{
		excludedUrl => new RegExp(excludedUrl).test(url)
	})) {
		return config
	}

	lfI.getItem('token').then((value) => {
		if(value){
			// 验证令牌
			config.headers.Authorization = `Bearer ${value}`
		}else{
			// 抛出异常 需要登陆
			
		}
	})
	return config
})

//响应拦截器
axiosInstance.interceptors.response.use((response) => {
	const type = response.data.code === 200 ? 'success' : 'waring'
	ElMessage({
		message: response.data.msg,
		type: type,
	})

	return response
})

export default function axiosPlugin({ store }) {
  store.$axios = axiosInstance
}