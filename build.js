/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
var moveWind, paifeng,moveWind2,paifeng2;
/**
 * 创建一个路面
 */
var geometry = new THREE.BoxGeometry(154, 700,0.1);
// 加载路面纹理贴图
var texture = new THREE.TextureLoader().load("./assets/road.png");
// texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
var material = new THREE.MeshLambertMaterial({
  map:texture,
});
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
mesh.position.set(120,0,-50);
scene.add(mesh); //网格模型添加到场景中
mesh.rotateX(-Math.PI/2); 
// 隧道路面下方块
var roadDown = new THREE.BoxGeometry(154, 700,2);
var roadDownMater = new THREE.MeshLambertMaterial({
  color:0x59c4fe
});
var roadDownMesh = new THREE.Mesh(roadDown,roadDownMater);
roadDownMesh.rotateX(Math.PI/2);
roadDownMesh.position.set(120,-1,-50);
scene.add(roadDownMesh);

// 添加第二个车道
var mesh2 = mesh.clone();
mesh2.position.set(-80,0,-200)
scene.add(mesh2)
var roadDownMesh2 = roadDownMesh.clone();
roadDownMesh2.position.set(-80,-1,-200);
scene.add(roadDownMesh2);

// 添加配电房地面
var pdfGeometry = new THREE.BoxGeometry(60, 180,0.1); //矩形平面
var pdfMaterial = new THREE.MeshLambertMaterial({
  color:0x3c3c3d
})
var pdfMesh = new THREE.Mesh(pdfGeometry, pdfMaterial); //网格模型对象Mesh
pdfMesh.position.set(-190,-1,190)
scene.add(pdfMesh); //网格模型添加到场景中
pdfMesh.rotateX(-Math.PI/2);
var pdfDown = new THREE.BoxGeometry(60, 180,2); //矩形平面
// 加载草地纹理贴图
var pdfMaterialDown = new THREE.MeshLambertMaterial({
  color:0x59c4fe
})
var pdfMeshDown = new THREE.Mesh(pdfDown, pdfMaterialDown); //网格模型对象Mesh
pdfMeshDown.position.set(-190,-2,190)
scene.add(pdfMeshDown); //网格模型添加到场景中
pdfMeshDown.rotateX(-Math.PI/2);

/**
 * OBJ文件加载  只加载obj文件中的几何信息，不加载材质文件.mtl
 */
