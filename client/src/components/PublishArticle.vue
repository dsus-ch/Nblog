<template>
    <el-input v-model="title" @change="handleChange" placeholder="Please input" maxlength="10" size="large" show-word-limit>
      <template #prepend>标题：</template>
    </el-input>
    <RichEdit ref="editorRef"/>
    <el-button type="primary" size="medium" @click="submit">发布</el-button>
</template>


<script setup>
import { ref } from 'vue'
import { useBlogStore } from '@/store/blog'
import RichEdit from '@/components/RichEdit.vue'

const title = ref('')
const editorRef = ref(null)// 用于绑定子组件
const blogStore = useBlogStore()

const handleChange = () => {// getter
  return title.value
}

const submit = () => {
  const title = handleChange()
  const htmlValue = editorRef.value.editorRef.getHtml()
  const categoryId = 422761003581509// test
  blogStore.addArticle(categoryId,title,htmlValue)
}
</script>

<style scoped>
.el-input{
  margin-bottom: 15px;
}
.el-button{
  width: 100%;
  margin-top: 10px;
}
</style>