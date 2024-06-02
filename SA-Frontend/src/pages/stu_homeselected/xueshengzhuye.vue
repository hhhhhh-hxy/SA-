<script setup>
import { ref, onMounted } from 'vue';

const courses = ref([]);

onMounted(async () => {
  await fetchCourses();
});

const fetchCourses = async () => {
  const token = localStorage.getItem('token');
  // if (!token) {
  //   console.error('Token not found in localStorage');
  //   return;
  // }

  try {
    const response = await fetch('http://nenq7y.natappfree.cc/studentCourse/display/chosen', {
      headers: {
        'token': 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxLCJpZCI6MSwidXNlcm5hbWUiOiJBcHBlYXJpbmdPbk51bGxkYXkiLCJleHAiOjE3MjQ3NjcyNjN9.w6W3vwQRaBsMHwhRMho3doDIkVbIzC__KzWyRWyGn-c'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    courses.value = data.data.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      enrollment: course.enrollment,
      teacherName: course.teacherName,
      teacherId: course.teacherId,
      toFinish: course.toFinish
    }));
  } catch (error) {
    console.error('获取课程信息失败:', error);
  }
};
</script>

<template>
  <div class="flex-col page">
    <div class="flex-row justify-between items-center group">
      <div class="flex-row items-center">
        <img
          class="shrink-0 image"
          src="https://ide.code.fun/api/image?token=6657cb37602bd20012644658&name=ecb219049c6a0d28a7ef96a224ff1f70.png"
        />
        <span class="ml-18 font text">学习平台</span>
      </div>
      <div class="flex-row items-center group_2">
        <div class="ml-64 flex-row items-center shrink-0">
          <span class="font">学生id：xxxxxx</span>
          <div class="shrink-0 section ml-23"></div>
          <span class="font text_3 ml-23">退出</span>
        </div>
      </div>
    </div>
    <div class="flex-col section_2">
      <div class="flex-row justify-between items-center group_3">
        <span class="text_4">所有课程</span>
        <span class="selected-courses">已选课程</span>
      </div>
      <div class="courses-container">
        <div v-for="(course, index) in courses" :key="index" class="course-card">
          <div class="badge" v-if="course.toFinish > 0">{{ course.toFinish }}</div>
          <div class="course-header">
            <div class="course-enrollment">
              <span class="font_2 text_6">选课人数：{{ course.enrollment }}</span>
            </div>
            <img
              class="image_2"
              src="https://ide.code.fun/api/image?token=6657cb37602bd20012644658&name=082b022bcfadc0ea9e2a1bcbb92398f6.png"
            />
          </div>
          <span class="course-title">{{ course.title }}</span>
          <div class="course-description">
            <span class="font_4 text_8">{{ course.description }}</span>
          </div>
          <div class="flex-row">
            <button class="select-course-button">+ 选择课程</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .ml-23 {
    margin-left: 1.44rem;
  }
  .page {
    padding: 0 1.19rem 2.19rem 2.75rem;
    background-color: #fbfbfd;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .group {
    padding: 1.88rem 0 2.5rem;
  }
  .image {
    width: 2.31rem;
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
    margin-right: 1.88rem;
  }
  .text_2 {
    color: #0077ff;
    line-height: 1.16rem;
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
    margin-left: 1.13rem;
    padding: 0 1.25rem 22.38rem;
    background-color: #ffffff;
    overflow: hidden;
  }
  .group_3 {
    padding: 1.13rem 0 1.88rem;
    border-bottom: solid 0.25rem #b8b8b8;
    display: flex;
    justify-content: flex-start; /* 左对齐 */
    align-items: center; /* 垂直居中对齐 */
  }
  .text_4 {
    color: #000000;
    font-size: 2.5rem;
    font-family: SourceHanSansCN;
    line-height: 2.32rem;
  }
  .selected-courses {
    color: #0077ff;
    font-size: 2.5rem;
    font-family: SourceHanSansCN;
    line-height: 2.32rem;
  }
  .selected-courses {
    position: relative;
    margin-left: 10px; /* 向右移动一点 */
  }
  .text-wrapper {
    margin-right: 2.5rem;
    padding: 1rem 0 0.88rem;
    background-color: #006aff;
    border-radius: 0.5rem;
    width: 12.06rem;
    height: 3.25rem;
  }
  .text_5 {
    color: #ffffff;
    font-size: 1.56rem;
    font-family: SourceHanSansCN;
    line-height: 1.44rem;
  }
  .courses-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* 课程卡片之间的间距 */
    margin-top: 16px;
  }
  .course-card {
    width: calc(25% - 16px); /* 每行最多显示四个课程卡片 */
    display: flex;
    flex-direction: column;
    background-color: #284481;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    box-sizing: border-box;
    position: relative; /* 添加此行以使徽章定位相对于课程卡片 */
  }
  .course-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .course-enrollment {
    font-size: 14px;
    color: #666;
  }
  .course-title {
    font-size: 16px;
    font-weight: bold;
    margin-top: 8px;
    color: white;
  }
  .course-description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  .course-image,
  .description-image {
    width: 24px;
    height: 24px;
  }
  .font_2 {
    font-size: 0.75rem;
    font-family: SourceHanSansCN;
    line-height: 0.69rem;
    color: #ffffff;
  }
  .text_6 {
    margin: 0 0.13rem;
  }
  .image_2 {
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .font_3 {
    font-size: 1.88rem;
    font-family: Inter;
    line-height: 1.73rem;
    color: #000000;
  }
  .text_7 {
    margin-top: 1.25rem;
    text-shadow: 0rem 0.13rem 0rem #f5f7ff33;
  }
  .section_4 {
    margin-top: 2rem;
    padding: 0.75rem 0.63rem 0.75rem 2.13rem;
    background-color: #00000029;
    border-radius: 0rem 0rem 0.69rem 0.69rem;
    backdrop-filter: blur(0.25rem);
  }
  .font_4 {
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    letter-spacing: 0.075rem;
    line-height: 0.86rem;
    color: #ffffff;
  }
  .text_8 {
    text-transform: uppercase;
  }
  .select-course-button {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.44rem;
    color: #2a82e4;
    background-color: #ffffff;
    border: 2px solid #2a82e4;
    border-radius: 0.31rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-top: 10px;
  }

  .select-course-button:hover {
    background-color: #2a82e4;
    color: #ffffff;
  }

  /* 添加徽章样式 */
  .badge {
    position: absolute;
    top: -10px; /* 调整顶部间距 */
    right: -10px; /* 调整右侧间距 */
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 5px 10px;
    font-size: 0.75rem;
    font-family: SourceHanSansCN;
  }
</style>

