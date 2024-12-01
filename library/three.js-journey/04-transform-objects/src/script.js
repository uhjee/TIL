import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// Position 설정
mesh.position.x = 0.6;
mesh.position.y = 0.2;
mesh.position.z = 1;
// mesh.position.normalize(); // 아래 mesh.position.length() 값이 1이 됨
// console.log(mesh.position.length()); // 1

// Scale 설정
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

// Rotation 설정
mesh.rotation.reorder('YXZ'); // 기본값은 'XYZ'
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.3;
// mesh.rotation.z = Math.PI * 0.25;

scene.add(mesh);


// Group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube1);


const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube2.position.x = 1.1;
group.add(cube2);


const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube3.position.x = 2.2;
group.add(cube3);

group.position.y = 1.2;
group.scale.x = 0.7;
group.rotation.y = -Math.PI * 0.2;


// 축 표시
// AxesHelper: 3D 공간의 x, y, z 축을 시각화하는 헬퍼 객체
// x축: 빨간색(+) / 왼쪽(-), y축: 초록색(+) / 아래(-), z축: 파란색(+) / 뒤(-)
// param: size - 각 축의 길이 (기본값: 1)
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

camera.lookAt(group.position);

// console.log(mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
