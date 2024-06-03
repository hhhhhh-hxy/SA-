<script setup>
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const token = localStorage.getItem('token');
console.log(token);

const id = 1; // 确认id的值
const studentId = route.params.studentId;
const courseName = route.params.courseName;

const homework = reactive({
  submitTime: '',
  content: '',
  status: '',
  statusDesc: '',
  score: '',
  comment: ''
}); // 确保 homework 是响应式的

onMounted(async () => {
  try {
    const homeworkResponse = await axios.get(
      `http://127.0.0.1:4523/m1/4275697-3917645-default/submission/student/view/${id}`, {
        headers: {
          token: `${token}`,
        }
      });

    const homeworksData = homeworkResponse.data.data;
    console.log("homeworkData:", homeworksData);

    if (typeof homeworksData === 'object') {
      Object.assign(homework, homeworksData);
      console.log('作业详情：', homework);
    } else {
      console.error('homeworksData 不是一个对象:', homeworksData);
    }

  } catch (error) {
    console.error('获取作业列表失败', error);
  }
});

</script>


<template>
  <div class="flex-col justify-start relative page">
    <div class="flex-col section">
      <div class="flex-row group">
        <span class="font_2 text_3">已完成</span>
        <span class="font_2 text_4 ml-45">待完成</span>
      </div>
      <div class="flex-col justify-start group_2">
        <div class="flex-col section_2">
          <div class="flex-row group_3">
            <div class="flex-row">
              <span class="font_3 text_5">作业1</span>
              <span class="font_3 ml-43">课程：{{courseName}}</span>
            </div>
            <span class="font_3 text_6 ml-102">学生：{{studentId}}</span>
          </div>
          <div class="flex-row mt-13">
            <div class="flex-col justify-start items-start flex-1 text-wrapper">
              <span class="font_3 text_7">作业详情:{{homework.content}}</span>
            </div>
            <div class="flex-col items-start self-start group_4 ml-25">
              <span class="font_3">分数:{{homework.score}}</span>
              <span class="font_3 text_8 mt-17">评语:{{homework.comment}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Repeat for other homework assignments if necessary -->
      <span class="font text pos_2">学习平台</span>
      <img
        class="image pos"
        src="https://ide.code.fun/api/image?token=665d64a1602bd20012651796&name=45bf74e2aaa3f378925013102ceccc2c.png"
      />
      <router-link to="/xueshengzhuye" class="font text_2 pos_3">
        学生主页
      </router-link>
    </div>
  </div>
</template>


<style scoped lang="css">
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
  .ml-25 {
    margin-left: 1.56rem;
  }
  .mt-17 {
    margin-top: 1.06rem;
  }
  .page {
    padding-top: 2.63rem;
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .section {
    margin-right: 1.25rem;
    padding: 1.88rem 1.63rem 5.88rem;
    background-color: #ffffff;
    overflow: hidden;
  }
  .group {
    padding: 1.25rem 3.38rem;
    border-bottom: solid 0.063rem #b8b8b8;
  }
  .font_2 {
    font-size: 2rem;
    font-family: SourceHanSansCN;
    line-height: 1.87rem;
  }
  .text_3 {
    color: #0077ff;
  }
  .text_4 {
    color: #000000;
  }
  .group_2 {
    border-bottom: solid 0.063rem #b8b8b8;
  }
  .section_2 {
    padding: 1.25rem 2.06rem;
    background-color: #fbfbfd;
  }
  .group_3 {
    padding: 0 0.5rem;
  }
  .font_3 {
    font-size: 1.69rem;
    font-family: SourceHanSansCN;
    line-height: 1.56rem;
    color: #000000;
  }
  .text_5 {
    line-height: 1.54rem;
  }
  .text_6 {
    line-height: 1.58rem;
  }
  .text-wrapper {
    padding: 0.63rem 0 8.75rem;
    background-color: #ffffff;
    height: 10.94rem;
  }
  .text_7 {
    margin-left: 0.38rem;
    line-height: 1.56rem;
  }
  .group_4 {
    margin-right: 5.63rem;
    margin-top: 4.63rem;
  }
  .text_8 {
    line-height: 1.51rem;
  }
  .font {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.17rem;
  }
  .text {
    color: #000000;
    line-height: 1.16rem;
  }
  .pos_2 {
    position: absolute;
    left: 8.54rem;
    top: 1.95rem;
  }
  .image {
    width: 2.38rem;
    height: 2.5rem;
  }
  .pos {
    position: absolute;
    left: 4.88rem;
    top: 1.37rem;
  }
  .text_2 {
    color: #0077ff;
    text-decoration: underline;
  }
  .pos_3 {
    position: absolute;
    right: 17.14rem;
    top: 1.98rem;
  }
</style>