<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getAccessToken, getAdminId, getUserId  } from "@/utils/auth";

export default {
  name: "APP",
  async beforeCreate() {
    if (/Android|iPhone/.test(navigator.userAgent)) {
      // 用户设备为 移动设备
      // commit => equipment = mobile
      this.$store.commit("user/SET_equipment", "mobile");
      if (getAccessToken("At")) {
        //每次刷新重新加载后 若cookie中保存有用户id 则发送用户id 且每次发起请求都会携带token 交由后台验证 通过后重新获取用户信息
        if (getUserId()) {
          // 有userId
          const refresh_res = await this.$store.dispatch(
            "user/ref_userInfo", {
              user_id: getUserId()
            }
          );
          if (refresh_res.code === "1111") {// 验证成功 设置userInfo
            this.$store.commit('user/SET_userInfo', refresh_res.data.userInfo)
            this.$router.replace("/m-main/m-subscribe");
          } else {// 失败 重定向到登录页
            this.$router.replace("/m-login");
          }
        } else {
          // 无userId
          this.$router.replace("/m-login"); // token验证不通过 重定向到 m-login
        }
      } else {
        // 无token
        this.$router.replace("/m-login"); // token验证不通过 重定向到 m-login
      }
    } else {
      // 用户设备为 PC
      this.$store.commit("user/SET_equipment", "PC");
      if (getAccessToken("At")) {
        // 发送token验证 未通过则重新定向到 pc 登录界面
        if (getAdminId()) {
          // 有userId
          const refresh_res = await this.$store.dispatch(
            "admin/ref_adminInfo", {
              admin_id: getAdminId()
            }
          );
          if (refresh_res.code === "1111") {// 验证成功 设置adminInfo
            this.$store.commit('admin/SET_adminInfo', refresh_res.data.adminInfo)
            this.$router.replace("/admin/pending");
          } else {// 失败 重定向到登录页
            this.$router.replace("/admin-login");
          }
        } else {
          // 无userId
          this.$router.replace("/admin-login"); // token验证不通过 重定向到 admin-login
        }
      } else {
        // 无token
        this.$router.replace("/admin-login"); // token验证不通过 重定向到 admin-login
      }
    }
  },
};
</script>

<style>
@import url("./styles/init.css");
#app {
  height: 100%;
}
</style>