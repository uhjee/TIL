<template>
  <div id="example">
    <table id="list">
      <thead>
        <tr>
          <th>번호</th>
          <th>국가명</th>
          <th>수도</th>
          <th>지역</th>
        </tr>
      </thead>
      <tbody id="contacts">
        <tr v-for="c in countries" :key="c.no">
          <td>{{ c.no }}</td>
          <td>{{ c.name }}</td>
          <td>{{ c.capital }}</td>
          <td>{{ c.region }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Constant from "../Constant";
import { mapGetters } from "vuex";

export default {
  name: "CountryList",
  computed: mapGetters({
    //   저장소에 이미 만들어둔 게터를 사용
    //  mapGetters{이 컴포넌트에서 사용할 alias : store에 getter 이름}
    countries: "countriesByRegion"
  })
};
</script>

<style scoped>
#list {
  width: 520px;
  border: 1px solid black;
  border-collapse: collapse;
}
#list td,
#list th {
  border: 1px solid black;
  text-align: center;
}
#list td:nth-child(4n + 1),
#list th:nth-child(4n + 1) {
  width: 100px;
}
#list td:nth-child(4n + 2),
#list th:nth-child(4n + 2) {
  width: 150px;
}
#list td:nth-child(4n + 3),
#list th:nth-child(4n + 3) {
  width: 150px;
}
#list td:nth-child(4n),
#list th:nth-child(4n + 1) {
  width: 120px;
}
#list > thead > tr {
  color: yellow;
  background-color: purple;
}
</style>
