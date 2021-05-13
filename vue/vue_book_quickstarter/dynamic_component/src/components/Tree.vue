
<template>
  <ul>
    <li v-for="(s, index) in subs" :key="index" :class="s.type">
      {{s.name}}
      <!-- 재귀 컴포넌트.. template에서 자기 자신을 호출하는 컴포넌트.. -->
      <!-- 반드시 nmae 옵션을 지정해야 가능 -->
      <tree :subs="s.subs"></tree>
    </li>
  </ul>
</template>

<script>
export default {
  // name 속성을 사용하여 호출하기 때문에 꼭 필요하다
  name: "tree",
  //   서브 목록에 다시 subs 속성이 있다면 이것들 다시 하위트리로 전달하기 위해 props 사용
  props: ["subs"],
};
</script>

<style>
</style>