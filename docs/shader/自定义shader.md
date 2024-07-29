---
comment: true
tags:
  - cesium
  - shader
  - webgl
sticky: 1
---

# Cesium中自定义shader


## 前言
cesium中想要实现一些炫酷的特效,一定会用到`shader`，但国内cesium的shader比较少，我会从**最基础的内容**入手，展示如何实现一个如图效果的`shader`。

**不涉及高级的函数，不涉及造型，也不涉及光照。**


:::tip 准备
要准备的东西仅仅只有任意的一个3dtiles模型，以及你的电脑和键盘。
:::
如何搭建cesium环境不在这里赘述，文章最后会给出完整的代码。
![](/Pasted%20image%2020240611181542%202.png)
## 加载3dtiles
### 关键代码
:::code-group
```js
  //模型
let viewer = new Cesium.Viewer('cesiumContainer');
let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: '你的3D Tiles数据的URL'
}));
tileset.tileLoad.addEventListener(function(tile) {
    let content = tile.content;
    let featuresLength = content.featuresLength;
    for (let i = 0; i < featuresLength; i++) {
        let feature = content.getFeature(i);
        feature.customShader = new Cesium.CustomShader({
            vertexShaderText: '你的顶点着色器代码',
            fragmentShaderText: '你的片元着色器代码'
        });
    }
});

```
:::

## 编写shader
### 前置知识
- cesium内置变量`czm_frameNumber`表示帧数，可以代表时间变化
- fract(x)，获取x小数部分，可以视作`x - floor(x)`
- 3.14159265 是圆周率π的近似值，π * 2 是一个完整圆周的弧度数。

### 具体实现
- 随时间变化的呼吸灯特效
- 随时间上下移动的亮光波动
- 动态颜色变化
- 随高度变化的颜色
- 噪声
#### 随时间变化的呼吸灯特效
```c
float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
float stc_sd = v_stcVertex.z / 6.0 + sin(stc_pl) * 0.1;
gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);
```
- **stc_pl**：`czm_frameNumber`表示帧数，因此`czm_frameNumber / 120.0`表示每120帧会得到一次整数，那么`fract(czm_frameNumber / 120.0)`就是以120帧为周期的从0到1的连续变化值，该值乘以2π表示从0到2π。
- **stc_sd**：`v_stcVertex`是顶点的高度，z分量除以6.0代表将高度最多为6.0的模型进行归一化。sin(stc_pl)为-1到1周期变化的正弦函数，乘以0.1后减轻其影响力，这样做可以确保正弦波动对整体结果的影响是温和的，避免过度影响最终的视觉效果，将高度的归一化值和调整后的正弦波动值相加，得到高度和时间因素共同影响的最终的变量 stc_sd。
- `gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);`注意前三个分量相同，这意味着红色、绿色和蓝色通道都将使用同一数值 stc_sd，通常用来控制亮度或灰度级别
呼吸灯的特效就完成了。根据设备的屏幕帧数，相当于获取了时间的周期变化，整个shader会进行明暗的变化。
#### 随时间上下移动的亮光波动
```c
//自定义特效 Shader
float stc_a13 = fract(czm_frameNumber / 360.0);

float stc_h = clamp(v_stcVertex.z / 6.0, 0.0, 1.0); // 调整归一化范围到6米

stc_a13 = abs(stc_a13 - 0.5) * 2.0;

float stc_diff = step(0.02, abs(stc_h - stc_a13));//0.005

gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff) * 6.0;//6.0是调整亮度的倍数
```
#### 动态颜色变化
```c
  
// 动态颜色变化

float time = czm_frameNumber / 60.0;

float red = abs(sin(time)) * 0.5 + 0.5;

float green = abs(sin(time + 2.0)) * 0.5 + 0.5;

float blue = abs(sin(time + 4.0)) * 0.5 + 0.5;

vec3 dynamicColor = vec3(red, green, blue);

  

gl_FragColor.rgb *= dynamicColor;

  
```
#### 直接计算噪声，并减小噪声强度
```c
// 直接计算噪声，并减小噪声强度

vec2 st = v_stcVertex.xy / 50.0;

float noise = fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);

gl_FragColor.rgb += vec3(noise) * 0.1; // 调整噪声强度为原来的10%

  
```
#### 高度渐变
```c
// 高度渐变

vec3 heightGradient = vec3(v_stcVertex.z / 6.0, 0.0, 1.0 - v_stcVertex.z / 6.0); // 调整归一化范围到6米

gl_FragColor.rgb = mix(gl_FragColor.rgb, heightGradient, 0.5);
```