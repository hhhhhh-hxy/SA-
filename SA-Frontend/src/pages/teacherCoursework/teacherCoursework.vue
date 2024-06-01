<script setup>
  import { useRouter,useRoute } from 'vue-router';
  import { reactive, onMounted,ref} from 'vue';
  import axios from 'axios';

  const route = useRoute();
  const router = useRouter();

  const token = localStorage.getItem('token');
  console.log(token);

  //上个页面通过路由参数传来的课程id
  // const id = route.params.id;
  //先测试把id置为1
  const id = 1;

  //上个页面路由得到教师id和课程名字
  const teacherId = route.params.teacherId;
  const courseName = route.params.courseName;

  const homeworks = reactive([]);
  const homework = reactive({});

  const homeworkData = reactive({
    title:'',
    description:'',
    start:'',
    end:'',
  })

  const isModalVisible = ref(false);
  const successMessage = ref('');

  //控制布置作业模态框
  const showModal = (id) =>{
    isModalVisible.value = true;
    console.log("课程ID：",id);
    console.log("打开模态框，isModalVisible的值：",isModalVisible.value)
  }
  const closeModal = () => {
  isModalVisible.value = false;
};

  //布置作业
  const assignHomework = async() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hour = now.getHours().toString().padStart(2, '0');
      const minute = now.getMinutes().toString().padStart(2, '0');
      return `${year}-${month}-${day}T${hour}:${minute}`;
    };

    const newHomework = {
      title: homeworkData.title,
      description: homeworkData.description,
      start: homeworkData.start,
      end: homeworkData.end,
    }

    console.log(newHomework);
    try{
      await axios.post(`http://127.0.0.1:4523/m1/4275697-0-default/homework/assign/${id}`, newHomework, {
        headers: {
          token: token,
        }
      });
      console.log("成功布置！");
      homeworks.push(newHomework);
      homeworkData.title = '';
      homeworkData.description = '';
      homeworkData.start = '';
      homeworkData.end = '';
      successMessage.value = '布置作业成功!';
      
    }catch(error){
      console.log("布置作业失败！")
      
    }
  };

  //挂载时获取作业信息展示在页面
  onMounted(async () => {
    try {
      const homeworkResponse = await axios.get(
          `http://127.0.0.1:4523/m1/4275697-0-default/homework/displayAll/${id}`, {
            headers: {
              token: `${token}`,
            }
          });

      const homeworksData = homeworkResponse.data.data;
      homeworks.splice(0);
      homeworks.push(...homeworksData);

      console.log('作业信息：', homeworks);

    } catch (error) {
      console.error('获取作业列表失败', error);
    }
  });
  
</script>

<template>
  <div class="flex-col page">
    <div class="flex-row justify-between items-center group">
      <div class="flex-row items-center">
        <img
          class="shrink-0 image"
          src="/src/assets/xuexipingtai.png"
        />
        <span class="font text ml-21">学习平台</span>
      </div>
      <div class="flex-row items-center group_2">
        <!-- 跳转教师主页 -->
        <router-link to="/teacher_homepage" class="font_2 text_2 text_3">教师主页</router-link>
        <router-link  :to="{path:'/pigaizuoye1',query:{teacherid:teacherId}}" class="font_2 text_2 text_4">批改作业</router-link>
        <div class="flex-row items-center shrink-0 group_3">
          <span class="font text_5">课程名称:{{courseName}}</span>
          <div class="flex-row items-center shrink-0 ml-59">
            <span class="font text_6">教师id:{{teacherId}}</span>
            <div class="ml-22 shrink-0 section"></div>
            <span class="ml-22 font text_7">退出</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col section_2">
      <div class="flex-col group_4">
        <div class="flex-row justify-between group_5">
          <div class="flex-row self-start group_6">
            <span class="font_3 text_9">作业</span>
            <span class="font_3 text_10 ml-79">学生</span>
          </div>
          <button @click="showModal(id)" class="flex-col justify-start items-center self-center text-wrapper">
            <span class="text_8">+布置作业</span>
          </button>

          <!-- 布置作业模态框 -->
          <div v-if="isModalVisible" class="modal">
              <div class="modal-content">
                  <span @click="closeModal" class="close-btn">&times;</span>
                  
                  <div class="flex-col page">
                      <div class="flex-col group">
                          <span class="self-start text font_4">布置作业</span> 
                          <div class="self-stretch divider mt-2"></div> 
                      </div>
                      <div class="input-group">
                          <span class="self-start font">课程名称：</span>
                          <input type="text" placeholder="请输入课程名称" class="font_2 input-style" v-model="homeworkData.title"/> 
                      </div>
                      <div class="input-group">
                          <span class="self-start font">作业内容：</span>
                          <input type="text" placeholder="请输入作业内容" class="font_2 input-style" v-model="homeworkData.description"/> 
                      </div>
                      <div class="flex-row justify-start items-start group_5">
                          <div class="flex-col relative">
                              <span class="font text_5">开始时间：</span>
                              <input type="datetime-local" value="{{ getCurrentDate() }}" class="input-style" v-model="homeworkData.start"/> 
                          </div>
                          <div class="flex-col relative">
                              <span class="font text_6">结束时间：</span>
                              <input type="datetime-local" value="{{ getCurrentDate() }}" class="input-style" v-model="homeworkData.end"/> 
                          </div>
                      </div>
                      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
                  </div>
                  <button @click="assignHomework" class="confirm-btn btn-style">确认</button> 
              </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>作业标题</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>已提交/总人数</th>
              <th></th>
              <div class="shrink-0 divider mt-79"></div>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(homework, index) in homeworks" :key="index">
              <td>{{ homework.title }}</td>
              <td>{{ homework.start}}</td>
              <td>{{ homework.end}}</td>
              <td>{{ homework.submitted }}/{{ homework.total }}</td>
              <!-- 跳转该作业的所有提交页 -->
              <td><router-link  :to="'/submission_all/' + homework.id" class="font_2 text_2">查看详情</router-link></td>
              <div class="shrink-0 divider mt-79"></div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">

