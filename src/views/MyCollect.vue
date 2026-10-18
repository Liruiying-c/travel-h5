<template>
  <TripList title="我的收藏" from="MyCollect" isCollect="1"/>
</template>

<script setup>
import TripList from '../components/TripList.vue'
import { collectList } from '../mock/tripList'

// 暂不调用后端，使用静态数据
const fetchList = () => {
  
}
</script>
