let renderer, scene, camera, light, controls, point;
let moveWind, paifeng, moveWind2, paifeng2, width, height;
let INTERSECTED;
let raycaster;
let mouse;
let intersects = [];

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  scene = new THREE.Scene();
  width = window.innerWidth;
  height = window.innerHeight;
  // 设置渲染区域尺寸
  renderer.setSize(width, height);
  // 设置背景颜色
  renderer.setClearColor(0x222842, 1); 
  document.body.appendChild(renderer.domElement); // body元素中插入canvas对象
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
  camera.lookAt(scene.position);
  camera.position.set(120, 65, 540);
  // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
  controls = new THREE.OrbitControls(camera);
  point = new THREE.PointLight(0xffffff);
  point.position.set(4000, 2000, 3000); // 点光源位置
  scene.add(point); // 点光源添加到场景中
  let point2 = new THREE.PointLight(0xffffff);
  point2.position.set(-4000, -2000, -3000); // 点光源位置
  scene.add(point2); // 点光源添加到场景中
  // 辅助坐标系
  // let axisHelper = new THREE.AxisHelper(250);
  // scene.add(axisHelper);
  //环境光
  let ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  raycaster = new THREE.Raycaster();
  // 如果不设置会默认选中一个模型
  mouse = new THREE.Vector2(2000, 3000, 350);
  document.body.appendChild(renderer.domElement);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  addAllModel();
  render();
}

