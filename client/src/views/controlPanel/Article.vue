<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useMyFetch from '../../hooks/useMyFetch'

const router = useRouter()
const route = useRoute()

//动态渲染表格
const tableHeader = {
  id:"编号",
  category_id:"文章分类",
  title:"标题",
  create_time:"创建时间"
}
const dataList = ref([])

const getRequestInit = () =>{
  return {
    method: "GET",
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJhY2NvdW50IjoiYWRtaW4ifSwiaWF0IjoxNjkwMjkwNTQ2LCJleHAiOjE2OTA1NDk3NDZ9.rTO4QB3Akoc7A2PeOYiPGd1KCWbgE7_5JPV5mjxH-9E'
    },
    cache: "no-cache",
    mode:'cors',//跨域
  }
}

const errorHandle = (result:any) =>{

}
const successHandle = (result:any) =>{
  dataList.value = result.data.rows!
}

useMyFetch("/blog/search",getRequestInit,errorHandle,successHandle)

const updateColumn = () =>{
  const getRequestInit = () =>{
    return {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJhY2NvdW50IjoiYWRtaW4ifSwiaWF0IjoxNjkwMjkwNTQ2LCJleHAiOjE2OTA1NDk3NDZ9.rTO4QB3Akoc7A2PeOYiPGd1KCWbgE7_5JPV5mjxH-9E'
      },
      cache: "no-cache",
      mode:'cors',//跨域
    }
  }

  const errorHandle = (result:any) =>{

  }
  const successHandle = (result:any) =>{
    dataList.value = result.data.rows!
  }

  useMyFetch("/blog/update",getRequestInit,errorHandle,successHandle)
}

const deleteColumn = () =>{
    const getRequestInit = () =>{
      return {
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJhY2NvdW50IjoiYWRtaW4ifSwiaWF0IjoxNjkwMjkwNTQ2LCJleHAiOjE2OTA1NDk3NDZ9.rTO4QB3Akoc7A2PeOYiPGd1KCWbgE7_5JPV5mjxH-9E'
        },
        cache: "no-cache",
        mode:'cors',//跨域
      }
  }

  const errorHandle = (result:any) =>{

  }
  const successHandle = (result:any) =>{
    dataList.value = result.data.rows!
  }

  useMyFetch("/blog/delete",getRequestInit,errorHandle,successHandle)
}
</script>


<template>
    <!-- 实现个人文章统计 发表文章 阅读量等 -->
    <div>
      <el-button>添加</el-button>
    </div>

    <el-table :data="dataList" height="250" style="width: 100%">
      <el-table-column 
      :prop="index" 
      :label="item"
      :key="index"
      v-for="(item, index) in tableHeader"/>

      <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="updateColumn">修改</el-button>
        <el-button link type="primary" size="small" @click="deleteColumn">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
</template>


<style scoped>
</style>


