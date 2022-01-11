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
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="mini" type="primary">{{buttonNoticeMsg}}</van-button>
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
      msgCode: '',
      buttonNoticeMsg: '发送验证码',
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style scoped>
@import url("../../styles/m-regist.css");
</style>