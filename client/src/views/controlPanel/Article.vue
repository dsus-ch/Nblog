<script setup>
import { ref } from 'vue'
import { useMain } from "@/store/main"
import useMyFetch from '@/hooks/useMyFetch'
import  RichEdit from "@/components/RichEdit.vue"


const store = useMain()
const token = localStorage.getItem('token')
const activeName = ref('first')
const dataList = ref([])


const getRequestInit = () =>{
  return {
    method: "GET",
    headers: {
      'content-type': 'application/json',
      Authorization: token,
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
        Authorization: token
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
          Authorization: token
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
            v-for="(item, index) in dataList"
          >
            <h1>{{ item.title }}</h1>
            <div >
              <el-space wrap>
                <el-tag size="large">创建时间： {{ item.create_time }}</el-tag>
                <el-tag class="ml-2" type="success" size="large">分类： {{ item.category_id }}</el-tag>
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
</style>


