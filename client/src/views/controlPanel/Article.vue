<script setup>
import { onMounted, ref } from 'vue'
import { useBlogStore } from '@/store/blog'
import PublishArticle from '@/components/PublishArticle.vue'

const activeName = ref('first')
const title = ref('')
const blogStore = useBlogStore()

onMounted(() => {
  Promise.all([blogStore.getAllArticle(), blogStore.getCategory()])
  .then(/* TODO */)
})

</script>


<template>
<el-tabs v-model="activeName" class="tabs">
  <el-tab-pane label="我的文章" name="first">
    
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/article' }">文章列表</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
  </el-breadcrumb>

  <div class="article-item"
    :key="index"
    v-for="(item, index) in blogStore.articleList"
  >
    <el-descriptions :title="item.title">
      <div v-if="blogStore.categoryList[index]">
        <el-descriptions-item label="category">{{ blogStore.categoryList[index].name }}</el-descriptions-item>
      </div>
      <el-descriptions-item label="time">{{ item.create_time }}</el-descriptions-item>
      <el-descriptions-item label="id">{{ item.id }}</el-descriptions-item>
    </el-descriptions>
    <div class="article-item-content"><p v-html="item.content"></p></div>
  </div>

  </el-tab-pane>

  <el-tab-pane label="发表文章" name="add">
    <PublishArticle />
  </el-tab-pane>

  <!-- 实现个人文章统计 发表文章 阅读量等 -->
  <el-tab-pane label="文章统计" name="census">
    <el-empty description="description" />
  </el-tab-pane>
</el-tabs>
</template>


<style scoped>
.tabs > .tabs-content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.article-item{
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 2px solid #808080;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
}
.article-item-content{
  margin: 20px;
}
</style>


