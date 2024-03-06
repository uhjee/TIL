import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

/**
 * 01. Scene
 *   - mesh, lights, groups 등으로 구성된 하나의 트리
 */
const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xff0000)

/**
 * 02. Camera
 *   - https://www.youtube.com/watch?v=qe3mahuoYlw
 */
const camera1 = new THREE.PerspectiveCamera(
  75, // 시야각, 화각 - 높을 수록 광곽(원근법이 과하게 적용됨)
  // window.innerWidth / window.innerHeight,
  200 / 200, // 종횡비  - 가로/세율 비율 - viewport 기준으로 따라가는게 일반적
  0.1, // 카메라가 시작하는 위치
  1000 // 카메라가 멈추는 위치
)
const camera2 = new THREE.OrthographicCamera(
  -2, 2, 2, -2
)


// camera2.position.z = 2
camera2.position.set(0, 0, 6)
camera1.position.y = 3
camera1.lookAt(new THREE.Vector3(0, 0, 0))


const canvas1 = document.querySelector('#c1') as HTMLCanvasElement;
const canvas2 = document.querySelector('#c2') as HTMLCanvasElement;
const canvas3 = document.querySelector('#c3') as HTMLCanvasElement;
const canvas4 = document.querySelector('#c4') as HTMLCanvasElement;

/**
 * 03. Renderer
 *   - scene을 HTML canvas element로 표현
 *   - 기본적으로 WebGL을 통해 표현
 *   - GPU 자원 사용
 */
const renderer1 = new THREE.WebGLRenderer({canvas: canvas1})
// renderer.setSize(window.innerWidth, window.innerHeight)
renderer1.setSize(200, 200)

const renderer2 = new THREE.WebGLRenderer({canvas: canvas2})
renderer1.setSize(200, 200)
const renderer3 = new THREE.WebGLRenderer({canvas: canvas3})
renderer1.setSize(200, 200)
const renderer4 = new THREE.WebGLRenderer({canvas: canvas4})
renderer1.setSize(200, 200)
document.body.appendChild(renderer1.domElement)

new OrbitControls(camera1, renderer1.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera1.aspect = window.innerWidth / window.innerHeight
  camera1.updateProjectionMatrix()
  renderer1.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0.01
  render()
}

function render() {
  renderer1.render(scene, camera1)
  renderer2.render(scene, camera2)
  renderer3.render(scene, camera1)
  renderer4.render(scene, camera1)
}

animate()
