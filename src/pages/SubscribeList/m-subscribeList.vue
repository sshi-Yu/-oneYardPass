<template>
  <div id="m-subscribeList">
    <div class="sub_item" v-for="i in subscribeList" :key="i.subscribeId">
      <van-skeleton title :row="3" :loading="loading">
        <div class="port_name">{{ i.portName }}</div>
        <div class="port_address">
          {{ i.startAddress }} - {{ i.endAddress }}
        </div>
        <div class="submitInfo">
          <div class="submit_time">发起时间： {{ i.submitTime | time_filter }}</div>
          <div class="subscribe_state" :style="i.auditStatus | subscribe_style_filter">
            {{ i.auditStatus | subscribe_status_filter }}
          </div>
        </div>
        <div
          class="to_detailPage"
          @click="
            toCheckQRcode({
              subscribeId: i.subscribeId,
              auditStatus: i.auditStatus,
            })
          "
        >
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
import moment  from 'moment'

export default {
  name: "M-SubscribeList",
  data() {
    return {
      loading: true, // 正在加载预约列表时 显示加载占位图 加载完成后改为false 显示真实内容
      subscribeList: [{},{},{}],
    };
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
  },
  methods: {
    toCheckQRcode(msg) {
      this.$router.push({
        name: "toCheckQRcode",
        params: msg,
      });
    },
  },
  filters: {
    subscribe_status_filter: function (subscribe_status) {
      switch (subscribe_status) {
        case "0":
          return "预约撤回";
        case "1":
          return "审核中";
        case "2":
          return "预约失败";
        case "3":
          return "预约成功";
      }
    },
    subscribe_style_filter: function (subscribe_status) {
      switch (subscribe_status) {
        case "0":
          return {
            color: 'yellowgreen',
            fontWeight: '700'
          };
        case "1":
          return {
            color: 'orange',
            fontWeight: '700'
          };
        case "2":
          return {
            color: 'red',
            fontWeight: '700'
          };
        case "3":
          return {
            color: 'green',
            fontWeight: '700'
          };
      }
    },
    time_filter: function (time){
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  async mounted() {
    // 设置header提示
    this.$bus.$emit("SET_headerDescription", "所有预约");
    // 调用vuex actions 获取所有预约列表
    try {
      const res = await this.$store.dispatch("subscribe/getSubscribeList");
      if (res.code === "1111") {
        let arr = [];
        res.data.subscribeList.forEach((i) => {
          let obj = {
            portName: i.port_name,
            transboundaryType: i.transboundary_type,
            startAddress: i.start_address,
            endAddress: i.end_address,
            submitTime: i.modify_time,
            subscribeId: i._id,
            auditStatus: i.audit_status,
          };
          arr.push(obj);
        });
        this.subscribeList = arr;
        arr = [];
        this.loading = false;
      } else if (res.code === "1000") {
        Toast("未查询到预约信息");
      } else {
        alert(res.data);
      }
    } catch (err) { // 发生错误 展示占位图
      alert('ERROR')
    }
  },
};
</script>

<style scoped>
@import url("../../styles/m-subscribeList.css");
</style>