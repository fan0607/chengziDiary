<script setup>
import BlogTheme from '@sugarat/theme'
import ThreeScene from './ThreeScene.vue'

const { Layout } = BlogTheme
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <div id="custom-content">
        <ThreeScene />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
#custom-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#custom-content h1 {
  color: white;
  margin-bottom: 20px;
}
</style>