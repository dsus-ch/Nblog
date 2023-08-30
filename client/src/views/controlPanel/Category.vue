<script setup>
import { reactive } from 'vue'
import { useBlogStore } from '@/store/blog'
import { ElMessage, ElMessageBox } from 'element-plus'

const dataList = reactive([])
const blogStore = useBlogStore()


//弹窗
// ElMessageBox.prompt('请输入修改后的分类名称','',{
//     confirmButtonText: 'OK',
//     cancelButtonText: 'Cancel',
//     inputPattern: 
//     /^[\u4e00-\u9fa5A-Za-z0-9IVXLCDM]{1,10}$/,
//     inputErrorMessage: '分类名称敏感'
//   }
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
      <el-button link type="primary" size="small" @click="updataColumn(scope.row.id,scope.$index)">修改</el-button>
      <el-button link type="primary" size="small" @click="deleteColumn(scope.row.id,scope.$index)">删除</el-button>
    </template>
  </el-table-column>

  </el-table>
</template>

<style scoped></style>