<script setup>
import { useBlogStore } from '@/store/blog'
import { ElMessageBox } from 'element-plus'


const blogStore = useBlogStore()


const updataColumn = (id, index) =>{
  ElMessageBox.prompt('请输入修改后的分类名称','',{
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: 
    /^[\u4e00-\u9fa5A-Za-z0-9IVXLCDM]{1,10}$/,
    inputErrorMessage: '分类名称敏感'
  })
  blogStore.updataCategory()
}

const deleteColumn = (id, index) =>{
  blogStore.deleteCategory()
}
</script>


<template>
  <el-table 
    :data="blogStore.categoryList" 
    style="width: 100%"
    :default-sort="{ prop: 'id', order: 'descending' }" 
  >
  <el-table-column prop="id" label="编号" sortable />
  <el-table-column prop="name" label="分类名称" />

  <el-table-column fixed="right" label="操作" width="120">
    <template #default="scope">
      <el-button link type="primary" size="small" @click="updataColumn(scope.row.id,scope.$index)">修改</el-button>
      <el-button link type="primary" size="small" @click="deleteColumn(scope.row.id,scope.$index)">删除</el-button>
    </template>
  </el-table-column>

  </el-table>
</template>

<style scoped></style>