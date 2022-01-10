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
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button, Toast  } from "vant";
import 'vant/lib/button/style';
import 'vant/lib/form/style';
import 'vant/lib/field/style';
import 'vant/lib/toast/style';
import Request from '@/utils/Request.js'

export default {
  name: "Login",
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
    onSubmit: async function(values) {
      // 加载中 提示效果
      Toast.loading({
        message: '登陆中',
        forbidClick: true
      })
      const config = {
        method: 'POST',
        url: '/sys/login',
        data: values
      }
      const res = await Request(config)
      const { code, message, data, token } = res;
      if(code === 1){
        Toast.success('登陆成功')
      }else if(code === 500){
        Toast.fail('账号格式有误')
      }else if(code === 40100){
        Toast.fail('用户不存在，请先注册')
      }else if(code === 40101){
        Toast.fail('账号密码不匹配')
      }else if(code === 40110){
        Toast.fail('账号已停用')
      }else{
        Toast('出错了，请稍后再试')
      }
    },
  },
};
</script>

<style scoped>
@import url("../../styles/login.css");
</style>