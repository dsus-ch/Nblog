import axios from 'axios'

// TODO
// 1. 公共拦截器，处理各种错误400，501..
// 2. 剥离重复配置
// 3. 请求缓冲区，减少重复请求



const axiosInstance = axios.create({
	baseURL:'http://localhost:8080',
	timeout: 1000,             
})

//请求拦截器
axiosInstance.interceptors.request.use((config) => {
	console.log(config)
	return config
})

//响应拦截器
axiosInstance.interceptors.response.use((res) => {
	console.log(res)
	return res
})

export default axiosInstance