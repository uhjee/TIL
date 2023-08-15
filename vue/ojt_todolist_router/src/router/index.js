import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoList from '@/components/TodoList';
import TodoInputForm from '@/components/TodoInputForm';
import TodoDetail from '@/components/TodoDetail';

Vue.use(VueRouter);


const routes = [
  {path: '/add-todo', component: TodoInputForm},
  {path: '/todo/:id', component: TodoDetail},
  {path: '/todos', component: TodoList},
  {path: '/', component: TodoList},
]

const router = new VueRouter({
  routes,
})

export default router;
