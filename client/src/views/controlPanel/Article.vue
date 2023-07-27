<script setup>
import { ref } from 'vue'
import { useMain } from "@/store/main"
import useMyFetch from '@/hooks/useMyFetch'
import  RichEdit from "@/components/RichEdit.vue"


const store = useMain()
const activeName = ref('first')
const handleClick = (tab,event) => {
  console.log(tab, event)
}

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
      Authorization: store.token,
    },
    cache: "no-cache",
    mode:'cors',//跨域
  }
}

const errorHandle = (result) =>{

}
const successHandle = (result) =>{
  dataList.value = result.data.rows
}

useMyFetch("/blog/search",getRequestInit,errorHandle,successHandle)

const updateColumn = () =>{
  const getRequestInit = () =>{
    return {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
        Authorization: store.token
      },
      cache: "no-cache",
      mode:'cors',//跨域
    }
  }

  const errorHandle = (result) =>{

  }
  const successHandle = (result) =>{
    dataList.value = result.data.rows
  }

  useMyFetch("/blog/update",getRequestInit,errorHandle,successHandle)
}

const deleteColumn = () =>{
    const getRequestInit = () =>{
      return {
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
          Authorization: store.token
        },
        cache: "no-cache",
        mode:'cors',//跨域
      }
  }

  const errorHandle = (result) =>{

  }
  const successHandle = (result) =>{
    dataList.value = result.data.rows
  }

  useMyFetch("/blog/delete",getRequestInit,errorHandle,successHandle)
}

</script>


<template>
    <!-- 实现个人文章统计 发表文章 阅读量等 -->
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="我的文章" name="first">
        <el-table :data="dataList" height="250" style="width: 100%">
        <el-table-column 
        :prop="index" 
        :label="item"
        :key="index"
        v-for="(item, index) in tableHeader"
        />

        <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="updateColumn">修改</el-button>
          <el-button link type="primary" size="small" @click="deleteColumn">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="发表文章" name="add">
      <RichEdit />
      <el-button>添加</el-button>
    </el-tab-pane>

    <el-tab-pane label="文章统计" name="census">census</el-tab-pane>
  </el-tabs>
</template>


<style scoped>
.tabs > .tabs-content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>


