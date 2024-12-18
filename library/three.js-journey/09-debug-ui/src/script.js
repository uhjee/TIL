import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: '#ff0000',
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * !Debug
 */
const gui = new GUI();

// mesh의 y축 위치를 조정하는 GUI 컨트롤러
// min: -3 (최소값), max: 3 (최대값), step: 0.001 (조정 단위)
// name: elevation (GUI에 표시될 이름)
gui.add(mesh.position, 'y').min(-3).max(3).step(0.001).name('elevation');

// // 사용자 정의 변수 조정
// // GUI 컨트롤을 위한 객체 생성
// // myVariable: 초기값 555로 설정된 변수
// const myObject = {
//   myVariable: 555,
// };
// gui.add(myObject, 'myVariable').min(0).max(1000).step(1).name('myVariable');

// mesh의 visible 속성을 조정하는 GUI 컨트롤러
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');

// // 컬러
// // gui.addColor(material, 'color');
// gui.addColor({ color: '#ff0000' }, 'color').onChange(value => {
//   console.log(material.color.getHexString());
//   console.log(value.getHexString());
//   // material.color.set(value); // 선택한 색상을 material.color에 적용
//   // material.color.convertSRGBToLinear(); // sRGB 색상으로 변환
// });
gui
    .addColor(material, 'color')
    .onChange((value) => {
        console.log(value.getHexString()) // 내부적으로 사용되는 HEX 값 출력
    })



/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
