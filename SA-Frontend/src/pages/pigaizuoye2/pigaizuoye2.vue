<script setup>
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const teacherId = route.query.teacherId;
const props = defineProps({});

const data = reactive({});

const router = useRouter();
</script>

<template>
<div class="flex-col page">
  <div class="flex-row justify-between items-center group">
    <div class="flex-row items-center">
      <img
        class="shrink-0 image"
        src="https://ide.code.fun/api/image?token=665a90ee602bd2001264d0f8&name=0a922eefb13d518e76b860dcf37bda20.png"
      />
      <span class="font text ml-21">学习平台</span>
    </div>
    <div class="flex-row items-center group_2">
      <span class="font text_2">教师主页</span>
      <div class="ml-62 flex-row items-center shrink-0">
        <span class="font">教师id:{{teacherId}}</span>
        <div class="shrink-0 section ml-23"></div>
        <span class="font text_3 ml-23">退出</span>
      </div>
    </div>
  </div>
  <div class="flex-col section_2">
    <div class="flex-row group_3">
      <router-link  :to="{path:'/pigaizuoye1',query:{teacherid:teacherId}}" class="font_2 text_2 text_4">已批改</router-link>
      &nbsp;&nbsp;&nbsp; <!-- 使用空格作为间隔 -->
      <span class="font_2 text_5 ml-45">待批改</span>
    </div>
    <div class="flex-col justify-start group_4">
      <div class="flex-col section_3">
        <div class="flex-row group_5">
          <div class="flex-row">
            <span class="font_3 text_6">作业1</span>
            <span class="font_3 ml-43">课程：课程名称1</span>
          </div>
          <span class="font_3 text_7 ml-102">学生：张三</span>
        </div>
        <div class="flex-row mt-7">
          <div class="flex-col justify-start items-start flex-1 text-wrapper_2">
            <span class="font_3 text_9">作业详情：xxxxxx</span>
          </div>
          <div class="flex-col group_6 ml-27">
            <div class="flex-col justify-start items-center self-stretch relative">
              <div class="flex-col justify-start text-wrapper"><span class="font_4 text_8">请输入分数</span></div>
              <span class="font_3 pos">分数：</span>
            </div>
            <div class="flex-col justify-start items-end self-stretch relative group_7">
              <div class="flex-col justify-start items-start text-wrapper_3">
                <span class="font_4 text_11">请输入评语</span>
              </div>
              <span class="font_3 text_10 pos_2">评语：</span>
            </div>
            <div class="flex-col justify-start items-center self-end text-wrapper_4">
              <span class="font_5 text_12">提交</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col section_3">
      <div class="flex-row group_5">
        <div class="flex-row">
          <span class="font_3 text_6">作业1</span>
          <span class="font_3 ml-43">课程：课程名称1</span>
        </div>
        <span class="font_3 text_7 ml-102">学生：张三</span>
      </div>
      <div class="flex-row mt-7">
        <div class="flex-col justify-start items-start flex-1 text-wrapper_2">
          <span class="font_3 text_9">作业详情：xxxxxx</span>
        </div>
        <div class="flex-col group_6 ml-27">
          <div class="flex-col justify-start items-center self-stretch relative">
            <div class="flex-col justify-start text-wrapper"><span class="font_4 text_8">请输入分数</span></div>
            <span class="font_3 pos_3">分数：</span>
          </div>
          <div class="flex-col justify-start items-end self-stretch relative group_7">
            <div class="flex-col justify-start items-start text-wrapper_3">
              <span class="font_4 text_11">请输入评语</span>
            </div>
            <span class="font_3 text_10 pos_4">评语：</span>
          </div>
          <div class="flex-col justify-start items-center self-end text-wrapper_4">
            <span class="font_5 text_12">提交</span>
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
.mt-7 {
  margin-top: 0.44rem;
}
.ml-27 {
  margin-left: 1.69rem;
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
  padding: 1.25rem 3.38rem;
  border-bottom: solid 0.063rem #b8b8b8;
}
.font_2 {
  font-size: 2rem;
  font-family: SourceHanSansCN;
  line-height: 1.85rem;
}
.text_4 {
  color: #000000;
}
.text_5 {
  color: #0077ff;
}
.group_4 {
  border-bottom: solid 0.063rem #b8b8b8;
}
.section_3 {
  padding: 1.25rem 2.06rem;
  background-color: #fbfbfd;
}
.group_5 {
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
.text-wrapper_2 {
  margin-top: 0.31rem;
  padding: 0.63rem 0 8.75rem;
  background-color: #ffffff;
  height: 10.94rem;
}
.text_9 {
  margin-left: 0.38rem;
  line-height: 1.56rem;
}
.group_6 {
  margin-right: 0.25rem;
  width: 14.9rem;
}
.text-wrapper {
  padding: 0.38rem 0 0.25rem;
  background-color: #ffffff;
}
.font_4 {
  font-size: 1.38rem;
  font-family: SourceHanSansCN;
  line-height: 1.27rem;
  color: #a6a6a6;
}
.text_8 {
  margin-left: 0.38rem;
  margin-right: 0.25rem;
}
.pos {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.group_7 {
  margin-top: 0.19rem;
}
.text-wrapper_3 {
  padding: 0.38rem 0 3.38rem;
  background-color: #ffffff;
  width: 10.63rem;
}
.text_11 {
  margin-left: 0.38rem;
  line-height: 1.27rem;
}
.text_10 {
  line-height: 1.51rem;
}
.pos_2 {
  position: absolute;
  left: 0;
  top: 0.27rem;
}
.text-wrapper_4 {
  margin-top: 1.81rem;
  padding: 0.63rem 0 0.5rem;
  background-color: #0077ff;
  border-radius: 0.36rem;
  width: 4.56rem;
}
.font_5 {
  font-size: 1.25rem;
  font-family: SourceHanSansCN;
  line-height: 1.15rem;
  color: #ffffff;
}
.text_12 {
  line-height: 1.16rem;
}
.pos_3 {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.pos_4 {
  position: absolute;
  left: 0;
  top: 0.27rem;
}
</style>