# 智能旅游助手 H5（travel-h5）

基于 Vue 3 的移动端智能旅游规划应用。用户输入目的地、预算和天数，即可由 AI 生成详细的每日行程（含景点介绍、门票、交通建议、预算明细与出行提示）；同时内置 AI 旅游咨询对话，支持流式响应与 Markdown 渲染。

## 功能特性

- **智能行程规划**：输入城市 / 预算 / 天数，一键生成行程方案
  - 每日行程按上午 / 下午 / 晚上分时段展示，折叠面板可展开收起
  - 预算明细表（住宿、餐饮、交通、门票、其他）
  - 温馨提示与注意事项
  - 行程收藏
- **AI 旅游咨询**
  - 流式响应，AI 回复逐字呈现
  - Markdown 实时渲染（标题、列表、加粗、表格等）
  - 登录后自动拉取历史对话，新对话按"轮"保存至后端
- **个人中心**
  - 登录 / 退出登录 / 切换账号，手机号脱敏展示
  - 我的收藏、历史记录（列表页复用同一组件：搜索、删除、新增）
  - 用户设置、关于我们
- **登录鉴权**
  - 浏览器本地存储用户信息（用户名、手机号、登录时间），不存储密码
  - 前端将账号 + 密码传给后端，验证成功后返回 `token`
  - 后端设置 `Set-Cookie` ，浏览器自动保存 + 自动携带
  - 未登录状态下，规划 / 对话 / 收藏等入口会引导至登录页

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Vue 3（`<script setup>`） |
| 构建 | Vite |
| 路由 | Vue Router 4（路由懒加载） |
| UI 组件库 | Vant 4（`unplugin-vue-components` 自动按需引入） |
| HTTP | Axios（二次封装：拦截器 / 流式 fetch 封装） |
| Markdown | marked |
| 状态管理 | Vue reactive 单例 store + localStorage 持久化 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务
npm run dev

# 构建生产包
npm run build

# 本地预览构建产物
npm run preview
```

开发环境下 `/api` 请求经 Vite 代理转发到后端（见 `vite.config.js`），后端地址可按需修改。

## 目录结构

```
src/
├── views/                # 页面
│   ├── Home.vue          # 首页：规划表单、快捷入口、热门目的地
│   ├── Detail.vue        # 行程详情：按来源分发（首页推荐 / 历史 / 收藏）
│   ├── Chat.vue          # AI 对话：流式响应、历史记录
│   ├── Profile.vue       # 个人中心
│   ├── Login.vue         # 登录
│   ├── MyCollect.vue     # 我的收藏
│   ├── HistorySearch.vue # 历史记录
│   ├── UserSetting.vue   # 用户设置
│   └── AboutUs.vue       # 关于我们
├── components/
│   ├── TripList.vue      # 收藏 / 历史共用的列表组件（搜索、删除、新增）
│   ├── ChatBubble.vue    # 聊天气泡（AI 消息 Markdown 渲染）
│   ├── SpotItem.vue      # 行程中的景点条目
│   └── BudgetTable.vue   # 预算明细表
├── store/
│   └── user.js           # 全局登录态（reactive 单例 + localStorage）
├── utils/
│   └── request.js        # Axios 二次封装 + 流式请求封装
├── router/
│   └── index.js          # 路由（懒加载）
└── mock/
    └── tripList.js       # 列表页临时静态数据
```

## 关键实现

**Axios 二次封装**：统一 baseURL、请求 / 响应拦截器；另封装基于 `fetch` 的流式读取方法，用于 AI 对话的 SSE 场景，逐 chunk 回调更新 UI。

**Vant 自动按需引入**：`unplugin-vue-components` + `@vant/auto-import-resolver`，模板中直接使用组件即可，样式与组件按需打包，无需手动 import。

**全局登录态**：以 ES 模块单例的 `reactive` store 维护登录信息，与 `localStorage` 双向同步；登录后各页面即时响应，刷新不丢失。

**详情页来源分发**：`Detail.vue` 依据路由 `from` 参数区分来源——来自首页则调用推荐接口生成新行程，来自历史记录 / 我的收藏则按记录 id 查询已保存的行程，同一模板渲染。

**列表页组件化**：`TripList.vue` 通过 props 注入标题、数据源与删除回调，我的收藏与历史记录两个页面仅差一行数据源，搜索按城市过滤、删除带二次确认。

## 后端

本仓库为前端部分，需搭配后端服务使用（行程推荐、AI 流式对话、聊天记录、收藏 / 历史等接口）。

## License

MIT
