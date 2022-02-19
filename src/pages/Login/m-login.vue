<template>
  <div id="login">
    <div class="login-logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="user_account"
          name="user_account"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="user_password"
          type="password"
          name="user_password"
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
      <router-link
        :to="$store.getters.equipment + '-regist'"
        class="to-registView"
        >去 注册</router-link
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
  name: "M-Login",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data() {
    return {
      user_account: "",
      user_password: "",
    };
  },
  methods: {
    onSubmit: async function (userInfo) {
      // 加载中 提示效果
      Toast.loading({
        message: "登陆中",
        forbidClick: true,
      });
      const responseCode = await this.$store.dispatch("user/login", userInfo);
      if (responseCode === '1111') {
        Toast.success("登陆成功");
        setTimeout(()=>{ // 登陆成功 跳转主页
        location.reload();// 刷新数据
          this.$router.replace(`/${this.$store.getters.equipment}-main/${this.$store.getters.equipment}-subscribe`)
        }, 1000)
      } else if (responseCode == '0002') {
        Toast.fail("账号格式有误");
      } else if (responseCode == '0003') {
        Toast.fail("用户不存在，请先注册");
      } else if (responseCode == '1110') {
        Toast.fail("账号密码不匹配");
      } else if (responseCode == '0404') {
        Toast.fail("账号已停用");
      } else {
        Toast("出错了，请稍后再试");
      }
    },
  },
};
</script>

<style scoped>
@import url("../../styles/m-login.css");
</style>