<template>
  <div>
    {{ count }}
  </div>
</template>

<script>
export default {
  name: 'CountItem',
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
}
</script>
