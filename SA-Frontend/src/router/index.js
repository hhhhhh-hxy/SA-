import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login/login.vue';
import TeacherCoursework from '../pages/teacherCoursework/teacherCoursework.vue'
import StuAllHomework from '../pages/stuALLHomework/StuAllHomework.vue'
import teacher_home from '../pages/teacher_home/jiaoshizhuye.vue'

import Pigaizuoye1 from '../pages/pigaizuoye1/pigaizuoye1.vue';
import Pigaizuoye2 from '../pages/pigaizuoye2/pigaizuoye2.vue';
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
    path: '/pigaizuoye1',
    name: 'pigaizuoye1',
    component: Pigaizuoye1,
  },
  {
    path: '/pigaizuoye2',
    name: 'pigaizuoye2',
    component: Pigaizuoye2,
  },
  {
    path: '/teacher_home',
    name: 'teacher_home',
    component: teacher_home,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;