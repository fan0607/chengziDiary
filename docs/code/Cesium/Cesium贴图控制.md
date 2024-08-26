---
comment: true
data: 2024-07-31
tags:
  - webgl
  - shader
  - cesium
sticky: 1
---
# Cesium贴图控制

Cesium 的 primitives 在贴图时，图片容易被拉伸导致贴图不美观，解决方法也很简单——计算元素的**宽高比**，通过宽高比控制贴图的重复次数(`repeat`)

这是一句代码的事情，没有可讲的地方，具体可以参考以下思路
::: details
```js
const xyRatio = distance / height;// Highlighted
const appearance = new Cesium.MaterialAppearance({
  material: new Cesium.Material({
    fabric: {
      type: "DiffuseMap",

      uniforms: {
        image: image,

        x: xyRatio,// Highlighted

        y: 1.0,// Highlighted
      },
    }
    ......

```
:::

在material中有`repeat`可以轻易实现自适应贴图

但这里我们自己用shader实现一遍，练练手

思路非常简单：
- 加载纹理
- 在着色器中获取纹理
- 根据`uniforms`中的`x`和`y`参数控制`materialInput.st`的数值

有时间推荐自己先写一遍，顶点着色器和片元着色器**都**可以做到
:::details
```c
const appearance = new Cesium.MaterialAppearance({

	material: new Cesium.Material({
	
	  fabric: {
	
	    type: "DiffuseMap",
	
	    uniforms: {
	
		  image: image,
	
		  x: xyRatio,
	
		  y: 1.0,
	
	  },
	
	  source: `
	
		  uniform sampler2D image;

		  uniform float x;

		  uniform float y;

		  czm_material czm_getMaterial(czm_materialInput materialInput)

		  {

			czm_material material = czm_getDefaultMaterial(materialInput);

			materialInput.st = vec2(materialInput.st.x * x, materialInput.st.y * y);

			vec2 st = fract(materialInput.st);

			vec4 colorImage = texture2D(image, st);

			material.diffuse = colorImage.rgb;

			material.alpha = colorImage.a;

			return material;

		  }`,
	 }}),
	
	  vertexShaderSource: `

		attribute vec3 position3DHigh;
	
		attribute vec3 position3DLow;
	
		attribute float batchId;
	
		attribute vec2 st;
	
		attribute vec3 normal;
	
		varying vec2 v_st;
	
		varying vec3 v_positionEC;
	
		varying vec3 v_normalEC;
	
		void main() {
	
			vec4 p = czm_computePosition();
	
			v_st = vec2(st.x, st.y);
	
			gl_Position = czm_modelViewProjectionRelativeToEye * p;
	
		}`,

	  renderState: {

		depthTest: {

		  enabled: true,

		},

		depthMask: true,

	  },

            });
```
:::