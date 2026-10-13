<template>
  <div class="page-container">
    <van-nav-bar title="智能旅游助手" />
  <div class="page-content">
      <van-notice-bar
    left-icon="volume-o"
    text="基于AI的智能景点介绍与行程规划系统"
    />
    <div class="card">
      <div class="section-title">规划你的旅程</div>
      <div>
        <van-field 
        @click="showCityPicker = true"
        v-model="formData.city" 
        label="目的地"
        is-link
        readonly
        placeholder="请选择城市" 
        style="background-color: #f7f7f7; border-radius: 8px; margin-bottom: 8px;"/>
        <van-field 
        v-model="formData.bugget" 
        label="预算(元)"
        placeholder="请输入预算" 
        style="background-color: #f7f7f7; border-radius: 8px; margin-bottom: 8px;"/>
        <van-field 
        v-model="formData.days" 
        label="天数"
        placeholder="请输入行程天数" 
        style="background-color: #f7f7f7; border-radius: 8px; margin-bottom: 8px;"/>
        <van-button type="primary" size="large" round @click="handleSubmit">开始规划</van-button>
    </div>
      
    </div>
    <div class="card">
      <div class="section-title">快捷入口</div>
      <div class="quick-entry">
        <div @click="handleChat" class="entry-item">
          <div class="entry-icon">
            <van-icon name="chat-o" size="30" />
          </div>
          <span class="entry-label">AI 对话</span>
        </div>
        <div @click="goPage('/profile')" class="entry-item">
          <div class="entry-icon">
            <van-icon name="user-o" size="30" />
          </div>
          <span class="entry-label">我的</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">热门目的地</div>
      <van-grid :gutter="12" :column-num="4">
        <van-grid-item @click="selectedCity(city)" v-for="city in hotCity" :key="city" >
          <div class="city-tag" :class="{active:formData.city === city}"> 
            {{ city }} 
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
  <van-popup 
  round
  v-model:show="showCityPicker"
  position="bottom">
      <van-picker
        title="请选择城市"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
  </van-popup>
    </div>
</template>


<script setup>
import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router'
import {showToast} from 'vant'
import { isLoggedIn } from '../store/user'

const router = useRouter()

const showCityPicker = ref(false)

const formData = reactive({
  "city": "",
  "bugget": null,
  "days": null
})

const allCities = [
  '北京', '上海', '广州', '深圳', '成都', '杭州', '西安', '重庆',
  '南京', '武汉', '苏州', '长沙', '天津', '郑州', '济南', '青岛',
  '大连', '沈阳', '哈尔滨', '长春', '福州', '厦门', '南昌', '合肥',
  '昆明', '贵阳', '南宁', '桂林', '海口', '三亚', '丽江', '大理',
  '西安', '兰州', '乌鲁木齐', '拉萨', '呼和浩特', '太原', '石家庄'
]

const hotCity = ['北京', '上海', '广州', '深圳', '成都', '杭州', '西安', '重庆']

const columns = allCities.map(city => ({text: city, value: city}))

const onConfirm = ({ selectedOptions }) => {
  formData.city = selectedOptions[0].value
  showCityPicker.value = false
}
const onCancel = () => {
  showCityPicker.value = false
}

// 跳转页面
const goPage = (path) => {
  router.push(path)
}

// AI 对话（需登录）
const handleChat = () => {
  if (!isLoggedIn.value) {
    showToast('请先登录')
    router.push({ name: 'Login' })
    return
  }
  router.push('/chat')
}

// 选择城市
const selectedCity = (city) => {
  formData.city = city
}

// 旅游规划提交
const handleSubmit = () => {
  // 未登录拦截
  if(!isLoggedIn.value) {
    showToast('请先登录')
    router.push({ name: 'Login' })
    return
  }
  // 检验
  if(!formData.city) {
    showToast('请选择目的地')
    return
  }
  // 预算
  if(!formData.bugget || formData.bugget < 100) {
    showToast('预算不能低于100元')
    return
  }
  // 天数
  if(!formData.days || formData.days < 1) {
    showToast('行程天数不能低于1天')
    return
  }
  router.push({
    name: 'Detail',
    query: {
      city: formData.city,
      bugget: formData.bugget,
      days: formData.days
    }
  })
}

</script>


<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 70px;
}
.page-content {
  padding: 16px;
}
.card {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #323232;
  margin-bottom: 12px;
}
.quick-entry {
  display: flex;
  margin-top: 12px;
  justify-content: space-around;
}
.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  /* background: #f7f8fa; */
}
/* .entry-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #eaf4ff;
  color: #1989fa;
  display: flex;
  align-items: center;
  justify-content: center;
} */
.entry-label {
  font-size: 13px;
  color: #323232;
}
.city-tag {
  padding: 8px 12px;
  background: #f7f8fa;
  font-size: 14px;
  border-radius: 16px;
  color: #666;
  transition: all 0.3s;
}
.city-tag.active {
  background: #1989fa;
  color: #fff;
}
</style>
