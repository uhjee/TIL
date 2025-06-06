import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener('mousemove', event => {
  // clientX를 sizes.width로 나누는 이유:
  //   1. clientX는 0 ~ sizes.width(800) 범위의 픽셀값
  //   2. 이를 0 ~ 1 사이의 정규화된 값으로 변환하기 위해 sizes.width로 나눔
  // 0.5를 빼는 이유:
  //   1. 정규화된 값(0 ~ 1)의 중심점을 화면 중앙으로 이동하기 위함
  //   2. 결과적으로 -0.5 ~ 0.5 범위의 값을 얻게 됨
  cursor.x = event.clientX / sizes.width - 0.5;
  // y축은 브라우저와 WebGL의 좌표계가 반대이므로 음수를 곱해 방향을 뒤집음
  cursor.y = -(event.clientY / sizes.height - 0.5);
  //   cursor.y = (event.clientY / sizes.height - 0.5);
  console.log(cursor);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
scene.add(mesh);

// Camera
// 01. PerspectiveCamera(fov, aspect)
// fov: 시야각(field of view) - 카메라가 보는 영역의 각도(75도)
// aspect: 종횡비(aspect ratio) - 카메라 뷰포트의 가로/세로 비율
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   1000,
// );
// camera.position.x = 2
// camera.position.y = 2
// camera.position.z = 3;
// console.log(camera.position.length());
// camera.lookAt(mesh.position);
// scene.add(camera);

// 02. OrthographicCamera(left, right, top, bottom, near, far)
// left, right, top, bottom: 카메라의 시야각을 결정하는 좌표
// near, far: 카메라의 깊이 범위
const aspectRatio = sizes.width / sizes.height;
// // OrthographicCamera의 가로 범위(-1 ~ 1)에 aspect ratio를 곱하는 이유:
// //   1. 기본적으로 OrthographicCamera는 정사각형 뷰포트(-1 ~ 1, -1 ~ 1)를 가짐
// //   2. 실제 화면은 직사각형(800 x 600)이므로 가로방향이 왜곡되어 보임
// //   3. 가로 범위에 aspect ratio(width/height)를 곱해서 실제 화면 비율에 맞게 보정
// //   4. 결과적으로 큐브가 정사각형이 아닌 직사각형 뷰포트에서도 왜곡없이 표시됨
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100,
);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
// console.log(camera.position.length());
camera.lookAt(mesh.position);
scene.add(camera);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

// 06. OrbitControls 인스턴스화
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.y = 1; // OrbitControls의 타겟 지점(카메라가 바라보는 점)의 y좌표를 1로 설정
controls.enableDamping = true; // 카메라 이동 시 부드러운 애니메이션 효과 활성화
controls.dampingFactor = 0.01; // 부드러운 애니메이션 효과의 강도 설정


const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  // Update camera
  // 04. 마우스 x, y 좌표를 이용해 카메라 위치 이동
  // cursor.x, y 값에 10을 곱해 카메라의 이동 범위를 확장 (-10 ~ 10)
  //   camera.position.x = cursor.x * 10;
  //   camera.position.y = cursor.y * 10;
  // 카메라가 항상 mesh를 바라보도록 설정
  // camera.lookAt(mesh.position);

  // 04. 마우스 x 좌표를 이용해 카메라를 원형으로 회전
  // sin, cos 함수를 사용해 x, z 좌표를 계산하여 원형 궤도를 만듦
  // cursor.x 값에 2π를 곱해 한 바퀴(360도) 회전하도록 함
  // 반지름 2인 원형 궤도
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // // 마우스 y 좌표로 카메라의 높이 조절 (-3 ~ 3 범위)
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(mesh.position);

  // 07. Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
