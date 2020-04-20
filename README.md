# 1、three.js快速入门
## 1.1 一个简单的3D页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>一个简单的三维场景</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
  </style>
  <!--引入在线three.js三维引擎-->
  <script src="http://www.yanhuangxueyuan.com/threejs/build/three.js"></script>
</head>
<body>
  <script>
    /**
     * 创建场景对象Scene
     */
    let scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    // let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    let geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    let material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    }); //材质对象Material
    let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    /**
     * 光源设置
     */
    //点光源
    let point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    /**
     * 相机设置
     */
    let width = window.innerWidth; //窗口宽度
    let height = window.innerHeight; //窗口高度
    let k = width / height; //窗口宽高比
    let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
  </script>
</body>
</html>
```

## 1.2 旋转动画、requestAnimationFrame周期性渲染
```javascript
// 渲染函数
function render() {
    renderer.render(scene,camera);//执行渲染操作
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
```
  查看两帧之间的时间差
```javascript
// 渲染函数
let T0 = new Date();// 上次时间
function render() {
    let T1 = new Date();// 本次时间
    let t = T1-T0;// 两帧之间的时间差
    console.log(t);// 单位：ms
    T0 = T1;// 把本次时间赋值给上次时间
    renderer.render(scene,camera);// 执行渲染操作
    mesh.rotateY(0.01);// 每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);// 请求再次执行渲染函数render，渲染下一帧
}
```
## 1.3 鼠标操作三维场景旋转缩放
```html
<!-- 引入threejs扩展控件OrbitControls.js -->
<script src="../../three.js-master/examples/js/controls/OrbitControls.js"></script>
<script>
  //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
  let controls = new THREE.OrbitControls(camera);
  //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
  controls.addEventListener('change', render);
</script>
```

## 1.4 场景插入新的几何体
```javascript
/**
 * 创建网格模型
 */
// 长方体 参数：长，宽，高
let geometry = new THREE.BoxGeometry(100, 100, 100);
// 球体 参数：半径60  经纬度细分数40,40
let geometry = new THREE.SphereGeometry(60, 40, 40);
// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
let geometry = new THREE.CylinderGeometry( 50, 50, 100, 25 );
// 正八面体
let geometry = new THREE.OctahedronGeometry(50);
// 正十二面体
let geometry = new THREE.DodecahedronGeometry(50);
// 正二十面体
let geometry = new THREE.IcosahedronGeometry(50);

let material = new THREE.MeshLambertMaterial({
  color: 0x0000ff
}); // 材质对象Material
let mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
mesh.translateX(120); // 球体网格模型沿Y轴正方向平移120
mesh.position.set(120,0,0);// 设置mesh3模型对象的xyz坐标为120,0,0
scene.add(mesh); // 网格模型添加到场景中
```
## 1.5 设置材质效果
```javascript
/**
 * 创建网格模型
 */
let geometry = new THREE.SphereGeometry(60, 40, 40);
// let geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// 基础网格材质对象 不受光照影响 没有棱角感
let material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe:true,//线条模式渲染
});

// 与光照计算 漫反射 产生棱角感
let material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
});

// 与光照计算 高光效果（镜面反射）产生棱角感
let material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  specular:0x444444,
  shininess:30,
});

// 开启透明度
let material1 = new THREE.MeshLambertMaterial({
  color: 0x0000ff,// 材质颜色
  transparent:true,// 开启透明度
  opacity:0.5,//设置透明度具体值
}); //材质对象Material

let mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
scene.add(mesh); // 网格模型添加到场景中
```
## 1.6 光照效果设置
```javascript
/**
 * 光源设置
 */
//点光源
let point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); // 点光源位置
// 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
scene.add(point); // 点光源添加到场景中
// 环境光  环境光颜色与网格模型的颜色进行RGB进行乘法运算
let ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
/**
 * 相机设置
 */
