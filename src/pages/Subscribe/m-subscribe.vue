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
        @click="transboundaryType ? startAddIsShow = true : Toast('请先选择跨境类型')" 
      /><!-- 要求先选择跨境类型后才可选择起始和目的地 否则弹窗提示用户 -->
      <van-popup v-model="startAddIsShow" round position="bottom">
        <van-cascader
          v-model="startAdd"
          title="请选择起始地"
          :options="transboundaryType === '入境' ? options : [{text: '中国', value: '10000'}] "
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
        @click="transboundaryType ? endAddIsShow = true : Toast('请先选择跨境类型')"
      /><!-- 要求先选择跨境类型后才可选择起始和目的地 否则弹窗提示用户 -->
      <van-popup v-model="endAddIsShow" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择目的地"
          :options="transboundaryType === '入境' ? [{text: '中国', value: '10000'}] : options "
          @close="endAddIsShow = false"
          @finish="endAddOnFinish"
        /><!-- 根据跨境类型提供可选目的地列表 入境则默认目的地为中国 -->
      </van-popup>
    </div>
    <div class="next-pages">
      <router-link :to="`/${this.$store.getters.equipment}-main/${this.$store.getters.equipment}-subscribe/detail`">下一步</router-link>
    </div>
  </div>
</template>

<script>
import { Cascader, Field, Popup, Picker, Toast } from "vant";
import "vant/lib/cascader/style";
import "vant/lib/field/style";
import "vant/lib/popup/style";
import "vant/lib/picker/style";
import "vant/lib/toast/style";

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
      options: [
        {
          text: "缅甸",
          value: "11000",
          // children: [{ text: '杭州市', value: '330100' }],
        },
        {
          text: "老挝",
          value: "12000",
          // children: [{ text: '杭州市', value: '330100' }],
        },
      ],
      transboundaryType: '', // 1-入境  2-出境
      showPicker: false,
      columns: [ '入境', '出境' ]
    };
  },
  components: {
    [Cascader.name]: Cascader,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    startAddOnFinish({ selectedOptions }) { // 起始地选择完成
      this.startAddIsShow = false;
      this.startAdd = selectedOptions.map((option) => option.text).join("/");
    },
    endAddOnFinish({ selectedOptions }) { // 目的地选择完成
      this.endAddIsShow = false;
      this.endAdd = selectedOptions.map((option) => option.text).join("/");
    },
    onConfirm(value) { // 出入境类型选择完毕
      this.transboundaryType = value;
      this.showPicker = false;
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