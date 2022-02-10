<template>
  <div id="m-QRcode">
    <div id="qrcode" ref="qrcode"></div>
    <div class="statusIndicator">
        审核状态: {{$route.params.auditStatus | subscribe_status_filter}}
    </div>
    <div class="mask" v-if="$route.params.auditStatus != 3">
        <div class="replay">
            <van-icon name="replay"/> 审核未通过，请稍后再试。
        </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { get_subscribeInfo } from "@/api/port";
import { Icon } from 'vant'
import 'vant/lib/icon/style'

export default {
  name: "M-QRcode",
  components: {
      [Icon.name]: Icon
  },
  methods: {
    qrCode(msg, QRCode) {
      let qrcode = new QRCode("qrcode", {
        width: 250, //图像宽度
        height: 250, //图像高度
        colorDark: "#000000", //前景色
        colorLight: "#ffffff", //背景色
        typeNumber: 1,
        correctLevel: QRCode.CorrectLevel.H, //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      });
      qrcode.clear(); //清除二维码
      qrcode.makeCode(msg, QRCode); //生成另一个新的二维码
    },
    getQRcodeMsg() {
      // let
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
  },
  async mounted() {
    if (this.$route.params.auditStatus == 3) {
      // 如果预约状态为3 即预约成功
      let qrmsg = await get_subscribeInfo({
        subscribe_id: this.$route.params.subscribeId,
        user_id: this.$store.getters.userInfo._id
      })// 发送预约id 获取二维码信息
      this.qrCode(JSON.stringify(qrmsg), QRCode);
    } else {
      let default_qrmsg = '审核未通过，请等待审核结果'; // 审核未通过时 以此提示内容生产二维码
      this.qrCode(JSON.stringify(default_qrmsg), QRCode);
    }
  },
};
</script>

<style scoped>
#m-QRcode{
    position: relative;
    margin: 50px auto;
    width: 275px;
    height: 275px;
}
#qrcode{
    border: 2px double rgb(25, 137, 250);
    padding: 10px;
    margin: 0 auto;
}
.statusIndicator{
    margin: 10px auto;
    font-size: 12px;
}
.mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(200,200,200,.96);
    top: 0;
    left: 0;
}
.replay{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>