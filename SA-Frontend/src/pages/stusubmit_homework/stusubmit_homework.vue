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
    </div>
    <div class="flex-col section_2">
      <div class="group_4">
        <div class="group_7">
          <span class="font_4 text_11">作业详情</span>
        </div>
        <div class="group_9">
          <span class="font_5 text_12">作业内容：</span>
          <textarea v-model="content" class="text_14"></textarea>
        </div>
        <div class="group_11">
          <button @click="submitHomework" class="font_7 text_13">提交作业</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const homeworkId = route.params.id;
const content = ref('');

const submitHomework = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:4523/m1/4275697-3917645-default/homework/submit', {
      homeworkId: homeworkId,
      content: content.value
    });
    console.log('作业提交成功', response.data);
  } catch (error) {
    console.error('作业提交失败', error);
  }
};
</script>

<style scoped lang="css">
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

.font_7 {
  font-size: 1.69rem;
  font-family: SourceHanSansCN;
  line-height: 1.64rem;
  color: #454545;
}

.group_11 {
  padding: 1.75rem 2.63rem 1.13rem;
}

.divider {
  background-color: #b8b8b8;
  height: 0.063rem;
}

.text_13 {
  line-height: 1.55rem;
}

.text_14 {
  line-height: 1.74rem;
}
</style>