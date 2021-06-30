<template>
  <div class="item-box">
    <div class="done-btn">
      <circle-btn @click="changeDoneFlag" :color="todo.color" :isDone="todo.isDone" whSize="20" />
    </div>
    <div :class="['content', { 'content-done': todo.isDone }]">{{ todo.content }}</div>
    <div class="etc-group">
      <div class="close-btn">close</div>
      <div class="date">{{ todo.date }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CircleBtn from './components/CircleBtn.vue';

export default defineComponent({
  name: 'ItemBox',
  components: {
    CircleBtn,
  },
  props: {
    todo: {
      type: Object,
    },
  },
  setup(props, context) {
    // console.log(props.todo);
    const changeDoneFlag = (): void => {
      context.emit('changeDoneFlag', {
        ...props.todo,
        isDone: !props?.todo?.isDone,
      });
    };
    return {
      changeDoneFlag,
    };
  },
});
</script>

<style scoped lang="scss">
.item-box {
  margin-bottom: 10px;
  height: 70px;
  width: calc(100% - 10px);
  border: 2px solid #999;

  display: flex;
  align-items: center;

  & > * {
    padding: {
      left: 10px;
      right: 10px;
    }
  }

  .done-btn {
    flex: 0 0 40px;
    display: flex;
    justify-content: center;
  }
  .content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &-done {
      text-decoration-line: line-through;
    }
  }
  .etc-group {
    flex: 0 0 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;

    & > * {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .close-btn {
      font-size: 0.8rem;
    }
    .date {
    }
  }
}
</style>
