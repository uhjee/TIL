<template>
  <nav class="title-bar">
    <my-button @click="currentTabComponent = 'Setup'" :color="isCurrentTab('Setup')">
      <template #text>
        Setup
      </template>
    </my-button>
    <my-button @click="currentTabComponent = 'List'" :color="isCurrentTab('List')">
      <template #text>
        Todo List
      </template>
    </my-button>
    <my-button @click="currentTabComponent = 'Other'" :color="isCurrentTab('Other')">
      <template #text>
        Other
      </template>
    </my-button>
  </nav>
  <div class="container">
    <component :is="currentTabComponent"> </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Setup from './components/Setup.vue';
import List from './components/List/index.vue';
import Other from './components/Other.vue';

import MyButton from './components/MyButton.vue';

export default defineComponent({
  name: 'App',
  components: {
    Setup,
    Other,
    MyButton,
    List,
  },
  data() {
    return {
      currentTabComponent: 'Setup',
    };
  },
  methods: {
    isCurrentTab(tabName: string): string {
      return this.currentTabComponent === tabName ? 'red' : 'grey';
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // margin: 60px 20px;

  .title-bar {
    padding: 10px 15px;
    height: 40px;
    border-bottom: 1px solid #777;
    margin-bottom: 20px;
  }

  .container {
    margin: 0 5px 20px 5px;
    display: flex;
    justify-content: center;
  }

  .row {
    display: flex;
    width: 100%;
    align-items: center;

    .col {
      margin: 10px 15px;
      width: 100%;
      border-right: 1px solid #888;

      &:last-child {
        border-right: none;
      }

      .row {
        margin: 5px 0;
      }
    }
  }
}
</style>
