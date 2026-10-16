<template>
  <div>
    <TripList title="历史记录" :request="fetchList" />
  </div>
</template>

<script setup>
import TripList from '../components/TripList.vue'
import { historyList } from '../mock/tripList'

// 暂不调用后端，使用静态数据
const fetchList = () => Promise.resolve(historyList)
</script>