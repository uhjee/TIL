// 필요데이터: contactlist 연락처 목록 데이터
<template>
  <div>
    <p class="addnew">
      <button class="btn btn-primary" @click="addContact()">새 연락처 추가</button>
    </p>
    <div id="example">
      <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>사진</th>
            <th>편집/삭제</th>
          </tr>
        </thead>
        <tbody id="contacts">
          <tr v-for="(contact) in contactlist.contacts" :key="contact.no">
            <td>{{contact.name}}</td>
            <td>{{contact.tel}}</td>
            <td>{{contact.address}}</td>
            <td>
              <img class="thumbnail" :src="contact.photo" @click="editPhoto(contact.no)" />
            </td>
            <td>
              <button class="btn btn-primary" @click="editContact(contact.no)">편집</button>
              <button class="btn btn-primary" @click="deleteContact(contact.no)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import eventBus from "../EventBus";
import Constant from "../constant";
import { mapState } from "vuex";

export default {
  name: "contactList",
  // refactoring 전...... ----------------------------------------------
  //   자신이 데이터를 갖지 않고, 상위 컴포넌트로부터 전달받아 화면에 나타내기만 한다
  // 상태가 없는 컴포넌트(Stateless componenet)라 한다
  // props: ["contactlist"],
  //   evnet 등록.. eventBus객체를 통해 App.vue에서 $on 으로 이벤트 핸들링

  // 이벤트 버스에서는 props으로 받아왔지만, 이제는 store에 직접 접근해서 가져온다.
  // 가공없이 순수한 getter역할을 하는 computed 내부 mapState
  computed: mapState({
    contactlist: "contactlist",
  }),

  // refactoring 전...... ----------------------------------------------
  // methods: {
  //   addContact() {
  //     // 새연락처 추가 btn 클릭시 입력 폼을 나타내기 위한 이벤트
  //     eventBus.$emit("addContactForm");
  //   },
  //   editContact(no) {
  //     // 조회하는 리스트 중 편집 버튼을 클릭했을 때 해당 연락처의 no를 가지고 수정 폼으로 가는 이벤트
  //     eventBus.$emit("editContactForm", no);
  //   },
  //   deleteContact(no) {
  //     if (confirm("정말로 삭제할거에요?") == true) {
  //       eventBus.$emit("deleteContact", no);
  //     }
  //   },
  //   editPhoto(no) {
  //     eventBus.$emit("editPhoto", no);
  //   },
  // },
  methods: {
    // Action of store 호출...
    addContact() {
      this.$store.dispatch(Constant.ADD_CONTACT_FORM);
    },
    editContact(no) {
      this.$store.dispatch(Constant.EDIT_CONTACT_FORM, { no: no });
    },
    deleteContact(no) {
      this.$store.dispatch(Constant.DELETE_CONTACT, { no: no });
    },
    editPhoto(no) {
      this.$store.dispatch(Constant.EDIT_PHOTO_FORM, { no: no });
    },
  },
};
</script>

<style scoped>
.addnew {
  margin: 10px auto;
  max-width: 820px;
  min-width: 820px;
  padding: 40px 0px 0px 0px;
  text-align: left;
}
#example {
  margin: 10px auto;
  max-width: 820px;
  min-width: 820px;
  padding: 0px;
  position: relative;
  font: 13px "verdana";
}
#example .long {
  width: 100%;
}
#example .short {
  width: 50%;
}
#example input,
textarea,
select {
  box-sizing: border-box;
  border: 1px solid #bebebe;
  padding: 7px;
  margin: 0px;
  outline: none;
}
#list {
  width: 800px;
  font: 13px "verdana";
}
#list thead tr {
  color: yellow;
  background-color: purple;
}
#list th:nth-child(5n + 1),
#list td:nth-child(5n + 1) {
  width: 200px;
}
#list th:nth-child(5n + 2),
#list td:nth-child(5n + 2) {
  width: 150px;
}
#list th:nth-child(5n + 3),
#list td:nth-child(5n + 3) {
  width: 250px;
}
#list th:nth-child(5n + 4),
#list td:nth-child(5n + 4) {
  width: 60px;
}
#list th:nth-child(5n),
#list td:nth-child(5n) {
  width: 150px;
}
#list th {
  padding: 10px 5px 10px 5px;
}
#list tr {
  border-bottom: solid 1px black;
}
#list td,
#list th {
  text-align: center;
  vertical-align: middle;
}
img.thumbnail {
  width: 48px;
  height: 48px;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  cursor: pointer;
}
</style>