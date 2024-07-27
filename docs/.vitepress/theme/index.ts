// import BlogTheme from '@sugarat/theme'

// // 自定义样式重载
// import './style.scss'

// // 自定义主题色
// // import './user-theme.css'

// export default BlogTheme

// .vitepress/theme/index.js
import BlogTheme from '@sugarat/theme'
import MyLayout from './HomeLayout.vue'

import './style.scss'

export default {
  extends: BlogTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout: MyLayout
}