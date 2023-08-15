<template>
  <div id="app">
    <List/>
    <PeopleList/>
  </div>
</template>

<script>
import List from './components/CountList'
import PeopleList from '@/components/PeopleList';

export default {
  name: 'App',
  components: {List,PeopleList}
}
</script>

<style>
</style>
