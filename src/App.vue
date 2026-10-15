<script setup>
import { ref ,computed} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

// 路由顺序和tabbar顺序保持一致
const tabRouteNames = ['Home', 'Chat', 'Profile']

// 计算属性：自动根据当前路由name返回下标
const active = computed(() => {
  return tabRouteNames.indexOf(route.name)
})
</script>

<template>
  <router-view />
  <van-tabbar v-if="['Home','Chat','Profile'].includes(route.name)" v-model="active">
  <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/chat" icon="chat-o">对话</van-tabbar-item>
  <van-tabbar-item to="/profile" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
</template>
