import {testMakePerson} from './utils/makePerson'
// index.ts 네이밍 이유? 
//    -> 엔트리 함수 (index.html 과 같음)
//    -> node 와 ts-node는 모두 ./src/index.ts 를 기본으로 바라보고 있다.

testMakePerson()