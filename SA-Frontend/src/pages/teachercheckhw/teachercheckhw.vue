<script setup>
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const token = localStorage.getItem('token');
console.log(token);

// 获取作业id
const homeworkId = route.params.id;
const id = homeworkId;
const teacherId = route.params.teacherId;
const courseName = route.params.courseName;

console.log('homeworkId:', homeworkId);  // 调试 homeworkId

const homeworks = reactive([]);
const homework = reactive({});
const status = 1;
// 挂载时获取作业信息展示在页面
onMounted(async () => {
  try {
    const homeworkResponse = await axios.get(
      //`http://localhost:8081/submission/teacher/getAll/${id}?status=${status}`,{
      `http://127.0.0.1:4523/m1/4275697-3917645-default/submission/teacher/getAll/${id}?status=${status}`,{
      
        headers: {
          token: `${token}`,
        }
      }
    );
    const homeworksData = homeworkResponse.data.data;
    console.log("homeworkData:", homeworksData);

    homeworks.splice(0);
    homeworks.push(...homeworksData);
    /* homeworks.push(...homeworksData.filter(item => item.status === 1).map(item => ({
      submitId: item.submitId,
      comment: item.comment,
      studentid: item.studentid,
      studentName: item.studentName,
      submitTime: item.submitTime,
      content: item.content,
      status: item.status,
      statusDesc: item.statusDesc,
      score: item.score
    }))); */

    console.log('作业详情：', homeworks);

  } catch (error) {
    console.error('获取作业详情失败', error);
  }
});

const goBack = () => {
  router.push({path:'/teacher_home',query: {teacherId: teacherId}});  //跳转到教师主页
};

const goToUngradedPage = () => {
  router.push({ path: '/teacher_correct2', query: {id:homeworkId, teacherId: teacherId, courseName:courseName} });  // 跳转到未批改作业页面
};
</script>

<template>
  <div class="page">
    <div class="header">
      <div class="logo-title">
        <img
          class="logo"
          src="https://ide.code.fun/api/image?token=66599d92a16e9e001250e3c1&name=8bd85cbb23a1e00189933e111b07158c.png"
          alt="Logo"
        />
        <span class="title">学习平台</span>
      </div>
      <div class="header-actions">
        <span @click="goBack" class="link">教师主页</span>
        <div class="user-info">
          <span>教师ID: {{ teacherId }}</span>
          <div class="separator"></div>
          <span class="link">退出</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="tabs">
        <span class="tab active">已批改</span>
        <span class="tab" @click="goToUngradedPage">待批改</span>
      </div>
      <div class="homework-list">
        <div class="homework-header">
          <span class="header-item">作业</span>
          <span class="header-item">课程</span>
          <span class="header-item">学生</span>
          <span class="header-item">作业详情</span>
          <span class="header-item">分数</span>
          <span class="header-item">评语</span>
        </div>
        <div class="homework-item" v-for="(homework, index) in homeworks" :key="index">
          <span class="item">{{ homework.submitId }}</span>
          <span class="item">{{ courseName }}</span>
          <span class="item">{{ homework.studentName }}</span>
          <span class="item">{{ homework.content }}</span>
          <span class="item">{{ homework.score }}</span>
          <span class="item">{{ homework.comment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="css">
.page {
  padding: 20px;
  background-color: #fbfbfd;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.logo-title {
  display: flex;
  align-items: center;
}

.logo {
  width: 38px;
  height: 40px;
}

.title {
  margin-left: 20px;
  font-size: 20px;
  font-family: SourceHanSansCN, sans-serif;
  font-weight: bold;
  color: #000;
}

.header-actions {
  display: flex;
  align-items: center;
}

.link {
  cursor: pointer;
  color: #0077ff;
  margin-left: 20px;
  font-size: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 40px;
}

.separator {
  width: 1px;
  height: 25px;
  background-color: #000;
  margin: 0 15px;
}

.content {
  padding-top: 20px;
}

.tabs {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.tab {
  font-size: 18px;
  margin-right: 20px;
  cursor: pointer;
  color: #000;
  font-weight: bold;
}

.tab.active {
  color: #0077ff;
}

.homework-list {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.homework-header,
.homework-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.homework-header {
  background-color: #f5f5f5;
  font-weight: bold;
}

.header-item,
.item {
  flex: 1;
  text-align: center;
}

.item {
  word-break: break-all;
}

.homework-item:last-child {
  border-bottom: none;
}
</style>
