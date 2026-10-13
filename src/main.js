import { createApp } from 'vue'
// import './style.css'

// Vant 函数式组件样式（Toast、Dialog、Notify、ImagePreview）
// 这些组件通过 JS 调用，无法被自动按需引入识别，需手动引入样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

import {Tabbar,TabbarItem,NavBar,NoticeBar,Field,Popup,Picker,Button,Grid, GridItem,Loading,Empty,Collapse, CollapseItem,Cell,CellGroup,Tab} from 'vant'
import 'vant/es/tabbar/style'
import 'vant/es/tabbar-item/style'
import 'vant/es/notice-bar/style'
import 'vant/es/field/style'
import 'vant/es/popup/style'
import 'vant/es/picker/style'
import 'vant/es/button/style'
import 'vant/es/grid/style'
import 'vant/es/grid-item/style'
import 'vant/es/loading/style'
import 'vant/es/empty/style'
import 'vant/es/collapse/style'
import 'vant/es/collapse-item/style'  
import 'vant/es/cell/style'
import 'vant/es/cell-group/style'
import 'vant/es/tab/style'

import App from './App.vue'
import router from './router'

createApp(App)
.use(router)
.use(Tabbar)
.use(TabbarItem)
.use(NavBar)
.use(NoticeBar)
.use(Field)
.use(Popup)
.use(Picker)
.use(Button)
.use(Grid)
.use(GridItem)
.use(Loading)
.use(Empty)
.use(Collapse)
.use(CollapseItem)
.use(Cell)
.use(CellGroup)
.use(Tab)
.mount('#app')
