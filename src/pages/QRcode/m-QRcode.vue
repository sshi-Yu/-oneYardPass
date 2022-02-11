<template>
  <div id="m-QRcode">
    <div id="qrcode" ref="qrcode"></div>
    <div class="statusIndicator">
      <b class="title">审核状态:</b>
      <p :style="$route.params.auditStatus | subscribe_style_filter">
        {{ $route.params.auditStatus | subscribe_status_filter }}
      </p>
      <div
        v-if="$route.params.auditStatus === '2'"
        style="textAlign: center; margin: 20px 0"
      >
        <van-button type="info" size="mini" @click="checkFailReason"
          >查看预约失败原因</van-button
        >
      </div>
    </div>
    <div class="statusIndicator" v-if="$route.params.auditStatus === '3'">
      <b class="title">通关类型:</b>
      <p
        :style="
          subscribeInfo.transboundary_type === '0'
            ? { color: 'deepyellow' }
            : { color: 'orange' }
        "
      >
        {{ subscribeInfo.transboundary_type === "0" ? "入境" : "出境" }}
      </p>
    </div>
    <div class="statusIndicator" v-if="$route.params.auditStatus === '3'">
      <b class="title">可通关时间段:</b>
      <p :style="passable ? { color: 'green' } : { color: 'red' }">
        {{ subscribeInfo.begin_time }}
      </p>
      <p :style="passable ? { color: 'green' } : { color: 'red' }">-</p>
      <p :style="passable ? { color: 'green' } : { color: 'red' }">
        {{ subscribeInfo.end_time }}
      </p>
    </div>
    <div class="statusIndicator" v-if="$route.params.auditStatus === '3'">
      <b class="title">货物类型:</b>
      <p
        :style="
          subscribeInfo.goods_type === '1'
            ? { color: 'orange' }
            : subscribeInfo.goods_type === '2'
            ? { color: 'red' }
            : subscribeInfo.goods_type === '5'
            ? { color: 'orange' }
            : { color: 'green' }
        "
      >
        {{ subscribeInfo.goods_type | subscribe_goodsType_filter }}
      </p>
    </div>
    <div class="statusIndicator" v-if="$route.params.auditStatus === '3'">
      <b class="title">货物重量:</b>
      <p style="fontweight: 600">
        {{ subscribeInfo.goods_weight }}
      </p>
    </div>
    <div
      class="mask"
      v-if="
        $route.params.auditStatus !== '3' && $route.params.auditStatus !== '2'
      "
    >
      <div class="replay">
        <van-icon name="replay" /> 审核未通过，请稍后再试。
      </div>
    </div>
    <div class="mask" v-else-if="$route.params.auditStatus === '2'">
      <div class="replay">
        <van-icon name="replay" /> 审核未通过，请重新提交预约申请。
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { get_subscribeInfo } from "@/api/port";
import { Icon, Button, Dialog } from "vant";
import "vant/lib/icon/style";
import "vant/lib/button/style";
import "vant/lib/dialog/style";

export default {
  name: "M-QRcode",
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      subscribeInfo: {},
      passable: false,
    };
  },
  methods: {
    qrCode(msg, QRCode, config) {
      let qrcode = new QRCode("qrcode", {
        width: 250, //图像宽度
        height: 250, //图像高度
        colorDark: config.colorDark, //前景色
        colorLight: config.colorLight, //背景色
        typeNumber: 1,
        correctLevel: QRCode.CorrectLevel.H, //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      });
      qrcode.clear(); //清除二维码
      qrcode.makeCode(msg, QRCode); //生成另一个新的二维码
    },
    checkFailReason() {
      Dialog.alert({
        title: "预约失败提示",  
        message: this.subscribeInfo.remark + '\n',
        theme: "round-button",
        confirmButtonColor: '#1989fa',
        showCancelButton: true,
        confirmButtonText: '去登记',
        cancelButtonText: '取消'
      }).then(() => {// 点击 去登记 按钮后 跳转去登记页面
        this.$router.replace({name: 'm-complete'})
      },() => Dialog.close());
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
            color: "yellowgreen",
            fontWeight: "700",
          };
        case "1":
          return {
            color: "orange",
            fontWeight: "700",
          };
        case "2":
          return {
            color: "red",
            fontWeight: "700",
          };
        case "3":
          return {
            color: "green",
            fontWeight: "700",
          };
      }
    },
    subscribe_goodsType_filter: function (goodsType) {
      switch (goodsType) {
        case "5":
          return "其他";
        case "1":
          return "医药";
        case "2":
          return "易燃物";
        case "3":
          return "食品";
        case "4":
          return "五金";
      }
    },
  },
  async mounted() {
    if (
      this.$route.params.auditStatus === "3" ||
      this.$route.params.auditStatus === "2"
    ) {
      // 如果预约状态为3 即预约成功
      // 如果预约状态为2 即预约失败 获取失败状态
      let qrmsg = await get_subscribeInfo({
        subscribe_id: this.$route.params.subscribeId,
        user_id: this.$store.getters.userInfo._id,
      }); // 发送预约id 获取二维码信息
      if (qrmsg.code === "1111") {
        this.subscribeInfo = qrmsg.data.subscribeInfo;
        this.passable = qrmsg.data.passable;
        this.qrCode(JSON.stringify(qrmsg.data.subscribeInfo), QRCode, {
          colorDark: "green",
          colorLight: "#fff",
        });
      } else if (qrmsg.code === "1002") {
        this.passable = qrmsg.data.passable;
        this.subscribeInfo = qrmsg.data.subscribeInfo;
        this.qrCode(JSON.stringify(qrmsg.data.subscribeInfo), QRCode, {
          colorDark: "orange",
          colorLight: "#fff",
        });
      }
    } else {
      let default_qrmsg = "审核未通过，请等待审核结果"; // 审核未通过时 以此提示内容生产二维码
      this.qrCode(JSON.stringify(default_qrmsg), QRCode, {
        colorDark: "red",
        colorLight: "#fff",
      });
    }
  },
};
</script>

<style scoped>
#m-QRcode {
  position: relative;
  margin: 50px auto;
  width: 275px;
  height: 275px;
}
#qrcode {
  border: 2px double rgb(25, 137, 250);
  padding: 10px;
  margin: 0 auto;
}
.statusIndicator {
  margin: 10px auto;
  font-size: 16px;
}
.statusIndicator p {
  text-align: center;
  /* color: green; */
}
.title {
  text-decoration: normal;
  font-size: 14px;
}
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.96);
  top: 0;
  left: 0;
}
.replay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>