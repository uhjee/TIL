<template>
  <div>
    <button
      class="region"
      v-for="(region, index) in regions"
      :key="index"
      :class="isSelected(region)"
      @click="changeRegion({ region: region })"
    >
      <!-- region이라는 key로 v-for의 region을 매핑하여 payload에 담는다 -->
      <!-- ******************************************************* -->
      {{ region }}
    </button>
  </div>
</template>

<script>
import Constant from "../Constant";
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "RegionButtons",
  //   regions 게터 아래와 같은 의미 ... mapGetter라는 헬퍼메소드 사용
  //   computed: {
  //       region() {
  //           return this.$store.getters.regions;
  //       },
  //       currentRegion() {
  //           return this.$store.getters.currentRegion;
  //       }
  //   }
  computed: mapGetters(["regions", "currentRegion"]),
  methods: _.extend(
    {
      isSelected(region) {
        if (region == this.currentRegion) return { selected: true };
        else return { selected: false };
      }
    },
    // 이벤트 핸들러 .. 변이를 발생시킨다 (변이는 store에 정의)
    mapMutations([Constant.CHANGE_REGION])
  )
};
</script>

<style>
button.region {
  text-align: center;
  width: 80px;
  margin: 2px;
  border: solid 1px gray;
}
button.selected {
  background-color: purple;
  color: aqua;
}
</style>
