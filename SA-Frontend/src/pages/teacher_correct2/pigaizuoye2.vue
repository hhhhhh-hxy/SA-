<script setup>
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted,ref } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const showModal = ref(false);
const token = localStorage.getItem('token');
console.log(token);

// 获取作业id
const homeworkId = route.query.id;
const teacherId = route.query.teacherId;
const courseName = route.query.courseName;

// console.log('homeworkId:', homeworkId);  
// console.log('teacherId:', teacherId);
// console.log('courseName:', courseName);

const homeworkScore = ref('');
const homeworkComments = ref('');

const homeworks = reactive([]);
const status = 2;

// 挂载时获取作业信息展示在页面
onMounted(async () => {
  await fetchHomeworks();
});


//展示课程
const fetchHomeworks = async () => {
  try {
    const homeworkResponse = await axios.get(
     //`http://localhost:8081/submission/teacher/getAll/${homeworkId}?status=${status}`, {
      `http://127.0.0.1:4523/m1/4275697-3917645-default/submission/teacher/getAll/${homeworkId}`,status, {
        headers: {
          token: `${token}`,
        }
      }
    );
    const homeworksData = homeworkResponse.data.data;
    console.log("homeworkData:", homeworksData);

    homeworks.splice(0);
    homeworks.push(...homeworksData);

    console.log('作业详情：', homeworks);

  } catch (error) {
    console.error('获取作业详情失败', error);
  }
};

const goBack = () => {
  router.push({path:'/teacher_home',query: {teacherId: teacherId}});  //跳转到教师主页
};

const goTogradedPage = () => {
  router.push({name: 'teachercheckhw', params: { id: homeworkId, teacherId: teacherId, courseName:courseName}});  // 跳转到未批改作业页面
};

//传入批改作业的数据
const saveHwCmt = async (submitID) => {
  const postData = {
  submissionId: submitID,
  score: parseFloat(homeworkScore.value), // 将字符串转换为数字
  comment: homeworkComments.value
};
  try {
    const response = await axios.post('http://127.0.0.1:4523/m1/4275697-3917645-default/grade/teacher/correct', postData, {
    //const response = await axios.post('http://localhost:8081/grade/teacher/correct', postData, {
      headers: {
        token: `${token}`  
      }
    });
    console.log('成功:', response.data.data);
    homeworkScore.value = '';
    homeworkComments.value = '';
    // 关闭模态框
    showModal.value = false;
    //重新加载页面
    fetchHomeworks();

  } catch (error) {
    console.error('错误:', error);
  }
};
</script>

<template>
  <div class="page">
    <div class="header">
      <div class="logo-title">
        <img
          class="logo"
          src="https://ide.code.fun/api/image?token=66599d92a16e9e001250e3c1&name=8bd85cbb23a1e00189933e111b07158c.png"
        />
        <span class="title">学习平台</span>
      </div>
      <div class="header-actions">
        <span @click="goBack" class="link">教师主页</span>
        <div class="user-info">
          <span>教师id: {{ teacherId }}</span>
          <div class="separator"></div>
          <span class="link">退出</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="tabs">
        <span class="tab" @click="goTogradedPage()">已批改</span>
        <span class="tab active">待批改</span>
      </div>
      <div class="homework-list">
        <div class="homework-header">
          <span class="header-item">作业</span>
          <span class="header-item">课程</span>
          <span class="header-item">学生</span>
          <span class="header-item">作业详情</span>
          <span class="header-item">批改作业</span>
        </div>
        <div class="homework-item" v-for="(homework, index) in homeworks" :key="index">
          <span class="item">{{ homework.submitId }}</span>
          <span class="item">{{ courseName }}</span>
          <span class="item">{{ homework.studentName }}</span>
          <span class="item">{{ homework.content }}</span>
          <span @click="showModal = true" class="itempigai">批改作业</span>
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <!-- Modal header -->
              <div class="modal-header">
                <span class="modal-title">批改作业</span>
                <span @click="showModal = false" class="close-modal-button">&times;</span>
              </div>
              <!-- Modal body -->
              <div class="modal-body">
                <div class="form-group">
                  <label for="homeworkScore">作业评分</label>
                  <input type="text" id="homeworkScore" v-model="homeworkScore" placeholder="请输入作业评分" />
                </div>
                <div class="form-group">
                  <label for="homeworkComments">作业评语</label>
                  <textarea id="homeworkComments" v-model="homeworkComments" placeholder="请输入作业评语"></textarea>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="modal-footer">
                <button @click="saveHwCmt(homework.submitId)" class="confirm-button">确认</button>
              </div>
            </div>
          </div>
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
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.homework-header {
  background-color: #f5f5f5;
  font-weight: bold;
}

.header-item,
.item,.itempigai {
  flex: 1;
  text-align: center;
}

.item {
  word-break: break-all;
}
.itempigai{
  color: #0077ff;
  cursor: pointer;
}

.homework-item:last-child {
  border-bottom: none;
}

.confirm-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  white-space: nowrap;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 10px;
  width: 500px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
}

.close-modal-button {
  font-size: 24px;
  cursor: pointer;
  color: #aaa;
}

.close-modal-button:hover {
  color: #000;
}

.modal-body {
  margin: 20px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff;
  outline: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
