<script setup>
import {
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import { ElContainer } from 'element-plus'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
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
              <el-icon><setting /></el-icon>
              <span>配置</span>
            </template>
            <el-sub-menu index="1-1">
              <template #title>我的</template>
            </el-sub-menu>
            <el-sub-menu index="1-2">
              <template #title>设置</template>
            </el-sub-menu>
          </el-sub-menu>

          <el-menu-item index="/article">
            <el-icon><article /></el-icon>
            <span>文章管理</span>
          </el-menu-item>

          <el-menu-item index="/category">
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

<style scoped>
</style>
