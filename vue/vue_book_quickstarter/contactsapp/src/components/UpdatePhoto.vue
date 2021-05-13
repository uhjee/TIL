// 필요 데이터 : 연락처 한 건 데이터
<template>
  <div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
      <!-- form 메소드와 data의 인코딩 타입 설정 -->
      <form method="post" enctype="multipart/form-data">
        <h3 class="heading">:: 사진 변경</h3>
        <input
          type="hidden"
          name="no"
          class="long"
          disabled
          v-model="contact.no"
        />
        <div>
          <label for>현재사진</label>
          <img class="thumb" :src="contact.photo" alt />
        </div>
        <div>
          <label for>사진 파일 선택</label>
          <label for>
            <!-- ref 속성을 이용해 직접 참조 -->
            <input
              type="file"
              ref="photofile"
              name="photo"
              class="long btn btn-default"
            />
          </label>
        </div>
        <div>
          <div>&nbsp;</div>
          <input
            type="button"
            class="btn btn-primary"
            value="변 경"
            @click="photoSubmit"
          />
          <input
            type="button"
            class="btn btn-danger"
            value="취 소"
            @click="cancelEvent"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import eventBus from "../EventBus";
import Constant from "../constant";
import { mapState } from "vuex";

export default {
  name: "updatePhoto",
  computed: mapState({
    contact: "contact"
  }),
  // props: ["contact"],
  methods: {
    cancelEvent() {
      // eventBus.$emit("cancel");
      this.$store.dispatch(Constant.CANCEL_FORM);
    },
    photoSubmit() {
      // console.log(this.$refs.photofile);
      let file = this.$refs.photofile.files[0];
      // this.contact.photo = file;
      // eventBus.$emit("updatePhoto", this.contact.no, file);
      this.$store.dispatch(Constant.UPDATE_PHOTO, {
        no: this.contact.no,
        file: file
      });
    }
  }
};
</script>

<style scoped>
.modal {
  z-index: 10;
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
  z-index: 10;
  background-color: white;
  margin: 100px auto;
  max-width: 400px;
  min-width: 200px;
  padding: 10px 10px 10px 10px;
  font: 13px "verdana";
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
img.thumb {
  width: 160px;
}
</style>
