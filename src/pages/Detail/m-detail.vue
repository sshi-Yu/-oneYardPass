<template>
  <div id="m-sub-detail">
    <van-field
      readonly
      clickable
      label="口岸"
      :value="$store.getters.subscribeForm.portName"
      placeholder="选择口岸"
      unable
    />
    <van-cell-group>
      <van-field
        v-model="subscribeForm.ownerName"
        label="车主"
        placeholder="请输入车主姓名"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="subscribeForm.phoneNumber"
        type="tel"
        label="手机号"
        placeholder="请输入联系电话"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="subscribeForm.licensePlate"
        label="车辆牌照"
        placeholder="请输入车辆牌照"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="subscribeForm.caseNumber"
        label="集装箱编号"
        placeholder="请输入集装箱编号"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="subscribeForm.goodsType"
        label="货物类型"
        placeholder="请输入货物类型"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="subscribeForm.goodsWeight"
        label="货物重量"
        placeholder="请输入货物重量"
      />
    </van-cell-group>
    <van-divider content-position="left" style="fontsize: 12px"
      >请选择通关时间段</van-divider
    >
    <van-cell-group>
      <van-field
        label="起始时间"
        :value="subscribeForm.startTime"
        readonly
        @click="showDateChoose1 = true"
        placeholder="请选择最早通关时间"
      />
      <van-datetime-picker
        @confirm="setStartTime1"
        type="datehour"
        title="请选择最早通关时间"
        :min-date="minDate"
        :max-date="maxDate"
        v-show="showDateChoose1"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        label="结束时间"
        :value="subscribeForm.endTime"
        readonly
        @click="showDateChoose2 = true"
        placeholder="请选择最迟通关时间"
      />
    </van-cell-group>
    <div class="submit_subscribe">
      <van-button
        plain
        hairline
        type="info"
        size="small"
        @click.prevent="submit_subscribeForm"
        >提交预约</van-button
      >
    </div>
  </div>
</template>

<script>
import {
  Picker,
  Toast,
  Popup,
  Field,
  CellGroup,
  DatetimePicker,
  Divider,
  Button,
} from "vant";
import "vant/lib/picker/style";
import "vant/lib/toast/style";
import "vant/lib/popup/style";
import "vant/lib/field/style";
import "vant/lib/cell-group/style";
import "vant/lib/datetime-picker/style";
import "vant/lib/divider/style";
import "vant/lib/button/style";

import moment from "moment";

export default {
  name: "M-Sub-Detail",
  data() {
    return {
      showPicker: false,
      columns: ["口岸1", "口岸2", "口岸3", "口岸4", "口岸5"],
      loading: true,
      subscribeForm: {
        // portName: "",
        ownerName: "",
        phoneNumber: "",
        licensePlate: "",
        caseNumber: "",
        goodsType: "",
        goodsWeight: "",
        startTime: "",
        endTime: "",
        // portId: ""
      },
      minDate: new Date(2022, 1, 1),
      maxDate: new Date(2022, 11, 31),
      currentDate: new Date(),
      showDateChoose1: false,
      showDateChoose2: false,
      subFormIsFillIn: false, // 指示预约表单是否填写完整 完整置true
    };
  },
  watch: {
    subscribeForm: {
      // 对预约列表进行监视 当数据发生变化时 同步至vuex中
      deep: true,
      handler: function (newV) {
        const keys = Object.keys(newV);
        keys.map((i) => {
          return this.$store.commit(
            `subscribe/SET_${i}`,
            this.subscribeForm[i]
          );
        });
      },
    },
  },
  methods: {
    onConfirm(value) {
      this.subscribeForm.portName = value;
      this.showPicker = false;
    },
    async submit_subscribeForm() {
      this.subFormIsFillIn = Object.values(this.$store.getters.subscribeForm).every((i) => i !== ""); // 表单填写完整可正常提交 为填写完整不可提交
      if (this.subFormIsFillIn) {
        const subscribeRes = await this.$store.dispatch(
          "subscribe/submitSubscribeForm"
        );
        if (subscribeRes.code === "1111") {
          // 根据返回信息判断是否提交预约成功
          Toast("预约成功，请等待审核通过");
          setTimeout(() => {
            this.$router.replace("/m-main/m-subscribeList");
          }, 1500);
        } else if (subscribeRes.code === "1009") {
          Toast("请先完善个人信息后才可预约");
        } else {
          alert(subscribeRes.data);
        }
      }
    },
    setStartTime1(v) {
      // 选择最早通关时间后 自动设定最迟通关时间为3小时候 即通关时间段 为3小时
      this.subscribeForm.startTime = moment(v).format("YYYY-MM-DD HH:mm:ss");
      this.subscribeForm.endTime = moment(v)
        .add(3, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      this.showDateChoose1 = false;
    },
  },
  components: {
    [Picker.name]: Picker,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [DatetimePicker.name]: DatetimePicker,
    [Divider.name]: Divider,
    [Button.name]: Button,
  },
  mounted() {
    // 修改header当前页面描述
    this.$bus.$emit("SET_headerDescription", "跨境预约申报表填写");
  },
};
</script>

<style scoped>
@import url("../../styles/m-sub-detail.css");
</style>