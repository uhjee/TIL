// 필요 데이터 : contact :: 연락처 한 건 데이터
<template>
  <!-- mode 값으로 입력 폼을 보여줄 지 수정 폼을 보여 줄 지 결정 -->
  <contactForm mode="update" :contact="contact"></contactForm>
</template>

<script>
import ContactForm from "./ContactForm";

export default {
  name: "updateContact",
  components: {
    ContactForm,
  },
  //   App.vue 로부터 받은 데이터를 다시 ContactForm 에게 준다
  props: ["contact"],
};
</script>