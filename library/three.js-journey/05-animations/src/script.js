import gsap from 'gsap';
import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/**
 * Animation loop
 */

// Clock
const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
  console.log('tick');

    const elapsedTime = clock.getElapsedTime();
  // Update object
  //   mesh.rotation.y = elapsedTime * Math.PI * 2; //y축 회전값 증가
    camera.position.x = Math.cos(elapsedTime);
    camera.position.y = Math.sin(elapsedTime);
    camera.lookAt(mesh.position);

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
