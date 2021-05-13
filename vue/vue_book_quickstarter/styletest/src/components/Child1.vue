<template>
  <div class="main test">
    {{ msg }}
    <child11></child11>
    {{ msg }}
  </div>
</template>

<script>
import Child11 from "./Child11.vue";

export default {
  name: "child1",
  components: { Child11 },
  data() {
    return {
      msg: "Child1"
    };
  }
};
</script>

<style scoped>
/* 전역으로 등록되기 때문에, 다른 컴포넌트에 동명으로 등록된 스타일이 있다면  */
/* 충돌한다. */
/* 따라서 <style scoped> 속성을 부여한다. */
.main {
  border: solid 1px black;
  background-color: lawngreen;
}
.test {
  padding: 10px;
  text-decoration: underline;
  border: solid 1px black;
}
</style>
