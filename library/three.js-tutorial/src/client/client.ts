import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {GUI} from 'dat.gui';

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5)); // 기준선

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 2);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', render)

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}


// 렌더링 관련 통계 데이터 확인 가능 development
const stats = new Stats();
document.body.appendChild(stats.dom);

// [Dat.GUI 라이브러리] user interface로 scene 및 object 조작 가능
const gui = new GUI();
// Object3D.ratation
const cubeFolder = gui.addFolder('Cube')
const cubeRationFolder = cubeFolder.addFolder('Rotation')
cubeRationFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeRationFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeRationFolder.add(cube.rotation, 'z', 0, Math.PI * 2);

// Object3D.position
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10, 0.5);
cubePositionFolder.add(cube.position, 'y', -10, 10, 0.5);
cubePositionFolder.add(cube.position, 'z', -10, 10, 0.5);

// Object3D.scale
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', -5, 5);
cubeScaleFolder.add(cube.scale, 'y', -5, 5);
cubeScaleFolder.add(cube.scale, 'z', -5, 5);

cubeFolder.add(cube, 'visible');
cubeFolder.open();
cubeRationFolder.open()
cubePositionFolder.open()
cubeScaleFolder.open()

const cameraFolder = gui.addFolder('Camera Folder');
cameraFolder.add(camera.position, 'z', 0, 20)
cameraFolder.open();

function animate() {
  // 재귀 호출을 통해 1초에 최대 60회까지 호출
  window.requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  stats.update(); // 통계 자료 element update
  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
