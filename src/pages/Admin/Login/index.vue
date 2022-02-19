<template>
  <div id="admin_login">
    <div class="title">管理员登录</div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'user_account',
            {
              rules: [
                { required: true, message: 'Please input your userAccount!' },
              ],
            },
          ]"
          placeholder="userAccount"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'user_password',
            {
              rules: [
                { required: true, message: 'Please input your userPassword!' },
              ],
            },
          ]"
          type="password"
          placeholder="userPassword"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Admin_login",
  data() {
    return {
      key: "",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.openLoadingMessage();
          const data = {
            admin_account: values.user_account,
            admin_password: values.user_password,
          };
          const resCode = await this.$store.dispatch("admin/adminLogin", data);
          if (resCode === "1111") {
            this.openDoneMessage("登陆成功");
            setTimeout(() => {
              // 登陆成功 跳转主页
              // location.reload(); // 刷新数据
              this.$router.replace('/admin/pending');
            }, 1000);
          } else if (resCode === "0002") {
            this.openWarningMessage("账号格式有误");
          } else if (resCode === "0003") {
            this.openWarningMessage("用户不存在");
          } else if (resCode === "1110") {
            this.openWarningMessage("账号密码不匹配");
          } else if (resCode === "0404") {
            this.openErrorMessage("账号已停用");
          } else {
            this.openErrorMessage("出错了，请稍后再试");
          }
        }
      });
    },
    openLoadingMessage() {
      this.$message.loading({ content: "Loading...", key: this.key });
    },
    openDoneMessage(msg) {
      this.$message.destroy();
      this.$message.success({ content: msg, key: this.key });
    },
    openWarningMessage(msg) {
      this.$message.destroy();
      this.$message.warning({ content: msg, key: this.key });
    },
    openErrorMessage(msg) {
      this.$message.destroy();
      this.$message.error({ content: msg, key: this.key });
    },
  },
};
</script>

<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
#admin_login {
  position: fixed;
  right: 100px;
  top: 100px;
  width: 400px;
  height: 400px;
  border: 1px solid #aaa;
  padding: 20px;
  border-radius: 10px;
}
.title {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 20px;
  font-weight: 700;
}
</style>