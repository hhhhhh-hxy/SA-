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

  //上个页面路由得到学生id和课程名字
  const studentId = route.params.studentId;
  const courseName = route.params.courseName;

  const homeworks = reactive([]);
  const homework = reactive({});


  //挂载时获取作业信息展示在页面
  onMounted(async () => {
    try {
      const homeworkResponse = await axios.get(
          `http://127.0.0.1:4523/m1/4275697-0-default/homework/student/displayAll/${id}`, {
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
        <!-- 跳转学生主页 -->
         <router-link to="/student_homepage" class="font_2 text_2 text_3">学生主页</router-link>
        <div class="flex-row items-center shrink-0 group_3">
          <span class="font text_5">课程名称：{{courseName}}</span>
          <div class="flex-row items-center shrink-0 ml-59">
            <span class="font text_6">学生id：{{studentId}}</span>
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
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>作业标题</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th></th>
              <th></th>
              <div class="shrink-0 divider mt-79"></div>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(homework, index) in homeworks" :key="index">
              <td>{{ homework.title }}</td>
              <td>{{ homework.start}}</td>
              <td>{{ homework.end}}</td>
              <!-- 路由跳转 -->
               <!-- 联调时用下面的 -->
              <td><router-link  :to="'/writehomework/' + homework.homeworkId" class="font_2 text_2">完成作业</router-link></td>
              <td><router-link  :to="'/submission_details/' + homework.homeworkId" class="font_2 text_2">查看详情</router-link></td>
              <!-- <td><router-link v-if="homework.status === 2" :to="'/writehomework/' + homework.homeworkId" class="font_2 text_2">完成作业</router-link></td>
              <td><router-link v-if="homework.status === 1" :to="'/submission_details/' + homework.homeworkId" class="font_2 text_2">查看详情</router-link></td> -->
              <div class="shrink-0 divider mt-79"></div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
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