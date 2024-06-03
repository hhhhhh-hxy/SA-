<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const props = defineProps({});

const showModal = ref(false);
const delModal = ref(false);

//新的课程名
const newcourseName = ref('');
//新课程的描述
const newcourseDetails = ref('');

const router = useRouter();
const courses = ref([]);

const token = localStorage.getItem('token');
console.log(token);

//挂载时获取课程
onMounted(async () => {
  await fetchCourses();
});

//添加新的课程
const saveCourse = async () => {
  try {
    // 发送 POST 请求将课程信息传回后端
    // console.log(newcourseName.value)
    // console.log(newcourseDetails.value)
    const response = await fetch('http://127.0.0.1:4523/m1/4275697-3917645-default/course/add', {
      method: 'POST',
      headers: {
        'token': `${token}`,  
      },
      body: JSON.stringify({
        title: newcourseName.value,
        description: newcourseDetails.value
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save course.');
    }

    // 清空表单
    newcourseName.value = '';
    newcourseDetails.value = '';

    // 关闭模态框
    showModal.value = false;
    //重新加载页面
    fetchCourses();

    console.log('课程信息已成功传回后端');
  } catch (error) {
    console.error('保存课程失败:', error.message);
  }

};

//展示课程
const fetchCourses = async () => {
  // if (!token) {
  //   console.error('Token not found in localStorage');
  //   return;
  // }

  try {
    const response = await fetch('http://127.0.0.1:4523/m1/4275697-3917645-default/course/teacher/display/all', {
      headers: {
      // 'token': 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoyLCJpZCI6MiwidXNlcm5hbWUiOiLmnZzogIHluIgiLCJleHAiOjE3MjUwOTQ2NjN9.plta-jHjmA3sm8SspIv6MCv-P3zirwLdFJwY1TaUOd4'
      'token': `${token}`,  
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
      imageSrc: course.imageSrc,
      descriptionImage: course.descriptionImage
    }));
    // console.log("courses",courses.value)
  } catch (error) {
    console.error('获取课程信息失败:', error);
  }
};

//删除课程
const confirmDeleteCourse = () => {
  delModal.value = true;
  console.log("delModal.value = true");
};

const deleteCourse = async (courseID) => {
  try {
    const id = courseID;
    console.log("id:", id);

    // 设置请求头参数
    const config = {
      headers: {
        token : token,
      }
    };

    // 发送删除请求到服务器
    const response = await axios.post(`http://127.0.0.1:4523/m1/4275697-3917645-default/course/del/${id}`, null, config); 

    // 根据服务器响应处理逻辑
    if (response.status === 200) {
      // 成功删除课程，关闭模态框
      delModal.value = false;
      //重新加载页面
      fetchCourses();
      console.log('删除课程成功');
    } else {
      // 处理删除失败的情况，比如显示错误信息
      console.error('删除课程失败');
    }
  } catch (error) {
    // 处理网络错误等异常情况
    console.error('删除课程时出错:', error);
  }
};

const cancelDelete = () => {
  delModal.value = false;
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
        <span class="font text_2">批改作业</span>
        <div class="ml-64 flex-row items-center shrink-0">
          <span class="font">教师id：xxxxxx</span>
          <div class="shrink-0 section ml-23"></div>
          <span class="font text_3 ml-23">退出</span>
        </div>
      </div>
    </div>
    <div class="flex-col section_2">
      <div class="flex-row justify-between items-center group_3">
        <span class="text_4">我教的课</span>
        <!-- Trigger button for the modal -->
        <button @click="showModal = true" class="open-modal-button">创建课程</button>

        <!-- Modal -->
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <!-- Modal header -->
            <div class="modal-header">
              <span class="modal-title">创建课程</span>
              <span @click="showModal = false" class="close-modal-button">&times;</span>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="form-group">
                <label for="courseName">课程名称：</label>
                <input type="text" id="courseName" v-model="newcourseName" placeholder="请输入课程名称" />
              </div>
              <div class="form-group">
                <label for="courseDetails">课程详情：</label>
                <textarea id="courseDetails" v-model="newcourseDetails" placeholder="请输入课程详情"></textarea>
              </div>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
              <button @click="saveCourse" class="confirm-button">确认</button>
            </div>
          </div>
        </div>
      </div>
      <div class="courses-container">
        <div v-for="(course, index) in courses" :key="index" class="course-card">
          <div class="course-header">
            <div class="course-enrollment">
              <span class="font_2 text_6">选课人数：{{ course.enrollment }}</span>
            </div>
            <img
              class="image_2"
              src="/src/assets/x.png" 
              @click="confirmDeleteCourse"
              />
             <!-- src="https://ide.code.fun/api/image?token=6657cb37602bd20012644658&name=082b022bcfadc0ea9e2a1bcbb92398f6.png"-->
              <div v-if="delModal" class="modal">
                <div class="dialog">
                  <p>确定要删除该课程吗？</p>
                  <button @click="deleteCourse(course.id)" class="confirm">确定</button>
                  <button @click="cancelDelete" class="cancel">取消</button>
                </div>
              </div>
          </div>
          <span class="course-title">{{ course.title }}</span>
          <div class="course-description">
            <span class="font_4 text_8">{{ course.description }}</span>
            <img class="description-image" :src="course.descriptionImage" />
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
  }
  .text_4 {
    color: #000000;
    font-size: 2.5rem;
    font-family: SourceHanSansCN;
    line-height: 2.32rem;
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
  .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  position: relative;
}

.close-modal-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.confirm-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.open-modal-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.open-modal-button:hover {
  background-color: #0056b3;
}

.button {
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
}

.button:hover {
  background-color: #0056b3;
}
.dialog {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 300px;
            width: 100%;
            text-align: center;
        }
        .dialog p {
            margin: 0 0 20px;
            font-size: 16px;
            color: #333;
        }
        .dialog button {
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            font-size: 14px;
            cursor: pointer;
        }
        .dialog .confirm {
            background-color: #2196F3;
            color: white;
        }
        .dialog .cancel {
            background-color: #9E9E9E;
            color: white;
            margin-left: 10px;
        }
        .dialog button:hover {
            opacity: 0.8;
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
</style>