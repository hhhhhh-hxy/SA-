import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login/login.vue';
import TeacherCoursework from '../pages/teacherCoursework/teacherCoursework.vue'
import StuAllHomework from '../pages/stuALLHomework/StuAllHomework.vue'
import Pigaizuoye1 from '../pages/pigaizuoye1/pigaizuoye1.vue';

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
    component: teachercheckhw,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;