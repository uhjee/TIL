import Vue from 'vue'
import store from './store'
import TodoList from './components/TodoList.vue'

// App.vue 컴포넌트를 화면에 담기 위해 사용

new Vue({

  // 모든 컴포넌트에서 this.$store 로 접근 가능
  store,

  // 렌더링한 결과물을 #app 요소에 출력
  el: '#app',
  render: h => h(TodoList)
})
