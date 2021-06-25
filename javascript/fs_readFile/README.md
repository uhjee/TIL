## lint error 추출

1. powershell 로 ~/app 경로 열기
    - Date 관련 코드 변수 담기
      ```shell
      $ $dt = date
      $ $newdt = $dt.ToString('yyyyMMdd__hh_mm')  
      ```

1.  아래와 같이 dev server 올리기
    - powershell 로 실행
        ```shell
        $ yarn dev | tee c:\personal\TIL\javascript\fs_readFile\dev_logs\dev_log__$newdt.txt
        ``` 
1. 현재 프로젝트를 패스 기준으로 `./dev-logs/dev_log[현재 date]].txt` 을 복사해 `./dev_log.txt` 생성
    -  인코딩을 UTF-8 로 변경

1. 현재 프로젝트 `npm run dev` 돌리기