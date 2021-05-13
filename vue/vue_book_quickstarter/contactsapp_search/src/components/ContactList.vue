<template>
  <div>
    <table id="list">
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>전화번호</th>
          <th>주소</th>
        </tr>
      </thead>
      <tbody id="contacts">
        <tr v-for="contact in contacts" :key="contact.no">
          <td>{{ contact.no }}</td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.tel }}</td>
          <td>{{ contact.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "contact-list",
  //   vuex helper method mapState를 사용해서 contacts 바로 가져오기
  // filtering 등 작업을 할 필요가 없으므로 getter가 아니라 state로 바로 가져온다.
  computed: mapState(["contacts"])
};
</script>

<style>
#list {
  width: 600px;
  border: 1px solid gray;
  border-collapse: collapse;
}

#list td,
#list th {
  border: 1px solid gray;
  text-align: center;
}
#list > thead > tr {
  color: white;
  background-color: teal;
}
</style>
