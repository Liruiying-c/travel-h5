<template>
  <div class="page-container">
    <van-nav-bar title="登录" left-arrow @click-left="router.back()" />

    <div class="login-card">
      <van-cell-group inset>
        <van-field v-model="form.username" label="用户名" placeholder="请输入用户名" clearable />
        <van-field v-model="form.phone" label="手机号" placeholder="请输入手机号" clearable />
        <van-field v-model="form.password" label="密码" placeholder="请输入密码" clearable type="password" />
      </van-cell-group>

      <div class="login-btn-wrap">
        <van-button type="primary" block round @click="handleLogin">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { setUser } from '../store/user'

const router = useRouter()
const form = reactive({
  username: '',
  phone: '',
  password: '',
})

// 登录：将登录信息保存至浏览器
const handleLogin = () => {
  if (!form.username) {
    showToast('请输入用户名')
    return
  }
  if (!form.phone) {
    showToast('请输入手机号')
    return
  }
  // 添加电话号码的验证
  if (!/1[3-9]\d{9}$/.test(form.phone)) {
    showToast('请输入正确的手机号')
    return
  }
  if (!form.password) {
    showToast('请输入密码')
    return
  }
  const userInfo = {
    username: form.username,
    phone: form.phone,
    password: form.password,
    LastLogin: new Date().toLocaleString(),
  }
  // 保存登录信息至全局 store（同步至 localStorage）
  setUser(userInfo)
  // 登录成功后返回个人中心
  router.replace({ name: 'Profile' })
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
