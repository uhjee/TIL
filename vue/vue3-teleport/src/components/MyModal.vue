<template>
  <Teleport to="#modal-destination">
    <div v-if="isOpenModal" class="modal-container">
      <div>
        <div class="header">
          <h3>
            {{ title }}
          </h3>
          <span @click="emit('close')">&times;</span>
        </div>
        <div class="body">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  isOpenModal: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    box-sizing: border-box;
    width: 440px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    //padding: 12px 40px 30px 40px;
    position: fixed;
    display: flex;
    flex-direction: column;

    padding: 0 0 30px 0;

    & > * {
      margin: 0 24px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
