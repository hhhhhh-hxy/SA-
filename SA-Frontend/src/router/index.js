import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login/login.vue';
import TeacherCoursework from '../pages/teacherCoursework/teacherCoursework.vue'
import StuAllHomework from '../pages/stuALLHomework/StuAllHomework.vue'
import teacher_home from '../pages/teacher_home/jiaoshizhuye.vue'
import teachercourseStudent from '../pages/teachercourseStudent/kechengxuesheng.vue'
import teachercheckhw from '../pages/teachercheckhw/teachercheckhw.vue'
import xueshengzhuye from '../pages/teacher_home/jiaoshizhuye.vue'
import xueshengxuanke from '../pages/stu_homeselected/xueshengzhuye.vue'
import Stusubmit_record from '../pages/stusubmit_record/stusubmit_record.vue';
import Pigaizuoye2 from '../pages/teacher_correct2/pigaizuoye2.vue';
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
    path: '/teacher_correct2',
    name: 'teacher_correct2',
    component: Pigaizuoye2,
  },
  {
    path: '/teachercheckhw/:id',
    name: 'teachercheckhw',
    component: teachercheckhw,
  },
  {
    path: '/teacher_home',
    name: 'teacher_home',
    component: teacher_home,
  },
  {
    path: '/teachercourseStudent',
    name: 'teachercourseStudent',
    component: teachercourseStudent,
  },
  {
    path: '/xueshengzhuye',
    name: 'xueshengzhuye',
    component: xueshengzhuye,
  },
  {
    path: '/xueshengxuanke',
    name: 'xueshengxuanke',
    component: xueshengxuanke,
  },
  {
    path: '/stusubmit_record',
    name: 'stusubmit_record',
    component: Stusubmit_record,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;