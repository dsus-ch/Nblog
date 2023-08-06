<script setup>
import { reactive } from 'vue'
import { useMain } from "@/store/main"
import useMyFetch from '@/hooks/useMyFetch'
import { ElMessage, ElMessageBox } from 'element-plus'

const dataList = reactive([])
const store = useMain()
const token = localStorage.getItem('token')


const getArticleList = () => {
  if (store.categoryList.length == 0) {
    //定死的，不用拆开写
    useMyFetch("/category/list", () => {
      return {
        method: "GET",
        headers: {
          'content-type': 'application/json',
          Authorization: token,
        },
        cache: "no-cache",
        mode: 'cors',
      }
    }, (result) => {}, (result) => {
      store.changeState(result.body)
    })
  }

  store.categoryList.forEach( element => {
    dataList.push(element)
  })
}
getArticleList()//进入页面执行

const updateColumn = ( id,index ) => {
  ElMessageBox.prompt('请输入修改后的分类名称','',{
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: 
    /^[\u4e00-\u9fa5A-Za-z0-9IVXLCDM]{1,10}$/,
    inputErrorMessage: '分类名称敏感'
  })
    .then(({ value }) =>{
        const getRequestInit = () =>{
          return {
            method: "PUT",
            headers: {
              'content-type': 'application/json',
              Authorization: token
            },
            body: JSON.stringify({//请求体
              name:value,
              id,
            }),
            cache: "no-cache",
            mode:'cors',//跨域
        }
      }

      const errorHandle = (result) =>{
        console.log(result)
      }

      const successHandle = (result) =>{
        dataList[index].name = value
      }
      useMyFetch("/category/update",getRequestInit,errorHandle,successHandle)

      ElMessage({
        type: 'success',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}

const deleteColumn = (id,index) => {
  const getRequestInit = () =>{
    return {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({//请求体
        id,
      }),
      cache: "no-cache",
      mode:'cors',//跨域
  }
}

  const errorHandle = (result) =>{
    console.log(result)
  }

  const successHandle = (result) =>{
    dataList.splice(index,1)
  }

  ElMessageBox.confirm(
    '确认要删除该分类吗?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      center: true,
    }
  )
  .then(() => {
    useMyFetch("/category/update",getRequestInit,errorHandle,successHandle)

    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: 'Delete canceled',
    })
  })
}
</script>


<template>
  <el-table 
    :data="dataList" 
    style="width: 100%"
    :default-sort="{ prop: 'id', order: 'descending' }" 
  >
  <el-table-column prop="id" label="编号" sortable />
  <el-table-column prop="name" label="分类名称" />

  <el-table-column fixed="right" label="操作" width="120">
    <template #default="scope">
      <el-button link type="primary" size="small" @click="updateColumn(scope.row.id,scope.$index)">修改</el-button>
      <el-button link type="primary" size="small" @click="deleteColumn(scope.row.id,scope.$index)">删除</el-button>
    </template>
  </el-table-column>

  </el-table>
</template>

<style scoped></style>