---
comment: true
categories:
   - 笔记
   - AI
   - obsidian
   - 教程
sticky: 1
---
# obsidian接入AI模型或服务
>[!note]
>obsidian和AI融合得很好的方案

:::tip
最好的教程在[官方仓库](https://github.com/brianpetro/obsidian-smart-connections)
:::

这是一篇**使用插件`Smart connection`接入AI模型到笔记仓库**的流程分享。

## 1. 准备工作
插件是自带模型的，如果你只是需要一个管理笔记、检索资料的助手，那推荐你使用本地模型，无需准备其他api。

但如果你想要使用`ChatGPT`、`claude`、`gemini`之类的，那你需要准备一个对应的服务api
## 2. 安装插件
方法一：插件市场安装
![](../public/Pasted%20image%2020240725204008.png)
方法二：直接从github下载解压到仓库的插件目录(.obsidian/plugins)
:::tip
如果找不到`.obsidian`文件夹，记得在文件资源管理器的查看中勾选`隐藏的项目`
:::
![](../public/Pasted%20image%2020240725211209.png)
## 3. 配置
:::tip
首次使用建议保持默认配置，但如下几个地方需要注意
:::
### 1. api
- 如果你买的是官方的api，直接根据官方文档填写即可
- 我用的是类似于`Open AI`格式的api
	- `Model Name`写的是`claude-3-5-sonnet-20240620`
	- 其他的如`protocol`等选项默认给出了很详细的提示，就不赘述了

### 2. exclusion
- 有一个很方便的按钮，可以一键添加顶级目录，然后去找到你想要的目录删除即可
![](../public/Pasted%20image%2020240725205114.png)

### 3. System Prompts Folder
- 保存你的`prompts`的地方，使用时只需要@对应的文件

## 4. 使用Chat
`Files`的功能适合自己探索，简单说一下`Chat`的使用

三个默认展示的指令
- `Based on my notes`
- `Summarize [[this note]]`
- `Important tasks in /folder/`

使用prompts

- `@prompts`

## 5. 对比展示
先展示接入`claude 3.5 Sonnet`的效果
我拿官网的回答和`obsidian`接入api放在一起，方便对比
（让人犹豫下个月是否继续订阅pro的回答质量）

![](../public/Pasted%20image%2020240725173131.png)
官网对话
![](../public/Pasted%20image%2020240725174719.png)
自己的ob
## 6. 探索高级AI集成  
对于更高级的用户可以：
- 考虑将Dataview插件与AI服务结合使用
- 尝试使用自定义脚本来自动化AI辅助任务
- 探索与特定领域专门AI模型的集成

>一定要记得限制一下输入token...
>
>已老实...

![](../public/Pasted%20image%2020240725175120.png)