var loader = new THREE.OBJLoader();
// 创建摄像头组
var cameraGroup = new THREE.Group();
// 加载隧道墙体模型
addModels('./tunnelModel/tunnelWall.obj',120,36,-50,0.03,function(obj){
  obj.children[0].scale.set(0.03,0.03,0.045);
  var tunnelWallTextLoad = new THREE.TextureLoader();
  tunnelWallTextLoad.load('./assets/suidao.jpg',function(tunnelImg){
    obj.children[0].material.map = tunnelImg;
    scene.add(obj);
  })
});
addModels('./tunnelModel/tunnelWall.obj',-80,36,-200,0.03,function(obj){
  obj.children[0].scale.set(0.03,0.03,0.045);
  var tunnelWallTextLoad = new THREE.TextureLoader();
  tunnelWallTextLoad.load('./assets/suidao.jpg',function(tunnelImg){
    obj.children[0].material.map = tunnelImg;
    scene.add(obj); // 将隧道墙体模型添加到场景中
  })
});
// 加载摄风向风速仪模型
addModels('./tunnelModel/anemometer.obj',170,3,195,0.015,function(obj){
  scene.add(obj);
  moveWind = obj;
});
addModels('./tunnelModel/anemometer.obj',-130,3,-435,0.015,function(obj){
  scene.add(obj); // 将排风模型添加到场景中
  moveWind2 = obj;
});
// 加载排风模型
addMTLModels('./tunnelModel/exhaust.mtl','./tunnelModel/exhaust.obj',120,45,-50,0.1,function(obj){
  scene.add(obj);
  paifeng = obj;
});
addMTLModels('./tunnelModel/exhaust.mtl','./tunnelModel/exhaust.obj',-80,45,-200,0.1,function(obj){
  scene.add(obj); // 将排风模型添加到场景中
  paifeng2 = obj;
});
// 加载方形摄像头模型
addModels('./tunnelModel/camera.obj',145,55,135,0.2,function(obj){
  scene.add(obj);
});
addModels('./tunnelModel/camera.obj',145,55,-250,0.2,function(obj){
  scene.add(obj);
});
addModels('./tunnelModel/camera.obj',95,55,135,0.2,function(obj){
  scene.add(obj);
});
addModels('./tunnelModel/camera.obj',95,55,-250,0.2,function(obj){
  scene.add(obj);
});
// 加载方形摄像头模型(旋转180度)
addModels('./tunnelModel/camera.obj',-55,55,15,0.2,function(obj){
  scene.add(obj);
  obj.children[0].rotateY(Math.PI)
});
addModels('./tunnelModel/camera.obj',-55,55,-400,0.2,function(obj){
  scene.add(obj);
  obj.children[0].rotateY(Math.PI)
});
addModels('./tunnelModel/camera.obj',-105,55,15,0.2,function(obj){
  scene.add(obj);
  obj.children[0].rotateY(Math.PI)
});
addModels('./tunnelModel/camera.obj',-105,55,-400,0.2,function(obj){
  scene.add(obj);
  obj.children[0].rotateY(Math.PI)
});
// 加载维护对讲摄像头模型
addMTLModels('./tunnelModel/intercomMaintenanceCamera.mtl','./tunnelModel/intercomMaintenanceCamera.obj',120,52,20,0.25,function(obj){
  obj.children[0].rotateX(Math.PI)
  obj.children[0].rotateY(Math.PI)
  scene.add(obj);
});
addMTLModels('./tunnelModel/intercomMaintenanceCamera.mtl','./tunnelModel/intercomMaintenanceCamera.obj',-80,52,-370,0.25,function(obj){
  obj.children[0].rotateX(Math.PI)
  obj.children[0].rotateY(Math.PI)
  scene.add(obj);
});
// 加载covi监测模型
addMTLModels('./tunnelModel/coviMonitor.mtl','./tunnelModel/coviMonitor.obj',120,57,0,0.05,function(obj){
  obj.children[0].rotateY(Math.PI)
  scene.add(obj);
});
addMTLModels('./tunnelModel/coviMonitor.mtl','./tunnelModel/coviMonitor.obj',-80,57,-350,0.05,function(obj){
  scene.add(obj);
});
// 将消防设备添加到场景中
addMTLModels('./tunnelModel/fireEquipment.mtl','./tunnelModel/fireEquipment.obj',35,10,10,0.2,function(obj){
  obj.children[0].rotateY(-Math.PI/2);
  var xfLoad = new THREE.TextureLoader();
  xfLoad.load('./assets/red.jpg',function(redImg){
    obj.children[0].material.map = redImg;
    scene.add(obj);
  })
});
addMTLModels('./tunnelModel/fireEquipment.mtl','./tunnelModel/fireEquipment.obj',5,10,-215,0.2,function(obj){
  obj.children[0].rotateY(Math.PI/2);
  var xfLoad = new THREE.TextureLoader();
  xfLoad.load('./assets/red.jpg',function(redImg){
    obj.children[0].material.map = redImg;
    scene.add(obj);
  });
});
// 加载模型方法
function addModels (url,x,y,z,sca,callback) {
  var loader = new THREE.OBJLoader();
  loader.load(url,function(obj){
    obj.children[0].scale.set(sca,sca,sca); // 网格模型缩放
    obj.children[0].geometry.center(); // 网格模型的几何体居中
    obj.children[0].position.set(x,y,z); // 移动模型位置
    callback(obj);
  })
}
// 加载带有材质的模型方法
function addMTLModels (urlMtl,urlObj,x,y,z,sca,callback) {
  var OBJLoader = new THREE.OBJLoader();//obj加载器
  var MTLLoader = new THREE.MTLLoader();//材质文件加载器
  MTLLoader.load(urlMtl, function(materials) {
    //obj的模型会和MaterialCreator包含的材质对应起来
    OBJLoader.setMaterials(materials);
    OBJLoader.load(urlObj, function(obj) {
      obj.children[0].scale.set(sca,sca,sca); // 网格模型缩放
      obj.children[0].geometry.center(); // 网格模型的几何体居中
      obj.children[0].position.set(x,y,z); // 移动模型位置
      callback(obj);
    })
  })
}
// 画线路到场景中
var cyline = new THREE.CylinderGeometry(0.8, 0.8 ,300 ,10 ,5);
var cylineMater = new THREE.MeshLambertMaterial({
  color:0xf0c69a
});
var cylineMesh = new THREE.Mesh(cyline,cylineMater);
cylineMesh.position.set(20,-1,-48.8);
cylineMesh.rotateX(Math.PI/2);
scene.add(cylineMesh);
var cyline2 = cylineMesh.clone();
cyline2.rotateZ(Math.PI/2);
cyline2.scale.set(1,0.66,1)
cyline2.position.set(-79,-1,100.5);
scene.add(cyline2);
var cyline3 = cylineMesh.clone();
cyline3.scale.set(1,0.09,1)
cyline3.position.set(-178.5,-1,113.8);
scene.add(cyline3);
var rightLine = cyline2.clone();
rightLine.position.set(33,-1,20);
rightLine.scale.set(1,0.09,1);
scene.add(rightLine);
var leftLine = rightLine.clone();
leftLine.position.set(7.6,-1,-198.2);
leftLine.scale.set(1,0.09,1);
scene.add(leftLine);
// 配电房的墙
var wall1 = new THREE.BoxGeometry(50,58,1);
var wallMaterial = new THREE.MeshLambertMaterial({
  color:0x3c4860,
  transparent:true,//开启透明度
  opacity:0.6,//设置透明度具体值
});
var wallMesh1 = new THREE.Mesh(wall1,wallMaterial);
wallMesh1.position.set(-190,28,110.6);
scene.add(wallMesh1);
var wallMesh2 = wallMesh1.clone();
wallMesh2.scale.set(3.2,1,1);
wallMesh2.position.set(-215,28,190);
wallMesh2.rotateY(Math.PI/2);
scene.add(wallMesh2);
var wallMesh3 = wallMesh2.clone();
wallMesh3.scale.set(2,1,1);
wallMesh3.position.set(-165.5,28,160);
scene.add(wallMesh3);
var wallMesh4 = wallMesh2.clone();
wallMesh4.scale.set(0.3,1,1);
wallMesh4.position.set(-165.5,28,263);
scene.add(wallMesh4);
var wallMesh5 = wallMesh1.clone();
wallMesh5.scale.set(1,1,1);
wallMesh5.position.set(-190,28,270);
scene.add(wallMesh5);
// 墙角电柜
addModels('./tunnelModel/cabinet.obj',-175,23,120,0.2,function(obj){
  scene.add(obj);
});
addModels('./tunnelModel/cabinet.obj',-192,18,118,0.2,function(obj){
  scene.add(obj);
  obj.children[0].scale.set(0.16,0.16,0.16);
});
// 中间电柜
addModels('./tunnelModel/cabinet.obj',-190,17,195,0.2,function(obj){
  scene.add(obj);
  obj.children[0].scale.set(0.15,0.15,0.15);
});
addModels('./tunnelModel/cabinet.obj',-190,14,182,0.2,function(obj){
  obj.children[0].scale.set(0.12,0.12,0.12);
  scene.add(obj);
});
// 中间标准柜
addModels('./tunnelModel/cabinet.obj',-190,21,212,0.2,function(obj){
  scene.add(obj);
});
addModels('./tunnelModel/cabinet.obj',-190,21,232,0.2,function(obj){
  scene.add(obj);
});
addModels('./tunnelModel/cabinet.obj',-190,21,252,0.2,function(obj){
  scene.add(obj);
});
var eleGeo = new THREE.BoxGeometry(13,29,20);
var eleMaterial = new THREE.MeshLambertMaterial({
  color:0xD0D2D3,
});
var eleMesh = new THREE.Mesh(eleGeo,eleMaterial);
eleMesh.position.set(-190,14,165);
scene.add(eleMesh);
// // 墙上电柜(从左往右)
// var wallEle0 = eleMesh.clone();
// wallEle0.position.set(-211,34,168);
// wallEle0.scale.set(0.5,0.6,0.6);
// scene.add(wallEle0);
// var wallEle = eleMesh.clone();
// wallEle.position.set(-211,32,146);
// wallEle.scale.set(0.5,0.5,0.5);
// scene.add(wallEle);
// var wallEle2 = wallEle.clone();
// wallEle2.position.set(-212,35,135);
// wallEle2.scale.set(0.3,0.3,0.3);
// scene.add(wallEle2);
// var wallEle3 = wallEle.clone();
// wallEle3.position.set(-212,35,124);
// wallEle3.scale.set(0.3,0.3,0.3);
// scene.add(wallEle3);
// // 墙上电柜下方(从左往右)
// var wallEle3 = wallEle.clone();
// wallEle3.position.set(-212.8,25,124);
// wallEle3.scale.set(0.2,0.2,0.2);
// scene.add(wallEle3);
// var wallEle4 = wallEle.clone();
// wallEle4.position.set(-212.8,25,134);
// wallEle4.scale.set(0.2,0.2,0.2);
// scene.add(wallEle4);
// 在隧道墙壁上添加灯泡
var lamp = new THREE.SphereGeometry(1.6,32,5,0,Math.PI*2,0,Math.PI/2);
var lampBox = new THREE.BoxGeometry(2,2,4);
var light = new THREE.SphereGeometry(20,32,5,0,Math.PI*2,0,Math.PI/2);
var lampMater = new THREE.MeshPhongMaterial({
  color:0xFFFFFF
});
var lightMater = new THREE.MeshPhongMaterial({
  // color:0xFFBD27,
  color:0xFFFFFF,
  transparent:true,//开启透明度
  opacity:0.04,//设置透明度具体值
})
// var lampMesh = new THREE.Mesh(lamp,lampMater);
var lampBoxMesh = new THREE.Mesh(lampBox,lampMater);
var lightsMesh = new THREE.Mesh(light,lightMater);
for(var i = 0; i < 20 ; i++){
  // var lamps = lampMesh.clone();
  var lamps = lampBoxMesh.clone();
  var lights = lightsMesh.clone();
  var lamps2 = lampBoxMesh.clone();
  var lights2 = lightsMesh.clone();
  var lamps3 = lampBoxMesh.clone();
  var lights3 = lightsMesh.clone();
  var lamps4 = lampBoxMesh.clone();
  var lights4 = lightsMesh.clone();
  var positionY = 190-i*25;
  var position2Y = 40-i*25;
  lamps.position.set(80,56,positionY);
  lights.position.set(80,56,positionY);
  lamps.rotateZ(-Math.PI/4*3);
  lights.rotateZ(-Math.PI/4*3);
  lamps2.position.set(160,56,positionY);
  lights2.position.set(158.3,56,positionY);
  lamps2.rotateZ(-Math.PI/4*5);
  lights2.rotateZ(-Math.PI/4*5);
  lamps3.position.set(-120,56,position2Y);
  lights3.position.set(-119.5,56,position2Y);
  lamps3.rotateZ(-Math.PI/4*3);
  lights3.rotateZ(-Math.PI/4*3);
  lamps4.position.set(-40,56,position2Y);
  lights4.position.set(-42,56,position2Y);
  lamps4.rotateZ(-Math.PI/4*5)
  lights4.rotateZ(-Math.PI/4*5)
  scene.add(lamps);
  scene.add(lights);
  scene.add(lamps2);
  scene.add(lights2);
  scene.add(lamps3);
  scene.add(lights3);
  scene.add(lamps4);
  scene.add(lights4);
};

