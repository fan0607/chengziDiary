---
title: 自定义shader
publish: true
---

---
```js
//自定义特效 Shader

  let fragmentShader = `

//fract(czm_frameNumber / 120.0)表示每120帧一个周期，fract(x) 函数用来获取数字 x 的小数部分，即 x - floor(x)。

//应用 fract() 到 czm_frameNumber / 120.0 上，可以得到一个在0到1之间循环变化的值。每当帧数达到120的倍数时，这个值重置为0，形成周期性重置的效果。

//3.14159265 是圆周率π的近似值，π * 2 是一个完整圆周的弧度数。

//通过将 fract() 的结果乘以 2π，stc_pl 的取值范围变为从0到 2π。这正好对应于一整个正弦周期，即从0度到360度的变化。

  

float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;

//stc_pl 是一个从0到 2π（0到360度）循环变化的周期性变量，由前面的代码计算得出。

//sin(stc_pl) 则是基于这个周期变量计算出的正弦值，其结果在-1到1之间波动。

//正弦函数的结果乘以0.1是为了减小其影响力，将波动的幅度限制在-0.1到0.1之间。

//这样做可以确保正弦波动对整体结果的影响是温和的，避免过度影响最终的视觉效果。

//将高度的归一化值和调整后的正弦波动值相加，这样高度和时间因素共同影响最终的变量 stc_sd。

//通过这种方式，顶点的颜色或亮度不仅反映其高度信息，还融入了时间的动态变化，从而使得效果更加生动和有趣。

float stc_sd = v_stcVertex.z / 6.0 + sin(stc_pl) * 0.1; // 调整归一化范围到6米

//这里创建了一个新的四元素向量。前三个元素都是 stc_sd，意味着红色、绿色和蓝色通道都将使用同一数值 stc_sd，这通常用来控制亮度或灰度级别。

//第四个元素设为1.0，表示完全不透明。

//乘法操作符 *= 是用来将 gl_FragColor 的现有颜色与新向量进行按元素乘法。这意味着 gl_FragColor 的每个颜色通道（RGB）都会被 stc_sd 缩放。

//如果 stc_sd 小于1，这将导致颜色通道变暗；如果 stc_sd 大于1（虽然这里的逻辑似乎保证不会），颜色会变亮。如果 stc_sd 接近0，颜色可能接近黑色。

gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);

  

float stc_a13 = fract(czm_frameNumber / 360.0);

float stc_h = clamp(v_stcVertex.z / 6.0, 0.0, 1.0); // 调整归一化范围到6米

stc_a13 = abs(stc_a13 - 0.5) * 2.0;

float stc_diff = step(0.02, abs(stc_h - stc_a13));//0.005

gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff) * 6.0;//6.0是调整亮度的倍数

  

// 动态颜色变化

float time = czm_frameNumber / 60.0;

float red = abs(sin(time)) * 0.5 + 0.5;

float green = abs(sin(time + 2.0)) * 0.5 + 0.5;

float blue = abs(sin(time + 4.0)) * 0.5 + 0.5;

vec3 dynamicColor = vec3(red, green, blue);

  

gl_FragColor.rgb *= dynamicColor;

  

// 直接计算噪声，并减小噪声强度

vec2 st = v_stcVertex.xy / 50.0;

float noise = fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);

gl_FragColor.rgb += vec3(noise) * 0.1; // 调整噪声强度为原来的10%

  

// 高度渐变

vec3 heightGradient = vec3(v_stcVertex.z / 6.0, 0.0, 1.0 - v_stcVertex.z / 6.0); // 调整归一化范围到6米

gl_FragColor.rgb = mix(gl_FragColor.rgb, heightGradient, 0.5);

    `;

  //模型

  let tileset = kcgis3d.layer.createLayer(viewer, {

    type: "3dtiles",

    name: "站点",

    // url: serverURL_3dtiles + "/jzw-shanghai/tileset.json", //定义在 config\marsUrl.js

    url: "https://kc3.kcgis.cn:30013/kcgis/services/gaspipe3/ThreeDTileServer/tileset.json",

    maximumScreenSpaceError: 8,

    maximumMemoryUsage: 1024,

    // marsJzwStyle: true,    //打开建筑物特效（内置Shader代码）

    marsJzwStyle: fragmentShader, //字符串值时，表示使用该字符串定义的自定义Shader

    /* style: {

      color: {

        conditions: [

          ["true", tilesetColor], //设置建筑物颜色

        ],

      },

    }, */

    luminanceAtZenith: 0.2,

    bloom: true,

    offset: {

      x: center[0],

      y: center[1],

      z: center[2]-5,

      transform: true,

    },

    showClickFeature: true,

    popup: "all",

    visible: true,

    clampToGround: true,

  });
```
![](Pasted%20image%2020240611181542%202.png)