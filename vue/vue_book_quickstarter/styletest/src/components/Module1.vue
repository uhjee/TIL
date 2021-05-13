<template>
  <div>
    <!-- Vue Instance 내에서 $style이라는 계산형 속성을 통해서 이용 -->
    <!-- 내부적으로 충돌되지 않도록 ".hand" 가 아니라, 난수로 생성하여 class 적용 -->
    <!-- 적용해야할 CSS 클래스가 여러 개라면 배열문법 사용 가능 -->
    <!-- <button :class="[$style.hand, $style.border]">CSS Module을 적용한 버튼</button> -->
    <button :class="$style.hand">CSS Module을 적용한 버튼</button>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$style);
  }
};
</script>

<style module>
.hand {
  cursor: pointer;
  background-color: lightpink;
  color: lightyellow;
}
</style>
