import restart from 'vite-plugin-restart'

export default {
    root: 'src/', // 소스 파일들 (일반적으로 index.html이 있는 위치)
    publicDir: '../static/', // "root"에서 정적 자산까지의 경로 (있는 그대로 제공되는 파일들)
    server:
    {
        host: true, // 로컬 네트워크에 열고 URL 표시
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // CodeSandbox가 아닌 경우에만 열기
    },
    build:
    {
        outDir: '../dist', // dist/ 폴더에 출력
        emptyOutDir: true, // 먼저 폴더를 비움
        sourcemap: true // 소스맵 추가
    },
    plugins:
    [
        restart({ restart: [ '../static/**', ] }) // 정적 파일이 변경되면 서버 재시작
    ],
}