// 摆放路牌
var roadRod = new THREE.CylinderGeometry(0.5,0.5,60,10,5); // 路牌杆
var roadRodMater = new THREE.MeshLambertMaterial({
  color:0xB1BBBC
});
var roadRodMesh = new THREE.Mesh(roadRod,roadRodMater);
roadRodMesh.position.set(195,30,260)
scene.add(roadRodMesh);
var roadInfo = new THREE.BoxGeometry(30,15,0.5); // 路牌牌
var roadInfotexture = new THREE.TextureLoader().load("./assets/roadInfo.png");
var roadInfoMater = new THREE.MeshLambertMaterial({
  map:roadInfotexture
});
var roadInfoMesh = new THREE.Mesh(roadInfo,roadInfoMater);
roadInfoMesh.position.set(195,67,260);
scene.add(roadInfoMesh);

// 道路交通标识
// 通行
var roadOk = new THREE.BoxGeometry(6,6,0.3);
var roadOkTexture = new THREE.TextureLoader().load("./assets/downArrow.png");
var roadOkMater = new THREE.MeshLambertMaterial({
  map:roadOkTexture,
});
var roadOkMesh = new THREE.Mesh(roadOk,roadOkMater);
roadOkMesh.position.set(137,50,180);
scene.add(roadOkMesh);
var roadOkMesh2 = roadOkMesh.clone();
roadOkMesh2.position.set(103,50,180);
scene.add(roadOkMesh2);
var roadOkMesh3 = roadOkMesh.clone();
roadOkMesh3.position.set(-63,50,-455);
scene.add(roadOkMesh3);
var roadOkMesh3 = roadOkMesh.clone();
roadOkMesh3.position.set(-97,50,-455);
scene.add(roadOkMesh3);
// 禁止
var roadNo = new THREE.BoxGeometry(6,6,0.3);
var roadNoTexture = new THREE.TextureLoader().load("./assets/prohibited.png");
var roadNoMater = new THREE.MeshLambertMaterial({
  map:roadNoTexture,
});
var roadNoMesh = new THREE.Mesh(roadNo,roadNoMater);
roadNoMesh.position.set(137,50,179.7);
scene.add(roadNoMesh);
var roadNoMesh2 = roadNoMesh.clone();
roadNoMesh2.position.set(103,50,179.7);
scene.add(roadNoMesh2);
var roadNoMesh3 = roadNoMesh.clone();
roadNoMesh3.position.set(-63,50,-454.7);
scene.add(roadNoMesh3);
var roadNoMesh4 = roadNoMesh.clone();
roadNoMesh4.position.set(-97,50,-454.7);
scene.add(roadNoMesh4);