.success-message {
  margin-top: 10px;
  color: green;
  font-weight: bold;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  /* border: 1px solid #ddd; */
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
}

td {
  border-bottom: 1px solid #ddd; /* 添加底部边框 */
}

.btn-style {
    background-color: #4CAF50; 
    border: none;
    color: white;
    padding: 10px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
}

.input-style {
    width: 100%; /* Full width input */
    padding: 12px 20px; /* Padding */
    margin: 8px 0; /* Margin */
    box-sizing: border-box; /* Box sizing */
    border-radius: 5px; /* Rounded corners */
    border: 1px solid #ccc; /* Border */
}
.modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.confirm-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
.confirm-btn:hover {
  background-color: #45a049;
}
  .ml-21 {
    margin-left: 1.31rem;
  }
  .ml-59 {
    margin-left: 3.69rem;
  }
  .ml-79 {
    margin-left: 4.94rem;
  }
  .ml-141 {
    margin-left: 8.81rem;
  }
  .ml-149 {
    margin-left: 9.31rem;
  }
  .ml-83 {
    margin-left: 5.19rem;
  }
  .ml-27 {
    margin-left: 1.69rem;
  }
  .mt-79 {
    margin-top: 4.94rem;
  }
  .page {
    padding: 0 2.5rem 0.88rem;
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
    line-height: 1.16rem;
    color: #000000;
  }
  .text {
    line-height: 1.16rem;
  }

  .text_2 {
    text-decoration: none;
}

  .group_2 {
    margin-right: 0.63rem;
  }
  .font_2 {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.16rem;
    color: #0077ff;
  }
  .text_3 {
    line-height: 1.15rem;
  }
  .text_4 {
    margin-left: 4.5rem;
    line-height: 1.16rem;
  }
  .group_3 {
    margin-left: 4.88rem;
  }
  .text_5 {
    line-height: 1.16rem;
  }
  .text_6 {
    line-height: 1.15rem;
  }
  .section {
    background-color: #000000;
    width: 0.063rem;
    height: 1.56rem;
  }
  .text_7 {
    line-height: 1.15rem;
  }
  .section_2 {
    padding: 1.38rem 1.63rem 12.25rem;
    background-color: #ffffff;
    overflow: hidden;
  }
  .group_4 {
    border-bottom: solid 0.063rem #b8b8b8;
  }
  .group_5 {
    padding: 0.38rem 0.88rem 1.38rem 2rem;
    border-bottom: solid 0.063rem #b8b8b8;
  }
  .group_6 {
    margin-top: 1.38rem;
  }
  .font_3 {
    font-size: 2rem;
    font-family: SourceHanSansCN;
    line-height: 1.83rem;
  }
  .text_9 {
    color: #0077ff;
  }
  .text_10 {
    color: #000000;
    line-height: 1.85rem;
  }
  .text-wrapper {
    padding: 1rem 0 0.88rem;
    background-color: #0077ff;
    border-radius: 0.5rem;
    width: 12.06rem;
    height: 3.25rem;
  }
  .text_8 {
    color: #ffffff;
    font-size: 1.56rem;
    font-family: SourceHanSansCN;
    line-height: 1.44rem;
  }
  .group_7 {
    padding: 1.75rem 1.13rem 1.38rem;
    border-bottom: solid 0.063rem #b8b8b8;
  }
  .font_4 {
    font-size: 1.69rem;
    font-family: SourceHanSansCN;
    line-height: 1.54rem;
    color: #6b6b6b;
  }
  .text_11 {
    line-height: 1.55rem;
  }
  .text_12 {
    line-height: 1.56rem;
  }
  .group_8 {
    margin-right: 8.75rem;
  }
  .text_13 {
    line-height: 1.55rem;
  }
  .text_14 {
    line-height: 1.74rem;
  }
  .group_9 {
    padding: 1.75rem 2.63rem 1.13rem;
    border-bottom: solid 0.063rem #b8b8b8;
  }
  .font_5 {
    font-size: 1.69rem;
    font-family: SourceHanSansCN;
    line-height: 1.54rem;
    color: #454545;
  }
  .font_6 {
    font-size: 1.69rem;
    font-family: SourceHanSansCN;
    line-height: 2rem;
    color: #454545;
  }
  .text_15 {
    text-align: center;
    width: 12.13rem;
  }
  .text_16 {
    text-align: center;
    width: 13.06rem;
  }
  .group_10 {
    margin-right: 0.25rem;
  }
  .font_7 {
    font-size: 1.69rem;
    font-family: SourceHanSansCN;
    line-height: 1.64rem;
    color: #454545;
  }
  .group_11 {
    padding: 1.75rem 2.63rem 1.13rem;
  }
  .group_12 {
    margin-right: 0.25rem;
  }
  .divider {
    background-color: #b8b8b8;
    height: 0.063rem;
  }
</style>