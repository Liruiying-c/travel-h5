<template>
  <div class="page-container">
    <van-nav-bar title="设置" left-arrow @click-left="goBack" fixed/>

   <div class="section">
      <div class="section-title">用户信息</div>
      <van-cell-group inset>
        <van-cell title="用户名" :value="userStore.userInfo.username" @click="showPopup = true" is-link />
        <van-cell title="手机号" :value="userStore.userInfo.phone" />
        <van-cell title="密码" value="********" is-link @click="showPopupPassword = true"/>
      </van-cell-group>
      </div>
      <van-popup v-model:show="showPopup" position="bottom" style="height: 30%" >
        <van-field v-model="newusername" label="用户名" style="background-color: #f7f7f7; border-radius: 8px; margin: 8px 16px;width: 80%;" />
        <van-button type="primary" block @click="handleUpdate" round style="width: 50%; margin: 10px auto;">更新</van-button>
      </van-popup>
      <van-popup v-model:show="showPopupPassword" position="bottom" style="height: 30%" >
        <van-field v-model="oldpassword" label="旧密码" style="background-color: #f7f7f7; border-radius: 8px; margin: 8px 16px;width: 80%;" type="password" />
        <van-field v-model="newpassword" label="新密码" style="background-color: #f7f7f7; border-radius: 8px; margin: 8px 16px;width: 80%;" type="password" />
        <van-button type="primary" block @click="handleUpdatePassword" round style="width: 50%; margin: 10px auto;">更新密码</van-button>
      </van-popup>  
  </div>
</template>

<script setup>
import router from '../router'
import userStore from '../store/user'
import { showToast } from 'vant'
import { ref } from 'vue'
import { updateUserInfo } from '../store/user'

const showPopup = ref(false)
const showPopupPassword = ref(false)
const newusername = ref(userStore.userInfo.username)
const newpassword = ref('')
const oldpassword = ref('')

const goBack = () => {
  router.back()
}

const handleUpdate = () => {
  if (!newusername.value) {
    showToast('请输入用户名')
    return
  }
  const userInfo = {
    username: newusername.value,
    phone: userStore.userInfo.phone,
    password: userStore.userInfo.password,
    LastLogin: userStore.userInfo.LastLogin,
  }
  updateUserInfo(userInfo)
  showPopup.value = false
  showToast('更新成功')
}

// 提交密码
const handleUpdatePassword = () => {
  if (!oldpassword.value) {
    showToast('请输入旧密码')
    return
  }
  if (!newpassword.value) {
    showToast('请输入新密码')
    return
  }
  // 先验证旧密码是否正确
  if (oldpassword.value !== userStore.userInfo.password) {
    showToast('旧密码错误')
    return
  }
  const userInfo = {
    username: userStore.userInfo.username,
    phone: userStore.userInfo.phone,
    password: newpassword.value,
    LastLogin: userStore.userInfo.LastLogin,
  }
  updateUserInfo(userInfo)
  showPopupPassword.value = false
  showToast('更新成功')
}
  
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 70px;
}
.section {
  margin-top: 50px;
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #323232;
  margin-bottom: 12px;
  padding: 0 16px;
}
</style>