<template>
  <Layout>
    <!-- <template #layout-bottom>
      <SparkChatPanel />
    </template> -->
    <template #layout-bottom>
      <SparkChatPanel style="z-index: 100;" />
    </template>
  </Layout>
</template>

<script setup>
import SparkChatPanel from '../../components/SparkChatPanel.vue'
import { ref, onMounted, computed } from 'vue'
import BlogTheme from '@sugarat/theme'

const { Layout } = BlogTheme
</script>

<style>
/* 确保聊天面板不会覆盖主要内容 */
.vp-doc {
  margin-right: 50px; /* 为切换按钮留出空间 */
}
</style>