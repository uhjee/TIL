<template>
  <div id="app">
    <div class="container">
      <div class="form-group">
        <button @click="fetchContacts">1페이지 연락처 조회</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="name" placeholder="이름 입력" />
        <input type="text" v-model="tel" placeholder="전화번호 입력" />
        <input type="text" v-model="address" placeholder="주소 입력" />
        <button @click="addContact">연락처 1건 추가</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="no" />
        <button @click="fetchContactOne">연락처 1건 조회</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="no" />
        <input type="text" v-model="name" placeholder="이름 입력" />
        <input type="text" v-model="tel" placeholder="전화번호 입력" />
        <input type="text" v-model="address" placeholder="주소 입력" />
        <button @click="updateContact">연락처 수정</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="no" />
        <button @click="deleteContact">삭제</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="no" />
        <!-- axios를 이용해서 파일 업로드 기능을 구현하기 위해서는 이 필드를 직접 참조해야 한다. -->
        <!-- ref="photofile" 을 통해 직접 참조 가능 -->
        <input type="file" ref="photofile" name="photo" />
        <button @click="changePhoto">파일 변경</button>
      </div>
    </div>
    <span>Print JSON</span>
    <div id="result" class="container">
      <xmp>{{ result }}</xmp>
    </div>
  </div>
</template>

<script>
// main.js에 전역으로 import 받으면 아래처럼 Vue에 각각 쓰지 않아도 된다.
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      no: 0,
      name: "",
      tel: "",
      address: "",
      result: null,
    };
  },
  methods: {
    fetchContacts: function () {
      // axios 저수준 메소드: 모든 전달값을 config 객체로 전달한다.
      axios({
        method: "GET",
        url: "/api/contacts",
        params: { pageno: 1, pagesize: 5 }, // Query-String으로 전달되는 파라미터
      })
        .then((response) => {
          console.log("fetchContacts response: ", response);
          this.result = response.data;
        })
        .catch((ex) => {
          console.log(`ERORR!!!!!: ${ex}`);
        });
    },
    addContact: function () {
      // post방식은 주로 axios.post(url, data, config) 형식으로 주로 사용
      axios
        .post(
          "/api/contacts",
          //data
          {
            name: this.name,
            tel: this.tel,
            address: this.address,
          }
        )
        .then((response) => {
          console.log("addContact response: ", response);
          this.result = response.data;
          this.no = response.data.no;
        })
        .catch((ex) => console.log(`ERROR!!!!!!! ${ex}`));
    },
    fetchContactOne: function () {
      // axios 저수준 메소드 :: 별칭 메소드 axios.get() 사용
      axios.get(`/api/contacts/${this.no}`).then((response) => {
        console.log("response: ", response);
        this.result = response.data;
      });
    },
    updateContact: function () {
      axios
        .put(`/api/contacts/${this.no}`, {
          name: this.name,
          tel: this.tel,
          address: this.address,
        })
        .then((response) => {
          console.log("updateContact", response);
          this.name = "";
          this.tel = "";
          this.address = "";
          this.result = response.data;
        })
        .catch((ex) => console.log(`ERORR!!!!!! ${ex}`));
    },
    deleteContact: function () {
      axios
        .delete(`/api/contacts/${this.no}`)
        .then((response) => {
          console.log("deleteContact", response);
          this.no = 0;
          this.result = response.data;
        })
        .catch((ex) => console.log(`ERRO!!!!!R ${ex}`));
    },
    changePhoto: function () {
      // FormData 객체 생성
      let data = new FormData();
      //   ref 옵션을 이용해 파일 필드를 직접 참조하여 FormData 객체에 추가
      let file = this.$refs.photofile.files[0];
      data.append("photo", file);

      axios
        .post(`/api/contacts/${this.no}/photo`, data)
        .then((response) => (this.result = response.data))
        .catch((ex) => console.log(`Error!!!!! ${ex}`));
    },
  },
};
</script>

<style>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  border: solid 1px gray;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
}
#result {
  text-align: left;
  padding: 20px;
  border: solid 1px black;
}
.form-group {
  border: dashed 1px gray;
  padding: 5px 5px 5px 20px;
}
</style>
