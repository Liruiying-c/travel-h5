<template>
  <div class="page-container">
    <van-nav-bar title="设置" left-arrow @click-left="goBack" fixed/>

   <div class="section">
      <div class="section-title">用户信息</div>
      <van-cell-group inset>
        <van-cell title="用户名" :value="userStore.userInfo.nickName" @click="showPopup = true" is-link />
        <van-cell title="手机号" :value="userStore.userInfo.userName.replace(/(\d{1})\d{7}(\d{3})/, '$1*******$2')" />
        <van-cell title="密码" value="********" is-link @click="showPopupPassword = true"/>
      </van-cell-group>
      </div>
      <van-popup v-model:show="showPopup" position="bottom" style="height: 30%" >
        <van-field v-model="newusername" label="用户名" placeholder="请输入新用户名" clearable style="background-color: #f7f7f7; border-radius: 8px; margin: 8px 16px;width: 80%;" />
        <van-button type="primary" block @click="handleUpdate" round style="width: 50%; margin: 10px auto;">更新</van-button>
      </van-popup>
      <van-popup v-model:show="showPopupPassword" position="bottom" style="height: 30%" >
        <van-field v-model="oldpassword" label="旧密码" placeholder="请输入旧密码" clearable style="background-color: #f7f7f7; border-radius: 8px; margin: 8px 16px;width: 80%;" type="password" />
        <van-field v-model="newpassword" label="新密码" placeholder="请输入新密码" clearable style="background-color: #f7f7f7; border-radius: 8px; margin: 8px 16px;width: 80%;" type="password" />
        <van-button type="primary" block @click="handleUpdatePassword" round style="width: 50%; margin: 10px auto;">更新密码</van-button>
      </van-popup>  
  </div>
</template>

<script setup>
import router from '../router'
import userStore from '../store/user'
import { showToast } from 'vant'
import { ref } from 'vue'
import { updateNickname, getUserId } from '../store/user'
import request from '../utils/request'

const showPopup = ref(false)
const showPopupPassword = ref(false)
const newusername = ref(userStore.userInfo.nickName)
const newpassword = ref('')
const oldpassword = ref('')

const goBack = () => {
  router.back()
}

const handleUpdate = async () => {
  if (!newusername.value) {
    showToast('请输入用户名')
    return
  }
  if (newusername.value === userStore.userInfo.nickName) {
    showToast('用户名未改变')
    showPopup.value = false
    return
  }
  try {
    const res = await request.post('/api/travel/update_nickname',{},{
      params:{
        userId: getUserId(),
        nickName: newusername.value,
      }
    })
    if (res.code === 200) {
      showToast('更新成功')
     updateNickname(newusername.value)
    } else {
      showToast(res.message)
    } 
  } catch (error) {
    showToast(error.message)
  } finally {
    showPopup.value = false
  }
}

// 提交密码
const handleUpdatePassword = async () => {
  if (!oldpassword.value) {
    showToast('请输入旧密码')
    return
  }
  if (!newpassword.value) {
    showToast('请输入新密码')
    return
  }
  try {
    const res = await request.post('/api/travel/update_pwd',{},{
      params:{
        userId: getUserId(),
        oldPassword: oldpassword.value,
        newPassword: newpassword.value,
      }
    })
    if (res.code === 200) {
      showToast('更新成功')
      showPopupPassword.value = false
    } else {
      showToast(res.message)
    } 
  } catch (error) {
    showToast(error.message)
  } finally {
    showPopupPassword.value = false
  }
}
  
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 70px;
}
.section {
  margin-top: 45px;
  padding-top: 10px;
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #323232;
  margin-bottom: 12px;
  padding: 0 16px;
}
</style>