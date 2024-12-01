// Three.js 라이브러리 전체를 import
import * as THREE from 'three'

// HTML에서 'webgl' 클래스를 가진 canvas 요소를 선택
// 이 canvas에 Three.js 렌더링 결과가 출력됨
const canvas = document.querySelector('canvas.webgl')

// Scene(장면) 생성
// Scene은 3D 객체들이 배치되는 3차원 공간
const scene = new THREE.Scene()

/**
 * 3D 객체 생성
 * - Geometry: 3D 객체의 '형상'을 정의
 * - Material: 3D 객체의 '재질'을 정의
 * - Mesh: Geometry와 Material을 결합한 3D 객체
 */
// BoxGeometry: 육면체 형상 생성 (가로, 세로, 깊이가 각각 1인 정육면체)
const geometry = new THREE.BoxGeometry(1, 1, 1)

// MeshBasicMaterial: 가장 기본적인 재질
// 빛에 반응하지 않고 단순한 색상만 표현
// 0xff0000은 빨간색을 의미 (16진수 RGB)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// Mesh: geometry(형상)와 material(재질)을 결합한 실제 3D 객체
const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = 1

// 생성한 mesh를 scene에 추가
scene.add(mesh)

/**
 * 화면 크기 설정
 */
const sizes = {
    width: 800,   // 너비 800픽셀
    height: 600   // 높이 600픽셀
}

/**
 * 카메라 설정
 */
// PerspectiveCamera: 원근감이 있는 3D 카메라
// 매개변수: (시야각(FOV), 종횡비(aspect ratio))
// FOV 75도: 넓은 시야각으로 더 많은 공간을 보여줌(왜곡 존재)
// aspect ratio: 화면 너비/높이 비율
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

// 카메라 위치 설정
// 설정하지 않으면, 모든 위치는 중심에 위치
// z축 방향으로 3만큼 이동 (물체에서 멀어짐)
camera.position.z = 3
camera.position.x = -1
camera.position.y = 1

// 카메라를 scene에 추가
scene.add(camera)

/**
 * 렌더러 설정
 */
// WebGLRenderer: Three.js의 기본 렌더러
// canvas 요소와 연결
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

// 렌더러의 출력 크기 설정
renderer.setSize(sizes.width, sizes.height)

// scene과 camera를 이용해 실제 렌더링 수행
// 이 시점에서 canvas에 3D 그래픽이 그려짐
renderer.render(scene, camera)