let width = window.innerWidth; // 窗口宽度
let height = window.innerHeight; // 窗口高度
let k = width / height; // 窗口宽高比
let s = 150; // 三维场景显示范围控制系数，系数越大，显示的范围越大
// 创建相机对象
let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)
```
# 2、顶点概念、几何体结构 （这块项目中不常用）
## 2.1 顶点位置数据解析渲染
```javascript
/**
 * 创建网格模型
 */
let geometry = new THREE.BufferGeometry(); // 创建一个Buffer类型几何体对象
// 类型数组创建顶点数据
let vertices = new Float32Array([
  0, 0, 0, // 顶点1坐标
  50, 0, 0, // 顶点2坐标
  0, 100, 0, // 顶点3坐标
  0, 0, 10, // 顶点4坐标
  0, 0, 100, // 顶点5坐标
  50, 0, 10, // 顶点6坐标
]);
// 创建属性缓冲区对象
let attribue = new THREE.BufferAttribute(vertices, 3); // 3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;
// 三角面(网格)渲染模式
let material = new THREE.MeshBasicMaterial({
  color: 0x0000ff, // 三角面颜色
  side: THREE.DoubleSide // 两面可见
}); // 材质对象
let mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
scene.add(mesh); // 网格模型添加到场景中
```
## 2.2 顶点颜色数据插值计算
```javascript
/**
 * 创建网格模型
 */
let geometry = new THREE.BufferGeometry(); // 声明一个缓冲几何体对象

//类型数组创建顶点位置position数据
let vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  100, 100, 100, //顶点2坐标
]);
// 创建属性缓冲区对象
let attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，作为一个顶点的xyz坐标
// 设置几何体 attributes 属性的位置 position 属性
geometry.attributes.position = attribue;
// 类型数组创建顶点颜色 color 数据
let colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 0, 1, //顶点2颜色
]);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); // 3个为一组,表示一个顶点的颜色数据RGB
// 材质对象
let material = new THREE.LineBasicMaterial({
  // 使用顶点颜色数据渲染模型，不需要再定义color属性
  // color: 0xff0000,
  vertexColors: THREE.VertexColors, // 以顶点颜色为准
});
// 线条渲染模式  线模型对象Line
let line = new THREE.Line(geometry, material); // 点模型对象
scene.add(line); // 点对象添加到场景中
```
# 3. 加载外部模型
## 3.1 加载外部模型（.obj文件)
```html
  <!-- 引入obj模型加载库OBJLoader.js -->
  <script src="./three.js-master/examples/js/loaders/OBJLoader.js"></script>
```
```javascript
let loader = new THREE.OBJLoader();
loader.load(url, function (obj) {
  obj.children[0].scale.set(sca, sca, sca); // 网格模型缩放
  obj.children[0].geometry.center(); // 网格模型的几何体居中
  obj.children[0].position.set(x, y, z); // 移动模型位置
  callback(obj);
})
```
## 3.2 加载外部模型和相应的外部材质
```html
  <!-- 引入obj模型材质加载库MTLLoader.js -->
  <script src="./three.js-master/examples/js/loaders/MTLLoader.js"></script>
```
```javascript
let OBJLoader = new THREE.OBJLoader();//obj加载器
let MTLLoader = new THREE.MTLLoader();//材质文件加载器
MTLLoader.load(urlMtl, function (materials) {
  //obj的模型会和MaterialCreator包含的材质对应起来
  OBJLoader.setMaterials(materials);
  OBJLoader.load(urlObj, function (obj) {
    obj.children[0].scale.set(sca, sca, sca); // 网格模型缩放
    obj.children[0].geometry.center(); // 网格模型的几何体居中
    obj.children[0].position.set(x, y, z); // 移动模型位置
    callback(obj);
  })
})
```

# 4. 模型的点击事件
## 4.1 模型的点击事件写法
```javascript
document.addEventListener('mouseup', onDocumentMouseUp, false);
function onDocumentMouseUp(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2;
  mouse.y = -(event.clientY / window.innerHeight) * 2;
}
```
## 4.2 模型点击事件原理
### 