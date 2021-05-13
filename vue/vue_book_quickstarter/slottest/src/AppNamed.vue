<template>
  <div id="app">
    <layout>
      <!-- 사용할 slot의 이름을 적어준다 -->
      <h1 slot="header">헤더 영역</h1>

      <div slot="sidebar">
        <ul class="menu">
          <li v-for="sidebar in sidebars" :key="index">
            <a v-bind:href="sidebar.link">{{ sidebar.menu }}</a>
          </li>
        </ul>
      </div>

      <div slot="content">
        <h2>컨텐트 영역</h2>
        <p>김수한무 가나다라마바사 거북이와 두루미</p>
        <p>김수한무 가나다라마바사 거북이와 두루미</p>
        <p>김수한무 가나다라마바사 거북이와 두루미</p>
        <p>김수한무 가나다라마바사 거북이와 두루미</p>
        <p>김수한무 가나다라마바사 거북이와 두루미</p>
      </div>

      <p slot="footer">Footer text</p>
    </layout>
  </div>
</template>

<script>
import Layout from "./components/NamedSlot.vue";
export default {
  data() {
    return {
      sidebars: [
        { menu: "HOME", link: "#" },
        { menu: "ABOUT", link: "#" },
        { menu: "CONTACT", link: "#" },
        { menu: "VUE.js", link: "#" },
      ],
    };
  },
  components: { Layout },
};
</script>

<style scoped>
ul.menu {
  position: relative;
  padding: 5px 5px 5px 5px;
  list-style: none;
  font-style: italic;
}

ul.menu a {
  text-decoration: none;
}
</style>
