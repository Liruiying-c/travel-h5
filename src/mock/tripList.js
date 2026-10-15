// 临时静态数据（暂不调用后端）
// 字段来源：Detail.vue 推荐行程静态数据中的 city / days / totalBudget
const baseTrip = {
  city: '北京',
  days: 2,
  budget: 5000,
}

// 按列表记录的返回结构生成一条数据
const createItem = (overrides) => ({
  id: '',
  user_id: '1',
  trip_id: '',
  city: baseTrip.city,
  days: baseTrip.days,
  budget: baseTrip.budget,
  createTime: '',
  isCollected: 0,
  ...overrides,
})

// 我的收藏列表
export const collectList = [
  createItem({ id: 1, trip_id: 101, createTime: '2026-08-29 14:39', isCollected: 1 }),
  createItem({ id: 2, trip_id: 102, createTime: '2026-08-20 09:12', isCollected: 1 }),
  createItem({ id: 3, trip_id: 103, createTime: '2026-08-11 18:05', isCollected: 1 }),
]

// 历史记录列表
export const historyList = [
  createItem({ id: 1, trip_id: 201, createTime: '2026-06-01 10:20', isCollected: 0 }),
  createItem({ id: 2, trip_id: 202, createTime: '2026-05-09 16:48', isCollected: 0 }),
  createItem({ id: 3, trip_id: 203, createTime: '2026-04-25 08:30', isCollected: 0 }),
]
