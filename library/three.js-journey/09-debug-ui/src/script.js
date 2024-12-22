import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

/**
 * !Debug
 */
const gui = new GUI({
  width: 300,
  title: 'Nice Debug UI',
  // closeFolders: true, // 폴더 닫기 기능 활성화
});
gui.hide(); // 디버깅 패널 숨기기

window.addEventListener('keydown', (event) => {
  if (event.key === 'h') {
    gui.show(gui._hidden);
  }
});

const debugObject = {};

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
debugObject.color = '#a778d8';

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const cubeTweaks = gui.addFolder('Cube Tweaks');

// !mesh의 y축 위치를 조정하는 GUI 컨트롤러
// min: -3 (최소값), max: 3 (최대값), step: 0.001 (조정 단위)
// name: elevation (GUI에 표시될 이름)
cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.001).name('elevation');

// // 사용자 정의 변수 조정
// // GUI 컨트롤을 위한 객체 생성
// // myVariable: 초기값 555로 설정된 변수
// const myObject = {
//   myVariable: 555,
// };
// gui.add(myObject, 'myVariable').min(0).max(1000).step(1).name('myVariable');

// !mesh의 visible 속성을 조정하는 GUI 컨트롤러
cubeTweaks.add(mesh, 'visible');
cubeTweaks.add(material, 'wireframe');

// !컬러
// cubeTweaks.addColor(material, 'color');
// cubeTweaks.addColor(material, 'color').onChange((value) => {
//   console.log(material.color.getHexString());
//   console.log(value.getHexString());
//   // console.log(material.color instanceof THREE.Color);
//   // console.log(value instanceof THREE.Color);

//   // material.color.set(value); // 선택한 색상을 material.color에 적용
//   // material.color.convertSRGBToLinear(); // sRGB 색상으로 변환
// });

// // 색상 불일치 문제 확인용 - 내부적으로 사용되는 HEX 값 출력값과 디버깅 패널 컬러와 불일치 확인
// gui.addColor(material, 'color').onChange((value) => {
//   console.log(value.getHexString()); // 내부적으로 사용되는 HEX 값 출력
// });

// 외부 변수를 통해 색상 불일치 문제 해결
cubeTweaks.addColor(debugObject, 'color').onChange((value) => {
  material.color.set(debugObject.color);
  console.log(material.color.getHexString());
});

// ! 버튼을 통한 함수 호출
debugObject.spin = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
};
cubeTweaks.add(debugObject, 'spin');

// !Geometry 세분화 조정
debugObject.subdivision = 2;
cubeTweaks
  .add(debugObject, 'subdivision')
  .min(1)
  .max(10)
  .step(1)
  .name('subdivisions')
  .onFinishChange(() => {
    mesh.geometry.dispose(); // 기존 기하 객체 해제 (GPU 메모리에서 해제)

    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision,
    );
  });

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
