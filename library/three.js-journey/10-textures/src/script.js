import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Textures
 */

// // ! 01. 직접 Image 객체를 생성해 Texture 객체 생성
// const image = new Image();
// // 이미지로부터 Three.js 텍스처 객체를 생성
// const texture = new THREE.Texture(image);
// // 텍스처의 색상 공간을 sRGB로 설정
// // - 브라우저는 기본적으로 sRGB 색상 공간을 사용
// // - 텍스처가 올바른 색상으로 표시되도록 보장
// texture.colorSpace = THREE.SRGBColorSpace;
// image.onload = () => {
//   // 이미지가 로드되면 텍스처를 업데이트하여 GPU에 전달
//   texture.needsUpdate = true;
//   console.log(texture);
// };
// image.src = '/textures/door/color.jpg';

// ! 02. TextureLoader 사용해서 Texture 객체 생성

// LoadingManager 생성
// - 여러 텍스처나 3D 모델 등의 에셋 로딩을 관리하는 매니저
// - 로딩 진행 상황을 추적하고 이벤트를 처리할 수 있음
// - 로딩 시작, 진행, 완료, 에러 등의 콜백 함수를 설정 가능
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log('loading started');
};
loadingManager.onLoad = () => {
  console.log('loading finished');
};
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log('loading progress', url, itemsLoaded, itemsTotal);
};
loadingManager.onError = (url) => {
  console.log('loading error', url);
};

// TextureLoader 생성
// - 텍스처를 효율적으로 로드하고 관리하기 위한 Three.js의 내장 로더
// - 이미지 파일을 비동기적으로 로드하여 텍스처 객체로 변환
const textureLoader = new THREE.TextureLoader(loadingManager);
// const texture = textureLoader.load(
//   '/textures/door/color.jpg',
//   () => console.log('texture loading finished'),
//   (event) => console.log('texture loading progress', event),
//   (err) => console.log('texture loading error', err),
// );

// 텍스쳐 로딩
const colorTexture = textureLoader.load('/textures/door/color.jpg');
colorTexture.colorSpace = THREE.SRGBColorSpace;

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg',
);
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// 텍스처 반복 설정
// - repeat: 텍스처의 반복 횟수를 설정하는 Vector2 객체
// - x: 가로 방향 반복 횟수 (2번)
// - y: 세로 방향 반복 횟수 (3번)
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;

// 텍스처 래핑(반복) 모드 설정 - 설정하지 않으면 repeat 설정을 하더라도 텍스처가 반복되지 않음
// - wrapS: 가로(S) 방향의 텍스처 래핑 모드
// - wrapT: 세로(T) 방향의 텍스처 래핑 모드
// - THREE.RepeatWrapping: 텍스처를 반복해서 표시
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

// 텍스처 오프셋 설정
// - offset: 텍스처의 오프셋을 설정하는 Vector2 객체
// - x: 가로 방향 오프셋 (0.5)
// - y: 세로 방향 오프셋 (0.5)
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// 텍스처 회전 설정
// - rotation: 텍스처의 회전 각도를 설정하는 숫자
// - 파라미터는 라디언 값,  Math.PI * 0.25: 텍스처를 45도 회전
// - 텍스터 회전의 기본 축은 UV 좌표의 (0, 0) 좌표 (좌측 하단)
colorTexture.rotation = Math.PI * 0.25;

// 텍스처 중심 설정
// - center: 텍스처의 중심을 설정하는 Vector2 객체
// - x: 가로 방향 중심 (0.5)
// - y: 세로 방향 중심 (0.5)
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

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
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const geometry = new THREE.CylinderGeometry(1, 1, 1, 32);
// const geometry = new THREE.TorusGeometry(0.8, 0.35, 100, 16);

// UV 좌표 확인
// - geometry.attributes.uv: 메시의 UV 좌표 정보를 담고 있는 BufferAttribute
// - UV 좌표는 텍스처를 메시의 표면에 매핑하는데 사용되는 2D 좌표계
// - U는 가로(0~1), V는 세로(0~1) 위치를 나타냄
console.log(geometry.attributes.uv);

// MeshBasicMaterial 생성
// - 가장 기본적인 재질로 빛의 영향을 받지 않음
// - map 속성에 텍스처를 할당하여 메시 표면에 이미지를 매핑
// - 텍스처는 UV 좌표를 기반으로 메시의 표면에 적용됨
// - 성능이 좋고 계산이 적어 디버깅용으로 자주 사용
const material = new THREE.MeshBasicMaterial({
  map: colorTexture, // texture 객체를 재질의 diffuse 텍스처로 사용
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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
