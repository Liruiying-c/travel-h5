<template>
  <div class="page-container">
    <div>
    <van-nav-bar left-arrow @click-left="goBack" title="关于我们" fixed/>
    </div>

    <!-- 应用信息 -->
    <div class="app-header">
      <van-image class="app-logo" :src="logo" radius="22" />
      <div class="app-name">智能旅游助手</div>
      <div class="app-version">Version 1.0.0</div>
    </div>

    <!-- 功能列表（通栏分组） -->
    <van-cell-group class="menu-group">
      <van-cell title="功能介绍" is-link @click="showIntro = true" />
      <van-cell title="投诉" is-link @click="showToast('功能开发中')" />
      <van-cell title="版本更新" value="v1.0.0" is-link @click="showToast('当前已是最新版本')" />
    </van-cell-group>

    <!-- 底部备案与版权 -->
    <div class="footer">
      <div class="footer-links">
        <span>《软件许可及服务协议》</span>
        <span>《隐私保护指引》</span>
      </div>
      <div class="footer-copy">智能旅游助手 版权所有</div>
      <div class="footer-copy">Copyright © 2026 All Rights Reserved.</div>
    </div>

    <!-- 功能介绍弹层 -->
    <van-popup v-model:show="showIntro" position="bottom" round>
      <div class="intro-popup">
        <div class="intro-title">功能介绍</div>
        <p class="intro-desc">
          智能旅游助手系统是一个基于 AI 技术的旅游规划平台，旨在为用户提供个性化的旅游行程推荐和实时旅游咨询服务。系统通过结合大语言模型的智能分析能力，为用户生成符合预算和时间要求的详细旅游规划，并提供实时的旅游问答服务。
        </p>
        <ul class="intro-list">
          <li>
            <div class="intro-label">智能旅游规划</div>
            <div class="intro-text">根据用户输入的目的地、预算和天数，生成详细的行程安排</div>
          </li>
          <li>
            <div class="intro-label">AI 旅游咨询</div>
            <div class="intro-text">提供实时的旅游相关问答服务</div>
          </li>
          <li>
            <div class="intro-label">流式响应</div>
            <div class="intro-text">实时显示 AI 生成内容，提升用户体验</div>
          </li>
          <li>
            <div class="intro-label">调用的模型</div>
            <div class="intro-text">zai-org/GLM-5.3-Flash</div>
          </li>
        </ul>
        <van-button type="primary" block round class="intro-btn" @click="showIntro = false">我知道了</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import logo from '../assets/logo.jpg'

const router = useRouter()
const showIntro = ref(false)


const goBack = () => {
  router.back()
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

/* 应用信息 */
.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 106px 0 48px;
}
.app-logo {
  width: 96px;
  height: 96px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.app-name {
  margin-top: 16px;
  font-size: 22px;
  font-weight: 600;
  color: #323233;
}
.app-version {
  margin-top: 8px;
  font-size: 15px;
  color: #969799;
}

/* 功能列表 */
.menu-group {
  width: 90%;
  margin: 0 auto;
}

/* 底部版权 */
.footer {
  margin-top: auto;
  padding: 24px 16px 32px;
  text-align: center;
}
.footer-links {
  font-size: 13px;
  color: #7d8e9a;
}
.footer-links span + span {
  margin-left: 12px;
}
.footer-copy {
  margin-top: 10px;
  font-size: 12px;
  color: #c8c9cc;
}

/* 功能介绍弹层 */
.intro-popup {
  padding: 24px 20px 32px;
  max-height: 70vh;
  overflow-y: auto;
}
.intro-title {
  font-size: 18px;
  font-weight: 600;
  color: #323233;
  text-align: center;
  margin-bottom: 16px;
}
.intro-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.7;
  margin: 0 0 20px;
}
.intro-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.intro-list li {
  background-color: #f7f8fa;
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 10px;
}
.intro-label {
  font-size: 14px;
  font-weight: 600;
  color: #323233;
  margin-bottom: 4px;
}
.intro-text {
  font-size: 13px;
  color: #969799;
  line-height: 1.6;
}
.intro-btn {
  margin-top: 12px;
}
</style>
