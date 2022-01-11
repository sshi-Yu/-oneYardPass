<template>
  <div id="login">
    <div class="login-logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="userAccount"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
      <router-link to="/regist" class="to-registView">去 注册</router-link>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button, Toast  } from "vant";
import 'vant/lib/button/style';
import 'vant/lib/form/style';
import 'vant/lib/field/style';
import 'vant/lib/toast/style';

export default {
  name: "M-Login",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit: async function(userInfo) {
      // 加载中 提示效果
      Toast.loading({
        message: '登陆中',
        forbidClick: true
      })
      const responseCode = await this.$store.dispatch('user/login', userInfo);
      if(responseCode == 1){
        Toast.success('登陆成功')
      }else if(responseCode == 500){
        Toast.fail('账号格式有误')
      }else if(responseCode == 40100){
        Toast.fail('用户不存在，请先注册')
      }else if(responseCode == 40101){
        Toast.fail('账号密码不匹配')
      }else if(responseCode == 40110){
        Toast.fail('账号已停用')
      }else{
        Toast('出错了，请稍后再试')
      }
    },
  },
};
</script>

<style scoped>
@import url("../../styles/m-login.css");
</style>