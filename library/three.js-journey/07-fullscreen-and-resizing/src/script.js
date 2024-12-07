import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth, // viewport width For responsive design
  height: window.innerHeight, // viewport height For responsive design
};

window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen(); // requestFullscreen()은 HTML 요소를 전체 화면 모드로 표시하는 메서드
      // 사용자 제스처(클릭, 키보드 입력 등)에 의해 호출되어야 하며, Promise를 반환
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen(); // webkitRequestFullscreen()은 WebKit 브라우저에서 전체 화면 모드로 표시하는 메서드
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); // Document 인터페이스의 메서드로 전체화면 모드를 종료
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // webkitExitFullscreen()은 WebKit 브라우저에서 전체 화면 모드를 종료하는 메서드
    }
  }
});

// ! Resize event listener
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height; // Camera 생성자의 두 번째 인자에 전달되는 값
  camera.updateProjectionMatrix(); // 카메라의 투영 행렬을 업데이트하여 비율 변경 반영

  // Update renderer
  renderer.setSize(sizes.width, sizes.height); // 렌더러의 크기를 조정하여 렌더링 영역 설정
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 디바이스의 픽셀 비율을 고려하여 렌더링 품질 조절
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
camera.position.z = 3;
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
// renderer.setSize() 호출 시, Three.js가 canvas의 크기를 조정하고 렌더링 영역을 설정
renderer.setSize(sizes.width, sizes.height);

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
