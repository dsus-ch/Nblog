<template>
<div class="demo-input-suffix">
  <el-row :gutter="20">
    <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
      >标题</span
    >
    <el-input
      v-model="title"
      class="w-50 m-2"
      placeholder="Pick a date"
    />
  </el-row>
  <RichEdit />
</div>

</template>


<script setup>
import RichEdit from '@/components/RichEdit.vue'

</script>

<style scoped>


</style>