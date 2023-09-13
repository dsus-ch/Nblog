<script setup>
import { ref, computed } from 'vue'
import { useBlogStore } from '@/store/blog'
import { ElMessage, ElMessageBox } from 'element-plus'

const search = ref('')
const blogStore = useBlogStore()

const filterTableData = computed(() =>
blogStore.categoryList.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleEdit = (index, row) =>{
  ElMessageBox.prompt('请输入修改后的分类名称','',{
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: 
    /^[\u4e00-\u9fa5A-Za-z0-9IVXLCDM]{1,10}$/,
    inputErrorMessage: '分类名称敏感'
  })
  .then(({ value }) => {
    blogStore.updateCategory(index, { id:row.id, name:value })
  })
}

const handleDelete = (index, row) =>{
  blogStore.deleteCategory(index,row.id)
}
</script>


<template>
  <el-table 
    :data="filterTableData" 
    style="width: 100%"
    :default-sort="{ prop: 'id', order: 'descending' }" 
  >
  <el-table-column prop="id" label="编号" sortable />
  <el-table-column prop="name" label="分类名称" />

  <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>

      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          修改
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>