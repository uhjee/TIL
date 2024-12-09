import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// ! Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 2, 3);

// Buffer geometry
// BufferGeometry: 버텍스 데이터를 효율적으로 저장하고 처리하기 위한 Three.js의 기본 지오메트리 클래스
// const geometry = new THREE.BufferGeometry();

// ! 삼각형 1개 만들기
// // Float32Array: WebGL이 이해할 수 있는 타입화된 배열(typed array)을 생성
// // 각 vertex(정점)는 x,y,z 좌표를 가지며, 3개의 숫자가 하나의 정점을 표현
// const positionsArray = new Float32Array([
//   0, 0, 0, // 첫 번째 정점 (원점)
//   0, 1, 0, // 두 번째 정점 (y축으로 1만큼 이동)
//   1, 1, 0, // 세 번째 정점 (x축으로 1, y축으로 1만큼 이동)
//   // 이 세 정점으로 삼각형이 형성됨
// ]);

// // BufferAttribute: 버텍스 데이터를 GPU에 전달하기 위한 속성 객체 생성
// // 두 번째 파라미터 3은 하나의 정점당 사용되는 값의 개수(x,y,z)
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

// // setAttribute: 생성된 BufferAttribute를 geometry에 'position' 속성으로 설정
// // position은 Three.js에서 정점 위치를 나타내는 기본 속성명
// geometry.setAttribute('position', positionsAttribute);

// ! 삼각형 50개 만들기
const geometry = new THREE.BufferGeometry();
const count = 50; // 50개의 삼각형 만들기
const positionsArray = new Float32Array(count * 3 * 3); // 50개의 정점, 각 정점은 3개의 좌표(x, y, z)를 가짐

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random();
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true, // 삼각형 테두리 표시
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
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
