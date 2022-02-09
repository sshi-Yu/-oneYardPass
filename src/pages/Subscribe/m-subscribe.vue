<template>
  <div id="m-subscribe">
    <div class="transboundary">
      <van-field
        readonly
        clickable
        label="跨境类型"
        :value="transboundaryType"
        placeholder="选择出入境类型"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
    <div class="start-add">
      <van-field
        v-model="startAdd"
        is-link
        readonly
        label="起始地"
        placeholder="请选择起始地"
        @click="
          transboundaryType
            ? (startAddIsShow = true)
            : Toast('请先选择跨境类型')
        "
      /><!-- 要求先选择跨境类型后才可选择起始和目的地 否则弹窗提示用户 -->
      <van-popup v-model="startAddIsShow" round position="bottom">
        <van-cascader
          v-model="startAdd"
          title="请选择起始地"
          :options="options_startAddress"
          @close="startAddIsShow = false"
          @finish="startAddOnFinish"
        /><!-- 根据跨境类型提供可选起始地列表 入境则默认起始地为中国 -->
      </van-popup>
    </div>
    <div class="end-add">
      <van-field
        v-model="endAdd"
        is-link
        readonly
        label="目的地"
        placeholder="请选择目的地"
        @click="
          transboundaryType ? (endAddIsShow = true) : Toast('请先选择跨境类型')
        "
      /><!-- 要求先选择跨境类型后才可选择起始和目的地 否则弹窗提示用户 -->
      <van-popup v-model="endAddIsShow" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择目的地"
          :options="options_endAddress"
          @close="endAddIsShow = false"
          @finish="endAddOnFinish"
        /><!-- 根据跨境类型提供可选目的地列表 入境则默认目的地为中国 -->
      </van-popup>
    </div>
    <div class="next-pages">
      <van-button
        color="linear-gradient(to right, #1989fa, rgb(116,203,230))"
        size="mini"
        @click.native="toDetail"
      >
        下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import { Cascader, Field, Popup, Picker, Toast, Button } from "vant";
import "vant/lib/cascader/style";
import "vant/lib/field/style";
import "vant/lib/popup/style";
import "vant/lib/picker/style";
import "vant/lib/toast/style";
import "vant/lib/button/style";

export default {
  name: "M-Subscribe",
  data() {
    return {
      startAddIsShow: false,
      endAddIsShow: false,
      startAdd: "",
      endAdd: "",
      cascaderValue: "",
      // 选项列表，children 代表子选项，支持多级嵌套
      options_startAddress: [
        /* {
          text: "缅甸",
          value: "11000",
          // children: [{ text: '杭州市', value: '330100' }],
        },
        {
          text: "老挝",
          value: "12000",
          // children: [{ text: '杭州市', value: '330100' }],
        }, */
      ],
      options_endAddress: [],
      transboundaryType: "", // 0-入境  1-出境
      showPicker: false,
      columns: ["入境", "出境"],
    };
  },
  components: {
    [Cascader.name]: Cascader,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
    [Button.name]: Button,
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    startAddOnFinish({ selectedOptions }) {
      // 起始地选择完成
      this.startAddIsShow = false;
      this.startAdd = selectedOptions.map((option) => option.text).join("/");
      this.$store.commit(
        "subscribe/SET_startAdd",
        selectedOptions.map((option) => option.text).join("/")
      );
      // 联动 选择起始地后自动匹配相应的目的地
      this.endAdd = this.options_endAddress.filter(i => i.value === selectedOptions.map((option) => option.value).join("/"))[0].text;
      this.$store.commit(
        "subscribe/SET_endAdd",
        this.options_endAddress.filter(i => i.value === selectedOptions.map((option) => option.value).join("/"))[0].text
      );
      // 设置vuex中目前选定目的地和起始地所对应的口岸名称
      this.$store.commit(
        "subscribe/SET_portName",
        selectedOptions.map((option) => option.name).join("/")
      );
      // 设置vuex中目前选定目的地和起始地所对应的口岸id
      this.$store.commit(
        "subscribe/SET_portId",
        selectedOptions.map((option) => option.value).join("/")
      );
    },
    endAddOnFinish({ selectedOptions }) {
      // 目的地选择完成
      this.endAddIsShow = false;
      this.endAdd = selectedOptions.map((option) => option.text).join("/");
      this.$store.commit(
        "subscribe/SET_endAdd",
        selectedOptions.map((option) => option.text).join("/")
      );
      // 联动 选择目的地后自动匹配相应的起始地
      this.startAdd = this.options_startAddress.filter(i => i.value === selectedOptions.map((option) => option.value).join("/"))[0].text;
      this.$store.commit( // 同步vux中的数据
        "subscribe/SET_startAdd",
        this.options_startAddress.filter(i => i.value === selectedOptions.map((option) => option.value).join("/"))[0].text
      );
      // 设置vuex中目前选定目的地和起始地所对应的口岸名称
      this.$store.commit(
        "subscribe/SET_portName",
        selectedOptions.map((option) => option.name).join("/")
      );
      // 设置vuex中目前选定目的地和起始地所对应的口岸id
      this.$store.commit(
        "subscribe/SET_portId",
        selectedOptions.map((option) => option.value).join("/")
      );
    },
    async onConfirm(value) {
      // 出入境类型选择完毕
      this.transboundaryType = value;
      this.$store.commit(
        "subscribe/SET_transboundaryType",
        value === "出境" ? "1" : "0" // 出境为1 入境为2
      );
      /* 获取口岸起始地与目的地选项列表 */
      try {
        const res = await this.$store.dispatch(
          "subscribe/getPortAddressList"
        );
        if(res.code === '1111'){// 1111 成功
          // 起始地列表
          let s_arr = []  
          res.data.map(i => s_arr.push({
            text: i.start_address +'(' + i.port_name + ')',
            value: i._id,
            name: i.port_name
          }))
          this.options_startAddress = s_arr;
          // 目的地列表
          let e_arr = []  
          res.data.map(i => e_arr.push({
            text: i.end_address +'(' + i.port_name + ')',
            value: i._id,
            name: i.port_name
          }))
          this.options_endAddress = e_arr;
        }
      } catch (error) {
        alert(error)
      }
      this.showPicker = false;
      this.startAdd = this.endAdd = '' // 重新选择出入境类型后清空起始地和目的地
      this.$store.commit("subscribe/SET_startAdd", '')
      this.$store.commit("subscribe/SET_endAdd", '') // 同时也清空vuex中保存的数据
    },
    toDetail() {
      if (this.transboundaryType && this.startAdd && this.endAdd) {
        // 用户 信息填写完整后可跳转下一页
        this.$router.push({
          path: `/${this.$store.getters.equipment}-main/${this.$store.getters.equipment}-detail`,
        });
      } else {
        Toast("请填写完整");
      }
    },
  },
  mounted() {
    // 修改header当前页面描述
    this.$bus.$emit("SET_headerDescription", "跨境预约口岸选择");
    // 将Toast挂载到this上 以便在页面中使用
    this.Toast = Toast;
  },
};
</script>

<style scoped>
@import url("../../styles/m-subscribe.css");
</style>