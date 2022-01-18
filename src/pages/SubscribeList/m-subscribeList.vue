<template>
  <div id="m-subscribeList">
    <div class="sub_item" v-for="i in subscribeList" :key="i.subscribeId">
      <van-skeleton title :row="3" :loading="loading">
        <div class="port_name">{{ i.portName }}</div>
        <div class="port_address" v-if="(i.transboundaryType = '1')">
          {{ i.address }} - 中国
        </div>
        <div class="port_address" v-else>
          中国 - {{ i.address }}
        </div>
        <div class="submitInfo">
          <div class="submit_time">发起时间： {{i.submitTime}}</div>
          <div class="subscribe_state">{{i.auditStatus}}</div>
        </div>
        <div class="to_detailPage">
          <van-icon name="arrow" />
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import { Skeleton, Icon, Toast } from "vant";
import "vant/lib/skeleton/style";
import "vant/lib/icon/style";
import "vant/lib/toast/style";

export default {
  name: "M-SubscribeList",
  data() {
    return {
      loading: true, // 正在加载预约列表时 显示加载占位图 加载完成后改为false 显示真实内容
      subscribeList: [
        {
          portName: "口岸1",
          transboundaryType: "1", // 1为出境 2为入境
          address: "缅甸",
          submitTime: "2022-02-01 03:00:00",
          subscribeId: "1",
          auditStatus: "1", // 
        },
        {
          portName: "口岸1",
          transboundaryType: "1", // 1为出境 2为入境
          address: "缅甸",
          submitTime: "2022-02-01 03:00:00",
          subscribeId: "2",
          auditStatus: "2", // 
        },
      ],
    };
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
  },
  mounted() {
    // 设置header提示
    this.$bus.$emit("SET_headerDescription", "所有预约");
    // 调用vuex actions 获取所有预约列表
    this.$store.dispatch("subscribe/getSubscribeList").then(
      (result) => {
        this.subscribeList = result;
        this.loading = false;
      },
      (reason) => Toast(reason)
    );
  },
};
</script>

<style scoped>
@import url("../../styles/m-subscribeList.css");
</style>