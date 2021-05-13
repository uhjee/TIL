// 필요 데이터 : mode :: 쓰기 / 수정 여부
// 입력 폼, 수정 폼이 참조하는 컴포넌트
<template>
  <div class="modal">
    <!-- esc 키를 눌렀을 때 폼이 사라지도록 하기 위해 이벤트 등록 -->
    <div class="form" @keyup.esc="cancelEvent">
      <h3 class="heading">:: {{headingText}}</h3>
      <!-- data 옵션의 mode에 따라서 동적으로 화면 구성 -->
      <div v-if="mode=='update'" class="form-group">
        <label>일련번호</label>
        <input type="text" name="no" class="long" disabled v-model="contact.no" />
      </div>
      <div class="form-group">
        <label>이름</label>
        <!-- ref를 통한 직접 참조 -->
        <input
          type="text"
          name="name"
          class="long"
          v-model="contact.name"
          ref="name"
          placeholder="이름을 입력하세요"
        />
      </div>
      <div class="form-group">
        <label>전화번호</label>
        <input type="text" name="tel" class="long" v-model="contact.tel" placeholder="전화번호를 입력하세요" />
      </div>
      <div class="form-group">
        <label>주 소</label>
        <input
          type="text"
          name="address"
          class="long"
          v-model="contact.address"
          placeholder="주소를 입력하세요"
        />
      </div>
      <div class="form-group">
        <div>&nbsp;</div>
        <input type="button" class="btn btn-primary" v-bind:value="btnText" @click="submitEvent()" />
        <input type="button" class="btn btn-primary" value="취 소" @click="cancelEvent()" />
      </div>
    </div>
  </div>
</template>

<script>
// import eventBus from "../EventBus";

import Constant from "../constant";
import { mapState } from "vuex";
import _ from "lodash";

export default {
  name: "contactForm",

  // refactoring 전...... ----------------------------------------------
  // // props 배열식이 아닌 객체형으로 선언 가능
  // props: {
  //   //   동적으로 화면을 구성하기 위한 옵션값
  //   // 객체형일 경우 type과 default값 설정 가능
  //   mode: { type: String, default: "add" },
  //   contact: {
  //     type: Object,
  //     //   아래처럼 default값을 함수의 return값으로 설정 가능
  //     // javascript에서는 함수도 객체이기 때문에 문제 없다
  //     default() {
  //       return { no: "", name: "", tel: "", address: "", photo: "" };
  //     },
  //   },
  // },
  mounted() {
    //   DOM 객체에 직접참조하여 DOM API 사용
    this.$refs.name.focus();
  },
  // refactoring 전...... ----------------------------------------------
  //   mode값에 따라서 다른 값이 출력될 것들을 위해 computed 속성 활용
  // computed: {
  //   btnText: function () {
  //     if (this.mode != "update") return "추 가";
  //     else return "수 정";
  //   },
  //   headingText: function () {
  //     if (this.mode != "update") return "새 연락처 추가";
  //     else return "연락처 변경";
  //   },
  // },
  computed: _.extend(
    {
      btnText() {
        if (this.mode != "update") {
          return "추가";
        } else return "수정";
      },
      headingText() {
        if (this.mode != "update") return "새 연락처 추가";
        else return "연락처 변경";
      },
    },
    mapState({
      mode: "mode",
      contact: "contact",
    })
  ),
  // refactoring 전...... ----------------------------------------------
  // methods: {
  //   //   submit 이벤트 동적 할당
  //   submitEvent() {
  //     if (this.mode == "update") {
  //       eventBus.$emit("updateSubmit", this.contact);
  //     } else {
  //       eventBus.$emit("addSubmit", this.contact);
  //     }
  //   },
  //   cancelEvent() {
  //     eventBus.$emit("cancel");
  //   },
  // },
  methods: {
    submitEvent() {
      if (this.mode == "update") {
        this.$store.dispatch(Constant.UPDATE_CONTACT);
      } else {
        this.$store.dispatch(Constant.ADD_CONTACT);
      }
    },
    cancelEvent() {
      this.$store.dispatch(Constant.CANCEL_FORM);
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.form {
  background-color: white;
  margin: 100px auto;
  max-width: 400px;
  min-width: 200px;
  font: 13px "verdana";
  padding: 10px 10px 10px 10px;
}
.form div {
  padding: 0;
  display: block;
  margin: 10px 0 0 0;
}
.form label {
  text-align: left;
  margin: 0 0 3px 0;
  padding: 0px;
  display: block;
  font-weight: bold;
}
.form input,
textarea,
select {
  box-sizing: border-box;
  border: 1px solid #bebebe;
  padding: 7px;
  margin: 0px;
  outline: none;
}
.form .long {
  width: 100%;
}
.form .button {
  background: #2b798d;
  padding: 8px 15px 8px 15px;
  border: none;
  color: #fff;
}
.form .button:hover {
  background: #4691a4;
}
.form .heading {
  background: #33a17f;
  font-weight: 300;
  text-align: left;
  padding: 20px;
  color: #fff;
  margin: 5px 0 30px 0;
  padding: 10px;
  min-width: 200px;
  max-width: 400px;
}
</style>