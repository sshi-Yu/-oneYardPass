<template>
  <div id="header">
    <a-menu class="tabList" v-model="current" mode="horizontal">
      <a-menu-item key="pending" @click="toPendingList">
        <a-icon type="file" />待处理
      </a-menu-item>
      <a-menu-item key="done" @click="toDoneList">
        <a-icon type="file-done" />已处理
      </a-menu-item>
    </a-menu>
    <div class="admin_center">
      <img src="@/assets/avatar.png" />
      <a-popconfirm
        class="operate"
        title="Are you sure？"
        ok-text="Yes"
        cancel-text="No"
        @confirm="clearAdminInfo"
      >
        <a href="#">退出登录</a>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
import { removeAdminIdAndToken } from "@/utils/auth";
export default {
  name: "Admin-Header",
  data() {
    return {
      current: ["pending"],
    };
  },
  methods: {
    toPendingList() {
      this.$router.push("/admin/pending");
    },
    toDoneList() {
      this.$router.push("/admin/done");
    },
    clearAdminInfo() {
      removeAdminIdAndToken();
    },
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 50px;
  position: relative;
}
.tabList {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.admin_center {
  width: 150px;
  position: absolute;
  right: 20px;
  transform: translate(0, 2px);
}
.admin_center img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #eee;
  box-shadow: 2px 2px 2px 2px #eee inset;
}
.operate {
  float: right;
  margin: 15px auto;
  font-size: 14px;
  color: blue;
  cursor: pointer;
}
</style>