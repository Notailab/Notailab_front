<template>
  <!-- 路由出口：所有页面都会渲染到这个标签里 -->
  <router-view />
</template>

<script setup>
// 这里暂时空着，后续可加全局逻辑（比如全局变量）
</script>

<style>
/* 全局样式：给整个页面加基础样式，避免白屏 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #f5f5f5; /* 浅灰色背景，避免全白 */
  font-family: "Microsoft Yahei", sans-serif;
}
</style>
