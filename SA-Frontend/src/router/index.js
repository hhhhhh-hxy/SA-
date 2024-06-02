import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login/login.vue';
import TeacherCoursework from '../pages/teacherCoursework/teacherCoursework.vue'
import StuAllHomework from '../pages/stuALLHomework/StuAllHomework.vue'
import Teachercheckhw from '../pages/teachercheckhw/teachercheckhw.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/teacherCoursework',
    name: 'teacherCoursework',
    component: TeacherCoursework,
  },
  {
    path: '/stuAllHomework',
    name: 'stuAllHomework',
    component: StuAllHomework,
  },
  {
    path: '/teachercheckhw/:id',
    name: 'teachercheckhw',
    component: Teachercheckhw,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;