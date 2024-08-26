在贴图的时候，遇到图片被拉伸了怎么办
![](../../public/Pasted%20image%2020240820100150.png)
![](../../public/Pasted%20image%2020240820100808.png)
最简单的方法是设置材质的repeat属性
```js
material = new Cesium.Material({

	fabric: {
	
	  type: "Image",
	
	  uniforms: {
	
		image: texture,
	
		repeat: new Cesium.Cartesian2(1.0, 4.0),
	
	  },
	
	},

});
```
第二简单的方法适合所有情况，只需要source里计算一下`st.x`即可
```js
material = new Cesium.Material({

	fabric: {
	
	  type: "FlowingTexture",
	
	  uniforms: {
	
		flowSpeed: 0.1,
	
		flowDirection: options.flowDirection,
	
		image: texture,
	
		aspectRatio: .25,
	
	  },
	
	  source: `
	
		uniform float flowSpeed;
	
		uniform vec2 flowDirection;
	
		uniform float aspectRatio;
	
		uniform sampler2D image;
	
		czm_material czm_getMaterial(czm_materialInput materialInput)
	
		{
	
			czm_material material = czm_getDefaultMaterial(materialInput);
	
			float time = czm_frameNumber * 0.1 * flowSpeed;
	
			vec2 st = materialInput.st;
	
			st.x = st.x * aspectRatio;
	
			vec2 offset = flowDirection * time;
	
			vec4 color = texture2D(image, fract(st + offset));
	
			material.diffuse = color.rgb;
	
			material.alpha = color.a;
	
			return material;
	
		}
	
	  `,
	
	},

});
```
无论第一种的repeat还是第二种的aspectRatio，其实他们的本质都是计算长宽比，从而对贴图进行拉伸
