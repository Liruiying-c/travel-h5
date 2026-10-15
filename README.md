# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

1. 浏览器本地存储用户信息不存储密码，只存储用户名和手机号和登录时间
- 前端把**账号+密码**传给后端，后端验证成功后，返回`token`
- 前端把`token`存储到浏览器本地存储`localStorage`中
- 后续请求都把`token`作为请求头传递给后端
- 后端验证`token`是否有效，有效则返回数据，无效则返回错误信息