function onDocumentMouseUp(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
// 加载模型
function addAllModel() {
  /**
   * 创建一个路面
   */
  let geometry = new THREE.BoxGeometry(154, 700, 0.5);
  // 加载路面纹理贴图
  let texture = new THREE.TextureLoader().load("./assets/road.png");
  let material = new THREE.MeshLambertMaterial({
    map: texture,
  });
  // 网格模型对象Mesh
  let mesh = new THREE.Mesh(geometry, material); 
  mesh.position.set(120, 0.2, -50);
  mesh.rotateX(-Math.PI / 2);
  mesh.name = 'road'
  // 网格模型添加到场景中
  scene.add(mesh); 
  // 隧道路面下方块
  let roadDown = new THREE.BoxGeometry(154, 700, 2);
  let roadDownMater = new THREE.MeshLambertMaterial({
    color: 0x59c4fe
  });
  let roadDownMesh = new THREE.Mesh(roadDown, roadDownMater);
  roadDownMesh.rotateX(Math.PI / 2);
  roadDownMesh.position.set(120, -1, -50);
  scene.add(roadDownMesh);

  // 添加第二个车道
  let geometry2 = new THREE.BoxGeometry(154, 700, 0.5);
  let material2 = new THREE.MeshLambertMaterial({
    map: texture,
  });
  let mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.rotateX(-Math.PI / 2);
  mesh2.position.set(-80, 0.2, -200)
  scene.add(mesh2)
  // 隧道二洞路面下方块
  let roadDown2 = new THREE.BoxGeometry(154, 700, 2);
  let roadDownMater2 = new THREE.MeshLambertMaterial({
    color: 0x59c4fe
  });
  let roadDownMesh2 = new THREE.Mesh(roadDown2, roadDownMater2);
  roadDownMesh2.rotateX(Math.PI / 2);
  roadDownMesh2.position.set(-80, -1, -200);
  scene.add(roadDownMesh2);

  // 添加配电房地面
  let pdfGeometry = new THREE.BoxGeometry(60, 180, 0.5); // 矩形平面
  let pdfMaterial = new THREE.MeshLambertMaterial({
    color: 0x3c3c3d
  })
  let pdfMesh = new THREE.Mesh(pdfGeometry, pdfMaterial); // 网格模型对象Mesh
  pdfMesh.position.set(-190, -0.5, 190)
  scene.add(pdfMesh); // 网格模型添加到场景中
  pdfMesh.rotateX(-Math.PI / 2);
  //矩形平面
  let pdfDown = new THREE.BoxGeometry(60, 180, 2);
  // 设置配电房地面颜色
  let pdfMaterialDown = new THREE.MeshLambertMaterial({
    color: 0x59c4fe
  })
  let pdfMeshDown = new THREE.Mesh(pdfDown, pdfMaterialDown); // 网格模型对象Mesh
  pdfMeshDown.position.set(-190, -2, 190)
  scene.add(pdfMeshDown); // 网格模型添加到场景中
  pdfMeshDown.rotateX(-Math.PI / 2);

  // 加载隧道墙体模型
  addModels('./tunnelModel/tunnelWall.obj', 120, 37, -50, 0.03, function (obj) {
    obj.children[0].scale.set(0.03, 0.03, 0.045);
    let tunnelWallTextLoad = new THREE.TextureLoader();
    tunnelWallTextLoad.load('./assets/suidao.jpg', function (tunnelImg) {
      obj.children[0].material.map = tunnelImg;
      scene.add(obj);
    })
  });
  addModels('./tunnelModel/tunnelWall.obj', -80, 37, -200, 0.03, function (obj) {
    obj.children[0].scale.set(0.03, 0.03, 0.045);
    let tunnelWallTextLoad = new THREE.TextureLoader();
    tunnelWallTextLoad.load('./assets/suidao.jpg', function (tunnelImg) {
      obj.children[0].material.map = tunnelImg;
      scene.add(obj); // 将隧道墙体模型添加到场景中
    })
  });
  // 加载摄风向风速仪模型
  addModels('./tunnelModel/anemometer.obj', 170, 3, 195, 0.015, function (obj) {
    scene.add(obj);
    moveWind = obj;
  });
  addModels('./tunnelModel/anemometer.obj', -130, 3, -435, 0.015, function (obj) {
    scene.add(obj); // 将排风模型添加到场景中
    moveWind2 = obj;
  });
  // 加载排风模型
  addMTLModels('./tunnelModel/exhaust.mtl', './tunnelModel/exhaust.obj', 120, 45, -50, 0.1, function (obj) {
    scene.add(obj);
    paifeng = obj;
  });
  addMTLModels('./tunnelModel/exhaust.mtl', './tunnelModel/exhaust.obj', -80, 45, -200, 0.1, function (obj) {
    scene.add(obj); // 将排风模型添加到场景中
    paifeng2 = obj;
  });
  // 加载方形摄像头模型
  addModels('./tunnelModel/camera.obj', 145, 55, 135, 0.2, function (obj) {
    scene.add(obj);
  });
  addModels('./tunnelModel/camera.obj', 145, 55, -250, 0.2, function (obj) {
    scene.add(obj);
  });
  addModels('./tunnelModel/camera.obj', 95, 55, 135, 0.2, function (obj) {
    scene.add(obj);
  });
  addModels('./tunnelModel/camera.obj', 95, 55, -250, 0.2, function (obj) {
    scene.add(obj);
  });
  // 加载方形摄像头模型(旋转180度)
  addModels('./tunnelModel/camera.obj', -55, 55, 15, 0.2, function (obj) {
    scene.add(obj);
    obj.children[0].rotateY(Math.PI)
  });
  addModels('./tunnelModel/camera.obj', -55, 55, -400, 0.2, function (obj) {
    scene.add(obj);
    obj.children[0].rotateY(Math.PI)
  });
  addModels('./tunnelModel/camera.obj', -105, 55, 15, 0.2, function (obj) {
    scene.add(obj);
    obj.children[0].rotateY(Math.PI)
  });
  addModels('./tunnelModel/camera.obj', -105, 55, -400, 0.2, function (obj) {
    scene.add(obj);
    obj.children[0].rotateY(Math.PI)
  });
  // 加载维护对讲摄像头模型
  addMTLModels('./tunnelModel/intercomMaintenanceCamera.mtl', './tunnelModel/intercomMaintenanceCamera.obj', 120, 52, 20, 0.25, function (obj) {
    obj.children[0].rotateX(Math.PI)
    obj.children[0].rotateY(Math.PI)
    scene.add(obj);
  });
  addMTLModels('./tunnelModel/intercomMaintenanceCamera.mtl', './tunnelModel/intercomMaintenanceCamera.obj', -80, 52, -370, 0.25, function (obj) {
    obj.children[0].rotateX(Math.PI)
    obj.children[0].rotateY(Math.PI)
    scene.add(obj);
  });
  // 加载covi监测模型
  addMTLModels('./tunnelModel/coviMonitor.mtl', './tunnelModel/coviMonitor.obj', 120, 57, 0, 0.05, function (obj) {
    obj.children[0].rotateY(Math.PI)
    scene.add(obj);
  });
  addMTLModels('./tunnelModel/coviMonitor.mtl', './tunnelModel/coviMonitor.obj', -80, 57, -350, 0.05, function (obj) {
    scene.add(obj);
  });
  // 将消防设备添加到场景中
  addMTLModels('./tunnelModel/fireEquipment.mtl', './tunnelModel/fireEquipment.obj', 35, 10, 10, 0.2, function (obj) {
    obj.children[0].rotateY(-Math.PI / 2);
    let xfLoad = new THREE.TextureLoader();
    xfLoad.load('./assets/red.jpg', function (redImg) {
      obj.children[0].material.map = redImg;
      scene.add(obj);
    })
  });
  addMTLModels('./tunnelModel/fireEquipment.mtl', './tunnelModel/fireEquipment.obj', 5, 10, -215, 0.2, function (obj) {
    obj.children[0].rotateY(Math.PI / 2);
    let xfLoad = new THREE.TextureLoader();
    xfLoad.load('./assets/red.jpg', function (redImg) {
      obj.children[0].material.map = redImg;
      scene.add(obj);
    });
  });
  // 画线路到场景中
  let cyline = new THREE.CylinderGeometry(0.8, 0.8, 300, 10, 5);
  let cylineMater = new THREE.MeshLambertMaterial({
    color: 0xf0c69a
  });
  let cylineMesh = new THREE.Mesh(cyline, cylineMater);
  cylineMesh.position.set(20, -1, -48.8);
  cylineMesh.rotateX(Math.PI / 2);
  scene.add(cylineMesh);
  let cyline2 = cylineMesh.clone();
  cyline2.rotateZ(Math.PI / 2);
  cyline2.scale.set(1, 0.66, 1)
  cyline2.position.set(-79, -1, 100.5);
  scene.add(cyline2);
  let cyline3 = cylineMesh.clone();
  cyline3.scale.set(1, 0.09, 1)
  cyline3.position.set(-178.5, -1, 113.8);
  scene.add(cyline3);
  let rightLine = cyline2.clone();
  rightLine.position.set(33, -1, 20);
  rightLine.scale.set(1, 0.09, 1);
  scene.add(rightLine);
  let leftLine = rightLine.clone();
  leftLine.position.set(7.6, -1, -198.2);
  leftLine.scale.set(1, 0.09, 1);
  scene.add(leftLine);
  // 配电房的墙
  let wall1 = new THREE.BoxGeometry(50, 58, 1);
  let wallMaterial = new THREE.MeshLambertMaterial({
    color: 0x3c4860,
    transparent: true,// 开启透明度
    opacity: 0.6,// 设置透明度具体值
  });
  let wallMesh1 = new THREE.Mesh(wall1, wallMaterial);
  wallMesh1.position.set(-190, 28, 110.6);
  scene.add(wallMesh1);
  let wallMesh2 = wallMesh1.clone();
  wallMesh2.scale.set(3.2, 1, 1);
  wallMesh2.position.set(-215, 28, 190);
  wallMesh2.rotateY(Math.PI / 2);
  scene.add(wallMesh2);
  let wallMesh3 = wallMesh2.clone();
  wallMesh3.scale.set(2, 1, 1);
  wallMesh3.position.set(-165.5, 28, 160);
  scene.add(wallMesh3);
  let wallMesh4 = wallMesh2.clone();
  wallMesh4.scale.set(0.3, 1, 1);
  wallMesh4.position.set(-165.5, 28, 263);
  scene.add(wallMesh4);
  let wallMesh5 = wallMesh1.clone();
  wallMesh5.scale.set(1, 1, 1);
  wallMesh5.position.set(-190, 28, 270);
  scene.add(wallMesh5);
  // 墙角电柜
  addModels('./tunnelModel/cabinet.obj', -175, 23, 120, 0.2, function (obj) {
    scene.add(obj);
  });
  addModels('./tunnelModel/cabinet.obj', -192, 18, 118, 0.2, function (obj) {
    scene.add(obj);
    obj.children[0].scale.set(0.16, 0.16, 0.16);
  });
  // 中间电柜
  addModels('./tunnelModel/cabinet.obj', -190, 17, 195, 0.2, function (obj) {
    scene.add(obj);
    obj.children[0].scale.set(0.15, 0.15, 0.15);
  });
  addModels('./tunnelModel/cabinet.obj', -190, 14, 182, 0.2, function (obj) {
    obj.children[0].scale.set(0.12, 0.12, 0.12);
    scene.add(obj);
  });
  // 中间标准柜
  addModels('./tunnelModel/cabinet.obj', -190, 21, 212, 0.2, function (obj) {
    scene.add(obj);
  });
  addModels('./tunnelModel/cabinet.obj', -190, 21, 232, 0.2, function (obj) {
    scene.add(obj);
  });
  addModels('./tunnelModel/cabinet.obj', -190, 21, 252, 0.2, function (obj) {
    scene.add(obj);
  });
  let eleGeo = new THREE.BoxGeometry(13, 29, 20);
  let eleMaterial = new THREE.MeshLambertMaterial({
    color: 0xD0D2D3,
  });
  let eleMesh = new THREE.Mesh(eleGeo, eleMaterial);
  eleMesh.position.set(-190, 14, 165);
  scene.add(eleMesh);
  // 在隧道墙壁上添加灯泡
  let lampBox = new THREE.BoxGeometry(2, 2, 4);
  let light = new THREE.SphereGeometry(20, 32, 5, 0, Math.PI * 2, 0, Math.PI / 2);
  let lampMater = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF
  });
  let lightMater = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    transparent: true, // 开启透明度
    opacity: 0.04, // 设置透明度具体值
  })
  let lampBoxMesh = new THREE.Mesh(lampBox, lampMater);
  let lightsMesh = new THREE.Mesh(light, lightMater);
  for (let i = 0; i < 20; i++) {
    let lamps = lampBoxMesh.clone();
    let lights = lightsMesh.clone();
    let lamps2 = lampBoxMesh.clone();
    let lights2 = lightsMesh.clone();
    let lamps3 = lampBoxMesh.clone();
    let lights3 = lightsMesh.clone();
    let lamps4 = lampBoxMesh.clone();
    let lights4 = lightsMesh.clone();
    let positionY = 190 - i * 25;
    let position2Y = 40 - i * 25;
    lamps.position.set(79, 56, positionY);
    lights.position.set(80, 56, positionY);
    lamps.rotateZ(-Math.PI / 4 * 3);
    lights.rotateZ(-Math.PI / 4 * 3);
    lamps2.position.set(161, 56, positionY);
    lights2.position.set(158.3, 56, positionY);
    lamps2.rotateZ(-Math.PI / 4 * 5);
    lights2.rotateZ(-Math.PI / 4 * 5);
    lamps3.position.set(-121, 56, position2Y);
    lights3.position.set(-119.5, 56, position2Y);
    lamps3.rotateZ(-Math.PI / 4 * 3);
    lights3.rotateZ(-Math.PI / 4 * 3);
    lamps4.position.set(-39, 56, position2Y);
    lights4.position.set(-42, 56, position2Y);
    lamps4.rotateZ(-Math.PI / 4 * 5)
    lights4.rotateZ(-Math.PI / 4 * 5)
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
  let roadRod = new THREE.CylinderGeometry(0.5, 0.5, 60, 10, 5); // 路牌杆
  let roadRodMater = new THREE.MeshLambertMaterial({
    color: 0xB1BBBC
  });
  let roadRodMesh = new THREE.Mesh(roadRod, roadRodMater);
  roadRodMesh.position.set(195, 30, 260)
  scene.add(roadRodMesh);
  let roadInfo = new THREE.BoxGeometry(30, 15, 0.5); // 路牌牌
  let roadInfotexture = new THREE.TextureLoader().load("./assets/roadInfo.png");
  let roadInfoMater = new THREE.MeshLambertMaterial({
    map: roadInfotexture
  });
  let roadInfoMesh = new THREE.Mesh(roadInfo, roadInfoMater);
  roadInfoMesh.position.set(195, 67, 260);
  scene.add(roadInfoMesh);

  // 道路交通标识
  // 通行
  let roadOk = new THREE.BoxGeometry(6, 6, 0.3);
  let roadOkTexture = new THREE.TextureLoader().load("./assets/downArrow.png");
  let roadOkMater = new THREE.MeshLambertMaterial({
    map: roadOkTexture,
  });
  let roadOkMesh = new THREE.Mesh(roadOk, roadOkMater);
  roadOkMesh.position.set(137, 50, 180);
  scene.add(roadOkMesh);
  let roadOkMesh4 = roadOkMesh.clone();
  roadOkMesh4.position.set(-97, 50, -455);
  scene.add(roadOkMesh4);
  // 禁止
  let roadNo = new THREE.BoxGeometry(6, 6, 0.3);
  let roadNoTexture = new THREE.TextureLoader().load("./assets/prohibited.png");
  let roadNoMater = new THREE.MeshLambertMaterial({
    map: roadNoTexture,
  });
  let roadNoMesh = new THREE.Mesh(roadNo, roadNoMater);
  let roadNoMesh2 = roadNoMesh.clone();
  roadNoMesh2.position.set(103, 50, 179.7);
  scene.add(roadNoMesh2);
  let roadNoMesh3 = roadNoMesh.clone();
  roadNoMesh3.position.set(-63, 50, -454.7);
  scene.add(roadNoMesh3);
  // 避难所标牌
  let biNanGeo = new THREE.BoxGeometry(25, 10, 1);
  let biNanTexture = new THREE.TextureLoader().load("./assets/biNanSuo.png");
  let biNanMater = new THREE.MeshLambertMaterial({
    map: biNanTexture
  });
  let biNanMesh = new THREE.Mesh(biNanGeo, biNanMater);
  biNanMesh.rotateY(Math.PI / 2);
  biNanMesh.position.set(50, 65, -80);
  scene.add(biNanMesh);
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      console.log(intersects[0].object);
      if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.set(0xB0B0B0);
      let operatDom = document.getElementById('operatInfo');
      operatDom.style.opacity = 1;
      operatDom.innerHTML = `<div class="zhaoming">
                <div class="titleDeng">
                    <h4>设备操作</h4>
                </div>
                <p>操作1 : <span><button class='operatSpan' id='btn1'>未知操作1</button></span></p>
                <p>操作2 : <span><button class='operatSpan' id='btn2'>未知操作2</button></span></p>
                </div>
                <div class="last">
                <div class="titleDeng">
                    <h4>设备信息</h4>
                </div>
                <p>属性1 : <span>未知属性1</span></p>
                <p>属性2 : <span>未知属性2</span></p>
                <p>属性3 : <span>未知属性3</span></p>
                <p>属性4 : <span>未知属性4</span></p>
                </div>`;
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.color.set(INTERSECTED.currentHex);
    INTERSECTED = null;
    let operatDom = document.getElementById('operatInfo');
    operatDom.style.opacity = 0;
    operatDom.innerHTML = ``;
  }
  if (moveWind.children[0]) {
    moveWind.children[0].rotateY(0.18);
    paifeng.children[0].rotateZ(0.23);
    moveWind2.children[0].rotateY(0.18);
    paifeng2.children[0].rotateZ(0.23);
  }
}

// 加载模型方法
function addModels(url, x, y, z, sca, callback) {
  let loader = new THREE.OBJLoader();
  loader.load(url, function (obj) {
    obj.children[0].scale.set(sca, sca, sca); // 网格模型缩放
    obj.children[0].geometry.center(); // 网格模型的几何体居中
    obj.children[0].position.set(x, y, z); // 移动模型位置
    callback(obj);
  })
}
// 加载带有材质的模型方法
function addMTLModels(urlMtl, urlObj, x, y, z, sca, callback) {
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
}
// 监听操作表单的按钮点击事件
let btnDivDom = document.getElementById('operatInfo');
btnDivDom.onclick = function (event) {
  if (event.target.id == 'btn1' || event.target.id == 'btn2') {
    let operatSucDom = document.getElementById('operatSuc');
    operatSucDom.style.opacity = 1;
    operatSucDom.innerHTML = `<p>操作成功 !</p>`;
    setTimeout(function () {
      close();
    }, 1000);
  }
};
// 关闭弹出的信息
function close() {
  if (document.getElementById('operatSuc').innerHTML == "<p>操作成功 !</p>") {
    document.getElementById('operatSuc').style.opacity = 0;
    document.getElementById('operatSuc').innerHTML = ``;
  }
}
init();