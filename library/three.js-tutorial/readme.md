# Three.js

- Boilerplate
    ```shell
    git clone https://github.com/Sean-Bradley/Three.js-TypeScript-Boilerplate.git
    cd Three.js-TypeScript-Boilerplate
    npm install
    npm run dev
    ```

- Boilerplate `statsgui`
    ```shell
    git clone https://github.com/Sean-Bradley/Three.js-TypeScript-Boilerplate.git
    cd Three.js-TypeScript-Boilerplate
    git checkout statsgui
    npm install
    npm run dev
    ```

## 1. Scene, Camera, Render

## 2. Animation Loop

## 3. Development

    - Stats Panel
    - Dat GUI

## 4. Object3D

- Three.js에서 제공하는 3D 오브제의 부모 클래스
- Meshes, Lights, Cameras, Scene 등 Object3D 상속
- WebGLRenderer.render() 함수의 첫 번째 파라미터 타입 Object3D
    - ```ts
      render(scene: Object3D, camera: Camera): void;
      ```
- Object3D의 주요 properties
  - Rotation
  - Position
  - Scale
  - Visibility
