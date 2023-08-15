<template>
  <div>
    <h3>Getters</h3>

    <ul>
      <li v-for="item of people" :key="item.name">
        {{ item.name }} / {{ item.age }}
      </li>
    </ul>

    <ul>
      <li v-for="item of oldMan" :key="item.name">
        {{ item.name }} / {{ item.age }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PeopleList',
  computed: {
    people() {
      return this.$store.state.people;
    },
    oldMan() {
      return this.$store.getters.oldMan;
    }
  }
}
</script>
