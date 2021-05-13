<template>
  <!-- mode 값으로 입력 폼을 보여줄 지 수정 폼을 보여 줄 지 결정 -->
  <contactForm mode="add"></contactForm>
</template>

<script>
import ContactForm from "./ContactForm";

export default {
  name: "addContact",
  components: {
    ContactForm,
  },
};
</script>

<style>
</style>