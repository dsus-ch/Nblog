<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAdminStore } from '../../store/Admin'
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ElContainer } from 'element-plus';
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const tabPosition = ref('left')
const router = useRouter()
const route = useRoute()
const store = useAdminStore()
</script>
  

<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu class="aside-menu" 
          @open="handleOpen" 
          @close="handleClose" 
          style="width: 200px;
          height: 100vh;" 
          :router="true"
        >
        
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>配置</span>
            </template>

            <el-sub-menu index="1-1">
              <template #title>item one</template>
              <el-menu-item index="1-1-1">item one to</el-menu-item>
            </el-sub-menu>

          </el-sub-menu>

          <el-menu-item index="/category">
            <el-icon><icon-menu /></el-icon>
            <span>文章管理</span>
          </el-menu-item>

          <el-menu-item index="/article">
            <el-icon><setting /></el-icon>
            <span>分类管理</span>
          </el-menu-item>

        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </div>
</template>

<style scoped></style>
