<script setup>
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { ref,reactive, onMounted } from 'vue';

  // 创建响应式变量，用于存储用户名和密码
  const username = ref('');
  const password = ref('');
    
  // 获取 Router 实例
  const router = useRouter();

  // 点击按钮时触发的登录函数
  const login = () => {
    // 创建FormData实例并设置用户名和密码
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('password', password.value);
    const config = {
      method: 'post',
       url: 'http://127.0.0.1:4523/m1/4275697-0-default/user/login',
      // url: 'http://localhost:8081/user/login',
      data: formData
    };

    // 发送请求
    axios(config)
        .then(function (response) {
          // 根据 code 判断处理方式
          if (response.data.code === -500) {
            // 用户不存在，弹出提示
            alert("user not exist");
          } else {
            // 获取后端返回的token
            const token = response.data.data.token;
            // 存储token到localStorage
            localStorage.setItem("token", token);

            console.log(JSON.stringify(response.data));
            if(response.data.data.role == 1){
              // 使用 router.push 进行导航
              router.push({ path: "/student", query: { id: response.data.data.id } });
            }else if(response.data.data.role == 2){
              router.push({ path: "/teacher", query: { id: response.data.data.id } });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }
</script>

<template>
  <div class="flex-col justify-start items-center relative page">
    <img
      class="image"
      src="/src/assets/home.png"
      
    />
    <span class="text_3 pos_2">学习平台</span>
    <div class="flex-col section pos">
      <div class="flex-col">
        <div class="flex-row justify-between self-stretch">
          <div class="flex-row items-center">
            <img
              class="shrink-0 image_2"
              src="https://ide.code.fun/api/image?token=66568ee2a16e9e0012505d6b&name=0a922eefb13d518e76b860dcf37bda20.png"
            />
            <span class="ml-20 font">学习平台</span>
          </div>
          <img
            class="self-start image_3"
            src="https://ide.code.fun/api/image?token=66568ee2a16e9e0012505d6b&name=330178079c158c3d240847f0a21ea058.png"
          />
        </div>
        <span class="self-center font text mt-27">登录</span>
      </div>
      <div class="flex-col group">
        <span class="self-start font text_2">账号</span>
          <input
                    id="username"
                    class="self-stretch group_2 view"
                    type="text"
                    placeholder="User Name"
                    v-model="username"
                  />
        <span class="self-start font text_4">密码</span>
        <!-- <div class="self-stretch group_2 view_2"></div> -->
        <input id="password" class="self-stretch group_2 view_2" placeholder="Password" type="password" v-model="password"/>
      </div>
          <button class="flex-col justify-start items-center text-wrapper" @click="login">确认登陆</button>
    </div>
  </div>
</template>

<style scoped lang="css">
  .mt-27 {
    margin-top: 1.69rem;
  }
  .page {
    background-color: #ffffff;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .image {
    filter: blur(0.34rem);
    width: 100vw;
    height: 66.0156vw;
  }
  .text_3 {
    color: #ffffff;
    font-size: 8.75rem;
    font-family: SourceHanSansCN;
    line-height: 8.12rem;
  }
  .pos_2 {
    position: absolute;
    right: 22.48rem;
    bottom: 21.87rem;
  }
  .section {
    padding: 1.5rem 1.31rem 6.44rem 2rem;
    background-color: #ffffff;
    width: 26.88rem;
  }
  .pos {
    position: absolute;
    left: 26.31rem;
    top: 10.88rem;
  }
  .image_2 {
    width: 2.38rem;
    height: 2.5rem;
  }
  .font {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.16rem;
    color: #000000;
  }
  .image_3 {
    width: 1.31rem;
    height: 1.31rem;
  }
  .text {
    line-height: 1.15rem;
  }
  .group {
    margin-top: 2.25rem;
    padding: 0 1.25rem;
  }
  .text_2 {
    margin-left: 0.25rem;
    line-height: 1.13rem;
  }
  .group_2 {
    height: 2.81rem;
    border-left: solid 0.063rem #dedede;
    border-right: solid 0.063rem #dedede;
    border-top: solid 0.063rem #dedede;
    border-bottom: solid 0.063rem #dedede;
  }
  .view {
    margin-top: 0.38rem;
  }
  .text_4 {
    margin-left: 0.25rem;
    margin-top: 1.5rem;
  }
  .view_2 {
    margin-top: 0.25rem;
  }
  .text-wrapper {
    margin: 4.5rem 1.38rem 0;
    padding: 1rem 0 0.88rem;
    background-color: #64a8f5;
    width: 20.88rem;
  }
  .text_5 {
    color: #ffffff;
    line-height: 1.16rem;
  }
</style>