<template>
  <div class="page-container">
    <div class="nav-bar">
      <van-nav-bar title="登录" left-arrow @click-left="router.back()" fixed/>
    </div>

    <div class="login-card" style="margin-top: 45px;">
      <van-cell-group inset>
        <van-field v-model="form.username" label="用户名" placeholder="请输入用户名" clearable />
        <van-field v-model="form.phone" label="手机号" placeholder="请输入手机号" clearable />
        <van-field v-model="form.password" label="密码" placeholder="请输入密码" clearable type="password" />
      </van-cell-group>

      <div class="login-btn-wrap">
        <van-button type="primary" block round @click="handleLogin">登录</van-button>
        <van-button type="primary" block round @click="handleRegister" style="margin-top: 12px;">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter} from 'vue-router'
import { showToast } from 'vant'
import { saveToStorage } from '../store/user'
import request from '../utils/request'


const router = useRouter()
const form = reactive({
  username: '',
  phone: '',
  password: '',
})

const response = reactive({
  userId:'',
  userName:'',
  nickName:'',
  avatar:'',
  createTime:'',
  expireTime:''
})

// 登录：将登录信息保存至浏览器
const Check = () => {
  if (!form.username) {
    showToast('请输入用户名')
    return false
  }
  if (!form.phone) {
    showToast('请输入手机号')
    return false
  }
  // 添加电话号码的验证
  if (!/1[3-9]\d{9}$/.test(form.phone)) {
    showToast('请输入正确的手机号')
    return false
  }
  if (!form.password) {
    showToast('请输入密码')
    return false
  }
  const userInfo = {
    username: form.username,
    phone: form.phone,
    password: form.password,
  }
  return userInfo
}

const handleLogin = async () => {
  const userInfo = Check()
  if (!userInfo) {
    return
  }
  try {
    const res = await request.post('/api/travel/login',{
      username: form.phone,
      nickname: form.username,
      passwordHash: form.password
    })
    if (res.code === 200) {
      showToast('登录成功')
      response.userId = res.data.id
      response.userName = res.data.username
      response.nickName = res.data.nickname
      response.avatar = res.data.avatar
      response.createTime = res.data.createTime
      saveToStorage(response)
      router.back()
    } else {
      showToast(res.message)
    }
  } catch (error) {
    console.log(error)
    showToast("登录失败")
  }
}

const handleRegister = async () => {
  const userInfo = Check()
  if (!userInfo) {
    return
  }
  try {
    const res = await request.post('/api/travel/register',{
      username: form.phone,
      nickname: form.username,
      passwordHash: form.password
    })
    if (res.code === 200) {
      showToast('注册成功')
      response.userId = res.data.id
      response.userName = res.data.username
      response.nickName = res.data.nickname
      response.avatar = res.data.avatar
      response.createTime = res.data.createTime
      saveToStorage(response)
      router.back();
    } else {
      showToast(res.message)
    }
  } catch (error) {
    showToast("注册失败")
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.login-card {
  margin-top: 20px;
}
.login-btn-wrap {
  padding: 24px 16px 0;
}
</style>
