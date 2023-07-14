<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '../../store/Admin'

const router = useRouter()
const route = useRoute()
const tableData = [
  {
    id: '2016-05-03',
    title: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2016-05-02',
    title: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2016-05-04',
    title: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2016-05-01',
    title: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2016-05-08',
    title: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2016-05-06',
    title: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: '2016-05-07',
    title: 'Tom',
    type: 'No. 189, Grove St, Los Angeles',
  },
]

const updateColumn = () =>{

}

const deleteColumn = () =>{
  
}
</script>


<template>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="type" label="文章分类" />

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

