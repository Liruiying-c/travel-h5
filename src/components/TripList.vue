<template>
  <div class="page-container">
    <van-sticky class="nav-bar">
    <van-nav-bar :title="title" left-arrow @click-left="goBack">
      <template #right>
        <van-icon name="plus" size="20" @click="handleAdd" />
      </template>
    </van-nav-bar>

    <!-- 搜索：按 city 查找 -->
    <div class="search-wrap" style="margin-top: 8px;" >
      <van-search
        v-model="keyword"
        shape="round"
        placeholder="搜索城市"
        background="#fff"
        fixed
      />
    </div>
    </van-sticky>

    <div class="list-content">
      <!-- 加载中 -->
      <div v-if="loading" class="state-container">
        <van-loading size="32px" type="spinner" />
      </div>

      <!-- 空状态 -->
      <van-empty v-else-if="filteredList.length === 0" description="暂无相关记录" />

      <!-- 列表 -->
      <div v-else class="trip-card" v-for="item in filteredList" :key="item.id" @click="handleClick(item)">
        <div class="card-head">
          <span class="city">{{ item.city }}</span>
          <van-icon name="delete-o" size="20" class="del-icon" @click="handleDelete($event,item)" />
        </div>
        <div class="card-info">
          <div class="info-row">
            <van-icon name="calendar-o" size="14" />
            <span>{{ item.days }} 天</span>
          </div>
          <div class="info-row">
            <van-icon name="gold-coin-o" size="14" />
            <span>预算 ¥{{ item.budget }}</span>
          </div>
        </div>
        <div class="card-foot">
          <span>{{ item.createTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showDialog } from 'vant'

const props = defineProps({
  // 页面标题
  title: {
    type: String,
    default: '',
  },
  // 获取列表的请求函数（返回列表数据）
  request: {
    type: Function,
    required: true,
  },
  // 删除单条记录的请求函数
  remove: {
    type: Function,
    default: null,
  },
  // 自定义新增回调，默认跳转首页规划新行程
  onAdd: {
    type: Function,
    default: null,
  },
})

const router = useRouter()

const list = ref([])
const loading = ref(false)
const keyword = ref('')

// 按 city 过滤（搜索）
const filteredList = computed(() => {
  const kw = keyword.value.trim()
  if (!kw) return list.value
  return list.value.filter((item) => (item.city || '').includes(kw))
})

const goBack = () => {
  router.back()
}

// 新增：默认跳转首页规划新行程
const handleAdd = () => {
  if (props.onAdd) {
    props.onAdd()
    return
  }
  router.push({ name: 'Home' })
}

// 获取列表
const fetchList = async () => {
  loading.value = true
  try {
    const res = await props.request()
    list.value = Array.isArray(res) ? res : (res?.data || res?.list || [])
  } catch (err) {
    console.error('请求失败:', err)
    showToast('加载失败')
    list.value = []
  } finally {
    loading.value = false
  }
}

// 删除
const handleDelete = (e,item) => {
  e.stopPropagation()
  showDialog({
    title: '提示',
    message: '确定删除该记录吗？',
  })
    .then(async () => {
      try {
        if (props.remove) {
          await props.remove(item)
        }
        list.value = list.value.filter((i) => i.id !== item.id)
        showToast('删除成功')
      } catch (err) {
        console.error('删除失败:', err)
        showToast('删除失败')
      }
    })
    .catch(() => {})
}

// 点击列表项：跳转详情页
const handleClick = (item) => {
  router.push({ name: 'Detail', params: { id: item.id } })
}



onMounted(() => {
  fetchList()
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 70px;
}
.search-wrap {
  padding: 0 16px;
}
.list-content {
  padding: 12px 16px;
}
.state-container {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
.trip-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.city {
  font-size: 18px;
  font-weight: 600;
  color: #323233;
}
.del-icon {
  color: #ee0a24;
}
.card-info {
  display: flex;
  gap: 16px;
  margin: 12px 0;
}
.info-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
}
.card-foot {
  padding-top: 10px;
  border-top: 1px solid #f5f5f5;
  font-size: 13px;
  color: #969799;
}
</style>
