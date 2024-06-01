<script setup>
import { ref, onMounted } from 'vue';

const students = ref([]);
const errorMessage = ref('');

const courseId = 21; // 需要发送的 courseId 参数

onMounted(async () => {
  await fetchStudents();
});

const fetchStudents = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://y7xnys.natappfree.cc/studentCourse/studentList/${courseId}`, {
      headers: {
        'token': 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoyLCJpZCI6MiwidXNlcm5hbWUiOiLmnZzogIHluIgiLCJleHAiOjE3MjUwOTQ2NjN9.plta-jHjmA3sm8SspIv6MCv-P3zirwLdFJwY1TaUOd4'
      }
    });

    const data = await response.json();  // 解析 JSON 数据

    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${data.message}`);
    }

    students.value = data.data.map(student => ({
      id: student.studentId,
      name: student.studentName
    }));
  } catch (error) {
    console.error('获取学生信息失败:', error);
    errorMessage.value = `获取学生信息失败: ${error.message}`;
  }
};
</script>

<template>
  <div class="flex-col page">
    <div class="flex-row justify-between items-center group">
      <div class="flex-row items-center">
        <img
          class="shrink-0 image"
          src="https://ide.code.fun/api/image?token=6659e3d9602bd2001264c52e&name=0a922eefb13d518e76b860dcf37bda20.png"
        />
        <span class="font text ml-21">学习平台</span>
      </div>
      <div class="flex-row items-center group_2">
        <span class="font_2 text_2">教师主页</span>
        <span class="font_2 text_2 text_3">批改作业</span>
        <div class="flex-row items-center shrink-0 group_3">
          <span class="font text_4">课程名称1</span>
          <div class="flex-row items-center shrink-0 ml-59">
            <span class="font">教师id：xxxxxx</span>
            <div class="ml-22 shrink-0 section"></div>
            <span class="ml-22 font text_5">退出</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col section_2">
      <div class="flex-row justify-between group_4">
        <div class="flex-row self-start group_5">
          <span class="font_3 text_7">作业</span>
          <span class="font_3 text_8 ml-79">学生</span>
        </div>
        <div class="flex-col justify-start items-center self-center text-wrapper">
          <span class="text_6">+布置作业</span>
        </div>
      </div>
      <div class="shrink-0 divider view"></div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div v-else>
        <div v-for="student in students" :key="student.id" class="flex-row justify-center items-center relative group_6">
          <span class="font_4 text_9 pos">{{ student.name }}</span>
          <span class="font_4">{{ student.id }}</span>
        </div>
        <div class="shrink-0 divider" v-if="students.indexOf(student) < students.length - 1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.ml-21 {
  margin-left: 1.31rem;
}
.ml-59 {
  margin-left: 3.69rem;
}
.ml-79 {
  margin-left: 4.94rem;
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
.text {
  line-height: 1.16rem;
}
.group_2 {
  margin-right: 0.63rem;
}
.font_2 {
  font-size: 1.25rem;
  font-family: SourceHanSansCN;
  line-height: 1.15rem;
  color: #0077ff;
}
.text_2 {
  text-decoration: underline;
}
.text_3 {
  margin-left: 4.5rem;
  line-height: 1.16rem;
}
.group_3 {
  margin-left: 4.88rem;
}
.text_4 {
  line-height: 1.16rem;
}
.section {
  background-color: #000000;
  width: 0.063rem;
  height: 1.56rem;
}
.text_5 {
  line-height: 1.15rem;
}
.section_2 {
  padding: 0.75rem 0 22.25rem;
  background-color: #ffffff;
  overflow: hidden;
}
.group_4 {
  padding: 1rem 2.5rem 0.63rem 3.63rem;
}
.group_5 {
  margin-top: 1.38rem;
}
.font_3 {
  font-size: 2rem;
  font-family: SourceHanSansCN;
  line-height: 1.83rem;
}
.text_7 {
  color: #000000;
}
.text_8 {
  color: #0077ff;
  line-height: 1.85rem;
}
.text-wrapper {
  padding: 1rem 0 0.88rem;
  background-color: #0077ff;
  border-radius: 0.5rem;
  width: 12.06rem;
  height: 3.25rem;
}
.text_6 {
  color: #ffffff;
  font-size: 1.56rem;
  font-family: SourceHanSansCN;
  line-height: 1.44rem;
}
.divider {
  margin: 0 1.63rem;
  background-color: #b8b8b8;
  height: 0.063rem;
}
.view {
  margin: 0.75rem 1.63rem 0;
}
.group_6 {
  padding: 1.88rem 7.25rem;
}
.font_4 {
  font-size: 1.69rem;
  font-family: SourceHanSansCN;
  line-height: 1.28rem;
  color: #454545;
}
.text_9 {
  line-height: 1.36rem;
}
.pos {
  position: absolute;
  left: 7.28rem;
  top: 50%;
  transform: translateY(-50%);
}
.group_7 {
  padding: 1.88rem 7.38rem 1.63rem;
}
.font_5 {
  font-size: 1.69rem;
  font-family: SourceHanSansCN;
  line-height: 1.53rem;
  color: #454545;
}
.pos_2 {
  position: absolute;
  left: 7.34rem;
  top: 50%;
  transform: translateY(-50%);
}
.divider_2 {
  margin-right: 3.25rem;
  background-color: #b8b8b8;
  height: 0.25rem;
}
.group_8 {
  padding: 1.75rem 7.25rem;
}
.text_10 {
  line-height: 1.55rem;
}
.pos_3 {
  position: absolute;
  left: 7.25rem;
  top: 50%;
  transform: translateY(-50%);
}
.error-message {
  color: red;
  text-align: center;
  margin: 20px 0;
}
</style>
