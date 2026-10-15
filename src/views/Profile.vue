<template>
  <div class="page-container">
    <van-nav-bar title="我的" left-arrow />

    <!-- 用户信息卡片 -->
    <div class="user-card" @click="handleClickLogin">
      <van-image class="avatar" round :src="avatar" />
      <div class="user-info">
        <div class="user-name">{{ userStore.userInfo ? userStore.userInfo.username : '立即登录' }}</div>
        <!-- 回显时电话号码中间为* -->
        <div class="user-welcome">{{ userStore.userInfo ? userStore.userInfo.phone.replace(/(\d{3})\d{8}/, '$1********') : '登录后，搜索历史不丢失' }}</div>
      </div>
    </div>

    <!-- 我的服务 -->
    <div class="section">
      <div class="section-title">我的服务</div>
      <van-cell-group inset>
        <van-cell title="我的收藏" icon="star-o" is-link @click="handleService('MyCollect')" />
        <van-cell title="历史记录" is-link @click="handleService('HistorySearch')" />
        <van-cell title="设置" is-link @click="handleService('UserSetting')" />
      </van-cell-group>
    </div>

    <!-- 关于 -->
    <div class="section">
      <div class="section-title">关于</div>
      <van-cell-group inset>
        <van-cell title="关于我们" is-link />
        <van-cell title="版本信息" value="v1.0.0" />
      </van-cell-group>
    </div>

<div style="display:flex;gap:16px;justify-content:center;margin:80px 0;">
  <van-button v-if="userStore.userInfo" type="primary" @click="handleLogout" style="width: 100px;background-color: #5bb5c4;">退出登录</van-button>
  <van-button v-if="userStore.userInfo" type="primary" @click="handleSwapAccount" style="width: 100px;background-color: #5bb5c4;">切换账号</van-button>
</div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import avatar from '../assets/defaultpic.jpg'
import userStore from '../store/user'
import { logout } from '../store/user'


const router = useRouter()

// 点击用户卡片：未登录去登录，已登录去设置
const handleClickLogin = () => {
  if (!userStore.userInfo) {
    router.push({ name: 'Login' })
  } else {
    router.push({ name: 'UserSetting' })
  }
}

// 点击"我的服务"项：未登录则 toast 提示并跳转登录页
const handleService = (name) => {
  if (!userStore.userInfo) {
    showToast('请先登录')
    router.push({ name: 'Login' })
    return
  }
  router.push({ name })
}

// 点击退出登录：清空用户信息并跳转登录页
const handleLogout = () => {
  logout()
  showToast('退出登录成功')
}

// 点击切换账号：清空用户信息并跳转登录页
const handleSwapAccount = () => {
  logout()
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 70px;
}
.user-card {
  background: linear-gradient(135deg, #5b9bd5 0%, #5bc0be 100%);
  padding: 24px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.avatar {
  width: 76px;
  height: 76px;
  border: 3px solid #fff;
  box-sizing: border-box;
  flex-shrink: 0;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.user-name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.user-welcome {
  color: #fff;
  font-size: 13px;
}
.section {
  margin-top: 20px;
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #323232;
  margin-bottom: 12px;
  padding: 0 16px;
}
</style>
