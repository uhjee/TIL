<template>
  <div>
    <div>
      <count-item v-for="index of 20" :key="index"/>
    </div>
    <button @click="increment">증가</button>
  </div>
</template>

<script>
import CountItem from '@/components/CountItem';

export default {
  name: 'CountList',
  components: {CountItem},
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    increment() {
      this.$store.dispatch('increment');
    }
  }
}

</script>
