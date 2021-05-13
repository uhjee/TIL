<template>
  <div>
    <div class="header">
      <h1 class="headerText">(주) OpenSG</h1>
      <nav>
        <ul>
          <li>
            <!-- click 이벤트로 changeMenu() 호출. 메소드 호출시 parameter 넣을 수 있다. -->
            <a href="#" @click="changeMenu('home')">Home</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('about')">About</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('contact')">Contact</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="container">
      <!-- 만약 뿌려줄 컴포넌트가 정적인 화면이라면 keep-alive 사용해서 캐싱처리... ㅑnclude에서 사용되는 이름은 각 컴포넌트의 name 속성 -->
      <keep-alive include="about, home">
        <!-- is 속성으로 로컬 컴포넌트를 바인딩하여 동적 컴포넌트 구현 -->
        <component :is="currentView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Contact from "./components/Contact.vue";

export default {
  components: {
    Home,
    About,
    Contact,
  },
  data() {
    return {
      currentView: "home",
    };
  },
  methods: {
    changeMenu(view) {
      this.currentView = view;
    },
  },
};
</script>

<style scoped>
.header {
  background-color: aqua;
  padding: 10px 0px 0px 0px;
}
.headerText {
  padding: 0px 20px 0px 20px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: purple;
}
li {
  float: left;
}
li a {
  display: block;
  color: yellow;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: aqua;
  color: black;
}
</style>