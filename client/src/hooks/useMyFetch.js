/**
 * url 相对路径 如/admin/login
 * requestInit 函数初始化体（RequestInit）
 * errorHandle 请求错误处理函数
 * successHandle 请求成功处理函数
 */

const SERVER_BASE_URL = "http://localhost:8080"
const useMyFetch = async (url,getRequestInit,errorHandle,successHandle) => {
    const requestInit = getRequestInit()
    const response = await fetch(SERVER_BASE_URL + url,requestInit)

    //将可读流转换成文本流
    const reader = await response.body?.
    pipeThrough(new TextDecoderStream).
    getReader().
    read()


    const result = JSON.parse(reader.value)

    if (result && response.ok && result.code == 200) {
        successHandle(result)
    }else{
        errorHandle(result)
    }
}

export default useMyFetch