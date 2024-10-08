// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  friend: [
    {
      nickname: '今天吃什么',
      des: '工作餐避坑',
      avatar:
        '/logo.png',
      url: 'https://notion.fcnote.com'
    },
    {
      nickname: '粥里有勺糖',
      des: '你的指尖,拥有改变世界的力量',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top'
    },
  ],
  darkTransition: true,
  comment: {
    repo: 'fan0607/chengziDiary',
    repoId: 'R_kgDOMYy8Xw',
    category: 'Announcements',
    categoryId: 'DIC_kwDOMYy8X84ChKUa',
    inputPosition: 'top',
  },
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // markdown 图表支持（会增加一定的构建耗时）
  // mermaid: true

  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: 'MIT License | 橙子',
    // icpRecord: {
    //   name: '蜀ICP备19011724号',
    //   link: 'https://beian.miit.gov.cn/'
    // },
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },

  // 主题色修改
  // themeColor: 'el-blue',
  themeColor: 'el-blue',

  // 文章默认作者
  author: '橙子',

  // 公告
  popover: {
    title: '公告',
    body: [
      { type: 'text', content: '👇 微信 👇' },
      {
        type: 'image',
        src: '/qrcode.png'
      },
      {
        type: 'text',
        content: '欢迎大家交流'
      }
    ],
    duration: 60
  },
})

export { blogTheme }
