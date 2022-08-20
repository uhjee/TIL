<template>
  <div class="child">
    <h2>자식 컴포넌트</h2>
    <button @click="isOpenModal = true">Modal</button>
  </div>
  <MyModal
    :is-open-modal="isOpenModal"
    title="타이틀"
    @close="isOpenModal = false"
  >
    <template #content>
      <div>테스트 모달입니다.</div>
    </template>
  </MyModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyModal from "@/components/MyModal.vue";

const isOpenModal = ref<boolean>(false);
</script>

<style scoped lang="scss">
.child {
  margin: 20px 40px;
  padding: 10px 20px;
  border: 1px solid #2c3e50;
  border-radius: 6px;

  button {
    box-sizing: border-box;
    font-size: 30px;
    outline: none;
    background-color: #2c3e50;
    border: none;
    border-radius: 12px;
    padding: 4px 12px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
