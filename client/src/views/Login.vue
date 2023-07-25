<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import useMyFetch from '../hooks/useMyFetch'

const router = useRouter()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '输入姓名',
  password: "输入密码",
  email: "输入邮箱",
})

//规则验证
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please select Activity zone', trigger: 'blur' },
    { min: 6, max: 12, message: 'Length should be 6 to 12', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please select Activity zone', trigger: 'blur' },
    { min: 6, max: 12, message: 'Length should be 6 to 12', trigger: 'blur' },
  ],
})

const getRequestInit = () =>{
  const data = {
    account: `${ruleForm.name}`,
    password: `${ruleForm.password}`
  }
  return {
    method: "POST",
    headers: {
      'content-type': 'application/json'
      // "content-type": "application/x-www-form-urlencoded" 字符串形式传输 形如："paw=111&d=xx"
    },
    body: JSON.stringify(data),
    cache: "no-cache",//禁用缓存
  }
}

const errorHandle = (result:any) =>{
  ElMessage({
        message: 'Login Failure Warning.',
        type: 'warning',
  })
}

const successHandle = (result:any) =>{
  ElMessage({
        message: 'Landing successful.',
        type: 'success',
  })
  //TODO 状态管理
  console.log(result)
  //重定向
  router.push("/control-panel")
}



const submitForm = async (formEl: FormInstance | undefined) => {
  //逻辑校验
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      //成功则进行请求
      // myFetch()
      useMyFetch("/admin/login",getRequestInit,errorHandle,successHandle)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>



<template>
  <el-card class="login-card" shadow="always">
    <template #header>
      <div class="card-header">
        <span>登陆</span>
      </div>
    </template>
    <div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="left" label-width="120px"
        :size="formSize" status-icon>
        <el-form-item label="name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :plain="true" @click="submitForm(ruleFormRef)">
            Create
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
  
<style>
.login-card {
  width: 600px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header span {
  display: inline-block;
  text-align: center;
}

.login-card {
  width: 500px;
}
</style>