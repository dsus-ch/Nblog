<script setup>
import { onMounted, ref } from 'vue'
import { useBlogStore } from '@/store/blog'
import  RichEdit from '@/components/RichEdit.vue'


const activeName = ref('first')
const title = ref('')
const blogStore = useBlogStore()

onMounted(() => {
  Promise.all([blogStore.getAllArticle(), blogStore.getCategory()])
  .then(/* TODO */)
})

</script>


<template>
<!-- 实现个人文章统计 发表文章 阅读量等 -->
<el-tabs v-model="activeName" class="tabs">
  <el-tab-pane label="我的文章" name="first">
    <el-carousel
      height="400px"
      direction="vertical"
      type="card"
      :autoplay="false"
    >
      <el-carousel-item
        :key="index"
        v-for="(item, index) in blogStore.articleList"
      >
        <h1>{{ item.title }}</h1>
        <div >
          <el-space wrap>
            <el-tag size="large">创建时间： {{ item.create_time }}</el-tag>
            <div v-if="blogStore.categoryList[index]">
              <el-tag class="ml-2" type="success" size="large">分类： {{ blogStore.categoryList[index].name }}</el-tag>
            </div>
            <el-tag class="ml-2" type="danger" size="large">文章ID： {{ item.id }}</el-tag>
          </el-space>
        </div>
        
        <div>
          {{ item.content }}
        </div>
      </el-carousel-item>
    </el-carousel>
  </el-tab-pane>

<el-tab-pane label="发表文章" name="add">
  <el-input v-model="title" placeholder="请输入标题" class="batten"></el-input>
  <RichEdit />
  <el-button class="batten">发表</el-button>
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
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #e8e9ea;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #c9e2ff;
}
.batten{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>


