<template>
  <div id="m-sub-detail">
    <van-field
      readonly
      clickable
      label="口岸"
      :value="subscribeForm.portName"
      placeholder="选择口岸"
      @click="getPortsList"
    />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        :loading="loading"
      />
    </van-popup>
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
      <van-datetime-picker
        @confirm="setStartTime2"
        type="datehour"
        title="请选择最迟通关时间"
        :min-date="minDate"
        :max-date="maxDate"
        v-show="showDateChoose2"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { Picker, Toast, Popup, Field, CellGroup, DatetimePicker } from "vant";
import "vant/lib/picker/style";
import "vant/lib/toast/style";
import "vant/lib/popup/style";
import "vant/lib/field/style";
import "vant/lib/cell-group/style";
import "vant/lib/datetime-picker/style";

import moment from "moment";

export default {
  name: "M-Sub-Detail",
  data() {
    return {
      showPicker: false,
      columns: ["口岸1", "口岸2", "口岸3", "口岸4", "口岸5"],
      loading: true,
      subscribeForm: {
        portName: "",
        ownerName: "",
        phoneNumber: "",
        licensePlate: "",
        caseNumber: "",
        goodsType: "",
        goodsWeight: "",
        startTime: "",
        endTime: "",
      },
      minDate: new Date(2022, 1, 1),
      maxDate: new Date(2022, 11, 31),
      currentDate: new Date(),
      showDateChoose1: false,
      showDateChoose2: false,
    };
  },
  watch: {
    subscribeForm: {
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
      this.value = value;
      this.showPicker = false;
    },
    async getPortsList() {
      this.loading = true;
      if (this.$store.state.subscribe.transboundaryType) {
        this.showPicker = true;
        const portsList = await this.$store.dispatch("subscribe/getPortsList", {
          address:
            this.$store.state.subscribe.transboundaryType === "入境"
              ? this.$store.state.subscribe.endAdd
              : this.$store.state.subscribe.transboundaryType === "出境"
              ? this.$store.state.subscribe.startAdd
              : "",
        });
        this.columns = portsList; // 展示 后台返回的口岸列表
        this.loading = false;
      } else {
        Toast("请重新填写跨境起始地与目的地信息");
      }
    },
    setStartTime1(v) {
      this.subscribeForm.startTime = moment(v).format("YYYY-MM-DD HH:mm:ss");
      this.showDateChoose1 = false
    },
    setStartTime2(v) {
      this.subscribeForm.endTime = moment(v).format("YYYY-MM-DD HH:mm:ss");
      this.showDateChoose2 = false
    },
  },
  components: {
    [Picker.name]: Picker,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [DatetimePicker.name]: DatetimePicker,
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