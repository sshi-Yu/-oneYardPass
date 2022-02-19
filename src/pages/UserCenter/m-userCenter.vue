<template>
  <div id="m-userCenter">
    <div class="avatar">
      <img src="@/assets/avatar.png" alt="加载失败" />
    </div>
    <div class="operate">
      <van-cell title="完善信息" @click="toCompleteInformation"
        ><van-icon name="arrow" />
      </van-cell>
      <van-cell title="退出登录" @click="toLogout"><van-icon name="arrow" /> </van-cell>
    </div>
  </div>
</template>

<script>
import { removeLoginToken } from '@/utils/auth'
import { Cell, Icon, Toast } from "vant";
import "vant/lib/cell/style";
import "vant/lib/icon/style";
import "vant/lib/toast/style";

export default {
  name: "m-userCenter",
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
  },
  mounted() {
    // 设置header提示
    this.$bus.$emit("SET_headerDescription", "个人中心");
  },
  methods: {
    toCompleteInformation() {
      this.$router.replace({ name: "m-complete" });
    },
    toLogout(){
      removeLoginToken()
      Toast('已退出登录')
      location.reload() // 刷新页面
    }
  },
};
</script>

<style scoped>
#m-userCenter {
  width: 100%;
  height: 100%;
}
.avatar {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 20px auto;
  border: 2px solid #eee;
  border-radius: 50%;
  box-shadow: 2px 2px 3px 3px #eee;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.operate {
  margin: 2px;
  border: 2px solid #eee;
  border-radius: 5px;
}
</style>