// 避难所标牌
var biNanGeo = new THREE.BoxGeometry(25,10,1);
var biNanTexture = new THREE.TextureLoader().load("./assets/biNanSuo.png");
var biNanMater = new THREE.MeshLambertMaterial({
  map:biNanTexture
});
var biNanMesh = new THREE.Mesh(biNanGeo,biNanMater);
biNanMesh.rotateY(Math.PI/2);
biNanMesh.position.set(50,65,-80);
scene.add(biNanMesh);

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(4000, 2000, 3000); //点光源位置
scene.add(point); //点光源添加到场景中
var point2 = new THREE.PointLight(0xffffff);
point2.position.set(-4000, -2000, -3000); //点光源位置
scene.add(point2); //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
// 辅助坐标系
// var axisHelper = new THREE.AxisHelper(500);
// scene.add(axisHelper);
/**
 * 透视投影相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
/**透视投影相机对象*/
var camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
camera.position.set(120,65, 540); //树下面观察
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height); //设置渲染区域尺寸
// renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色(天空色)
renderer.setClearColor(0x222842, 1); //设置背景颜色(天空色)
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
// var controls = new THREE.OrbitControls(camera);

// 监听模型的点击事件
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
document.body.appendChild(renderer.domElement);
document.addEventListener('mousedown', onMouseDown, false);
function onMouseDown( event ) {
  event.preventDefault();
	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

//监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
// controls.addEventListener('change', render);
// 渲染
var INTERSECTED;
function render(){
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera( mouse, camera );
	// 计算物体和射线的焦点
  var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.set( 0xB0B0B0 );
      var operatDom = document.getElementById('operatInfo');
      operatDom.style.opacity = 1;
      operatDom.innerHTML = `<div class="zhaoming">
          <div class="titleDeng">
            <h4>设备操作</h4>
          </div>
          <p>操作1 : <span class='operatSpan'>未知操作1</span></p>
          <p>操作2 : <span class='operatSpan'>未知操作2</span></p>
        </div>
        <div class="last">
          <div class="titleDeng">
            <h4>设备信息</h4>
          </div>
          <p>设备名称 : <span>配电柜</span></p>
          <p>设备型号 : <span>PDG010203</span></p>
          <p>生产厂家 : <span>未知厂家</span></p>
          <p>设备尺寸(m) : <span>2*1.5*0.6</span></p>
        </div>`;
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.color.set(INTERSECTED.currentHex);
    INTERSECTED = null;
    var operatDom = document.getElementById('operatInfo');
    operatDom.style.opacity = 0;
    operatDom.innerHTML = ``;
  }
  if(moveWind.children[0]){
    moveWind.children[0].rotateY(0.18);
    paifeng.children[0].rotateZ(0.23);
    moveWind2.children[0].rotateY(0.18);
    paifeng2.children[0].rotateZ(0.23);
  }
}
render();
    