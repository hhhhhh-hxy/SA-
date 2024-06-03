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
  <div class="flex-col page">
    <div class="flex-row justify-between items-center group">
      <div class="flex-row items-center">
        <img
          class="shrink-0 image"
          src="https://ide.code.fun/api/image?token=66599d92a16e9e001250e3c1&name=8bd85cbb23a1e00189933e111b07158c.png"
        />
        <span class="font text ml-21">学习平台</span>
      </div>
      <div class="flex-row items-center group_2">
        <span @click="goBack" class="fonta">教师主页</span>
        <div class="ml-62 flex-row items-center shrink-0">
          <span class="font">教师id:{{teacherId}}</span>
          <div class="shrink-0 section ml-23"></div>
          <span class="font text_3 ml-23">退出</span>
        </div>
      </div>
    </div>
    <div class="flex-col section_2">
      <div class="flex-row group_3">
        <span class="font_2 text_4 "@click="goTogradedPage">已批改</span>
        <span class="font_2 text_5 ml-45">待批改</span>
      </div>
      <div class="flex-col">
        <div class="flex-col list-item" v-for="(homework, index) in homeworks" :key="index">
          <div class="flex-row group_4">
            <div class="flex-row">
              <span class="font_3 text_6">作业:{{homework.submitId}}</span>
              <span class="font_3 ml-43">课程:{{courseName}}</span>
            </div>
            <span class="font_3 text_7 ml-102">学生:{{homework.studentName}}</span>
          </div>
          <div class="flex-row mt-13">
            <div class="flex-col justify-start items-start flex-1 text-wrapper">
              <span class="font_3 text_8">作业详情:{{homework.content}}</span>
            </div>
            <div class="flex-col items-start self-start group_5 ml-27">
              <button @click="showModal = true" class="confirm-button">批改作业</button>
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
    </div>
  </div>
</template>

<style scoped lang="css">
.ml-21 {
  margin-left: 1.31rem;
}
.ml-23 {
  margin-left: 1.44rem;
}
.ml-45 {
  margin-left: 2.81rem;
}
.ml-43 {
  margin-left: 2.69rem;
}
.ml-102 {
  margin-left: 6.38rem;
}
.mt-13 {
  margin-top: 0.81rem;
}
.ml-27 {
  margin-left: 1.69rem;
}
.mt-17 {
  margin-top: 1.06rem;
}
.page {
  padding: 0 2.5rem 2.81rem;
  background-color: #fbfbfd;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding: 1.88rem 0;
}
.image {
  width: 2.38rem;
  height: 2.5rem;
}
.font {
  font-size: 1.25rem;
  font-family: SourceHanSansCN;
  line-height: 1.15rem;
  color: #000000;
}
.fonta {
  font-size: 1.25rem;
  font-family: SourceHanSansCN;
  line-height: 1.15rem;
  cursor: pointer;
  color: #0077ff;
}
.text {
  line-height: 1.16rem;
}
.group_2 {
  margin-right: 0.63rem;
}
.text_2 {
  color: #0077ff;
  text-decoration: underline;
}
.section {
  background-color: #000000;
  width: 0.063rem;
  height: 1.56rem;
}
.text_3 {
  line-height: 1.15rem;
}
.section_2 {
  padding: 1.88rem 1.63rem 5.88rem;
  background-color: #ffffff;
  overflow: hidden;
}
.group_3 {
  padding: 1.38rem 3.38rem;
}
.font_2 {
  font-size: 2rem;
  font-family: SourceHanSansCN;
  line-height: 1.85rem;
}
.text_4 {
  color: #000000;
  cursor: pointer;
}
.text_5 {
  color: #0077ff;
}
.list-item {
  padding: 1.13rem 2rem;
  background-color: #fbfbfd;
  border-top: solid 0.063rem #b8b8b8;
}
.group_4 {
  padding: 0 0.5rem;
}
.font_3 {
  font-size: 1.69rem;
  font-family: SourceHanSansCN;
  line-height: 1.56rem;
  color: #000000;
}
.text_6 {
  line-height: 1.54rem;
}
.text_7 {
  line-height: 1.58rem;
}
.text-wrapper {
  padding: 0.63rem 0 8.75rem;
  background-color: #ffffff;
  height: 10.94rem;
}
.text_8 {
  margin-left: 0.38rem;
  line-height: 1.56rem;
}
.group_5 {
  margin-right: 5.63rem;
  margin-top: 4.63rem;
}
.text_9 {
  line-height: 1.51rem;
}
.confirm-button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
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
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
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
  border-color: #007BFF;
  outline: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>