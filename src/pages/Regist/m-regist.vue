<template>
  <div id="regist">
    <div class="regist-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="password"
          type="password"
          name="userpasword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="verifyPassword"
          type="password"
          name="verifyPassword"
          label="校验密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="userAccount"
          name="userAccount"
          label="手机号码"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="msgCode"
          name="msgCode"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="mini"
              type="primary"
              @click.prevent="toSendCode"
              ref="sendCodeBtn"
              >{{ buttonNoticeMsg }}</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
      <router-link
        :to="$store.getters.equipment + '-login'"
        class="to-loginView"
        >去 登录</router-link
      >
    </div>
  </div>
</template>

<script>
import { Form, Field, Button, Toast } from "vant";
import "vant/lib/button/style";
import "vant/lib/form/style";
import "vant/lib/field/style";
import "vant/lib/toast/style";

import { phoneVCode } from "@/api/utils";

export default {
  name: "M-Regist",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data() {
    return {
      userAccount: "",
      password: "",
      verifyPassword: "",
      msgCode: "",
      buttonNoticeMsg: "发送验证码",
    };
  },
  methods: {
    async onSubmit(values) { // 提交注册
    console.log(values)
      const config = {
        user_account: values.userAccount,
        user_password: values.verifyPassword,
        // code: values.msgCode
      };
      const res = await this.$store.dispatch("user/regist", config);
      if (res.code === '1111') {
        // 注册成功
        Toast("注册成功");
        this.$router.replace(`${this.$store.getters.equipment}-regist`);
      } else if (res.code === '0010') {
        // 重复注册
        Toast.fail("该账号已注册，请勿重复注册");
      }else if(res.code === 10100){
        Toast.fail('验证码无效')
      } else {
        Toast(res.data)
      }
    },
    async toSendCode() { // 发送验证码
      const res = await phoneVCode({
        phone: this.userAccount
      });
      if (res.code == 1) { // code == 1 验证码发送成功
        let countDown = 60;
        let timer = setInterval(() => {
          // 设置倒计时
          if (countDown >= 0) {
            this.$refs.sendCodeBtn.setAttribute("disabled", true); // 倒计时未结束不可再次点击
            this.buttonNoticeMsg = countDown--;
          } else {
            clearInterval(timer); // 清除定时器
            this.buttonNoticeMsg = "重新发送验证码";
            this.$refs.sendCodeBtn.removeAttribute("disabled"); // 倒计时结束可重新点击发送验证码
          }
        }, 1000);
      } else if(res.code == 40120){
        Toast.fail('手机号码格式错误')
      } 
    },
  },
};
</script>

<style scoped>
@import url("../../styles/m-regist.css");
</style>