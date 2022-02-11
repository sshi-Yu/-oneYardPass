<template>
  <div id="m-complete">
    <van-form @submit="onSubmit">
      <van-field
        v-model="driver_name"
        name="driver_name"
        label="车主姓名"
        placeholder="车主姓名"
        :rules="[{ required: true, message: '请填写车主姓名' }]"
      />
      <van-field
        v-model="phone"
        name="phone"
        label="联系电话"
        placeholder="联系电话"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />
      <van-field
        v-model="case_number"
        name="case_number"
        label="集装箱号"
        placeholder="集装箱号"
        :rules="[{ required: true, message: '请填写集装箱号' }]"
      />
      <van-field
        v-model="license_plate"
        name="license_plate"
        label="车牌号"
        placeholder="车牌号"
        :rules="[{ required: true, message: '请填写车牌号' }]"
      />
      <div style="margin: 16px 70px">
        <van-button round block size="small" type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, Notify } from "vant";
import "vant/lib/form/style";
import "vant/lib/field/style";
import "vant/lib/button/style";
import "vant/lib/notify/style";
import { submit_driverForm } from "@/api/utils";

export default {
  name: "M-Complete",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Notify.name]: Notify,
  },
  data() {
    return {
      driver_name: "",
      phone: "",
      case_number: "",
      license_plate: "",
    };
  },
  methods: {
    async onSubmit(v) {
      v.user_id = this.$store.getters.userInfo._id;
      const res = await submit_driverForm(v);
      if(res.code === '1111'){
          Notify({
              type: 'success',
              message: '登记车辆和司机信息成功'
          })
      }else if(res.code === '1000'){
          Notify({
              type: 'warning',
              message: '此信息已登记，不可重复登记'
          })
      }else{
          Notify({
              type: 'danger',
              message: '发生了错误，请稍后再试'
          })
      }
    },
  },
  mounted() {
    // 修改header当前页面描述
    this.$bus.$emit("SET_headerDescription", "登记车辆和司机信息");
  },
};
</script>

<style>
</style>