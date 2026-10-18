import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import MyCollect from '../views/MyCollect.vue'
import UserSetting from '../views/UserSetting.vue'
import HistorySearch from '../views/HistorySearch.vue'
import AboutUs from '../views/AboutUs.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/mycollect',
    name: 'MyCollect',
    component: MyCollect,
  },
  {
    path: '/usersetting',
    name: 'UserSetting',
    component: UserSetting,
  },
  {
    path: '/history',
    name: 'HistorySearch',
    component: HistorySearch,
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
