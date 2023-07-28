<script setup>
import { ref } from 'vue'
import { useMain } from "@/store/main"
import useMyFetch from '@/hooks/useMyFetch'


const dataList = ref([])
const store = useMain()
const token = localStorage.getItem('token')
const categoryList = store.categotyList


const getArticleList = () =>{

	if(!categoryList){
	//定死的，不用拆开写
	useMyFetch("/category/list",() => {
		return{
			method: "GET",
			headers: {
					'content-type': 'application/json',
					Authorization: token,
			},
			cache: "no-cache",
			mode:'cors',
		}
	},(result) => {} , (result) =>{
			dataList.value = result.body
			store.categoryList = result.body
		})
	}
}
getArticleList()//进入页面执行

const updateColumn = ()=>{

}
const deleteColumn = ()=>{
    
}
</script>


<template>
    <el-table
    :data="dataList"
    :default-sort="{ prop: 'id', order: 'descending' }"
    style="width: 100%"
    >
    <el-table-column prop="id" label="编号" sortable />
    <el-table-column prop="name" label="分类名称" />

    <el-table-column fixed="right" label="操作" width="120">
        <template #default>
            <el-button link type="primary" size="small" @click="updateColumn">修改</el-button>
            <el-button link type="primary" size="small" @click="deleteColumn">删除</el-button>
        </template>
    </el-table-column>

    </el-table>
</template>

<style scoped>
</style>