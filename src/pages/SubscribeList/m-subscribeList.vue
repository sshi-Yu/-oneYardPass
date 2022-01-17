<template>
  <div id="m-subscribeList">
    <div class="sub_item">
      <van-skeleton title :row="3" :loading="loading">
        <div class="port_name">口岸1</div>
        <div class="port_address">缅甸 - 中国</div>
        <div class="submitInfo">
          <div class="submit_time">发起时间： 2022/12/12 09:50</div>
          <div class="subscribe_state">预约成功</div>
        </div>
        <div class="to_detailPage">
          <van-icon name="arrow" />
        </div>
      </van-skeleton>
    </div>
    <div class="sub_item">
      <van-skeleton title :row="3" :loading="loading">
        <div class="port_name">口岸1</div>
        <div class="port_address">缅甸 - 中国</div>
        <div class="submitInfo">
          <div class="submit_time">发起时间： 2022/12/12 09:50</div>
          <div class="subscribe_state">预约成功</div>
        </div>
        <div class="to_detailPage">
          <van-icon name="arrow" />
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import { Skeleton, Icon } from "vant";
import "vant/lib/skeleton/style";
import "vant/lib/icon/style";

export default {
  name: "M-SubscribeList",
  data() {
    return {
      loading: true, // 正在加载预约列表时 显示加载占位图 加载完成后改为false 显示真实内容
    };
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
  },
  mounted() {
    // 设置header提示
    this.$bus.$emit("SET_headerDescription", "所有预约");
  },
};
</script>

<style scoped>
@import url("../../styles/m-subscribeList.css");
</style>