<template>
  <div id="pending_list">
    <a-table
      :columns="columns"
      :data-source="colData"
      class="components-table-demo-nested"
      :pagination="false"
    >
      <a-popconfirm
        slot="action"
        slot-scope="record"
        title="Whether the audit is passed？"
        ok-text="Pass"
        cancel-text="Reject"
        @confirm="audit_pass(record.id)"
        @cancel="audit_reject(record.id)"
      >
        <a href="#">Audit</a>
      </a-popconfirm>
      <a-table
        slot="expandedRowRender"
        slot-scope="record"
        :columns="innerColumns"
        :data-source="record.children"
        :pagination="false"
      >
      </a-table>
    </a-table>
    <!-- 弹出备注框 -->
    <div>
      <a-modal v-model="visible" title="Remark" on-ok="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel"> Cancel </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
          >
            Submit
          </a-button>
        </template>
        <p>Please fill in the reason for rejection</p>
        <a-textarea
          v-model="value"
          placeholder="Please fill in the reason for rejection"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-modal>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import moment from "moment";
import { reject, approve } from "@/api/admin";
const columns = [
  { title: "申请人", dataIndex: "userName", key: "userName" },
  { title: "司机", dataIndex: "driver", key: "driver" },
  { title: "是否备案", dataIndex: "put_on_record", key: "put_on_record" },
  {
    title: "司机联系方式",
    dataIndex: "driver_phone",
    key: "driver_phone",
  },
  { title: "提交时间", dataIndex: "create_time", key: "create_time" },
  { title: "申请人联系方式", dataIndex: "user_phone", key: "user_phone" },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    scopedSlots: { customRender: "action" },
  },
];
const innerColumns = [
  {
    title: "出入境类型",
    dataIndex: "transboundary_type",
    key: "transboundary_type",
  },
  { title: "起始时间点", dataIndex: "begin_time", key: "begin_time" },
  { title: "结束时间点", dataIndex: "end_time", key: "end_time" },
  { title: "货物重量", dataIndex: "goods_weight", key: "goods_weight" },
  { title: "货物类型", dataIndex: "goods_type", key: "goods_type" },
  { title: "状态", dataIndex: "status", key: "status" },
];

import { get_pendingList } from "@/api/admin";
export default {
  name: "Audit_List",
  data() {
    return {
      colData: [],
      columns,
      innerColumns,
      loading: false, // 备注框提交加载动画
      visible: false, // 备注框是否可见
      value: "", // 备注框内容
      beCheckedItemId: "", // 当前操作的item的id
    };
  },
  methods: {
    async audit_pass(id) {
      //审核通过回调
      this.beCheckedItemId = id;
      const res = await approve({// 发起通过申请的请求
        subscribe_id: this.beCheckedItemId, // 当前操作的item的id
      });
      if (res.code === "1111") {
        this.$message.success(res.data.msg);
      }
    },
    audit_reject(id) {
      //审核不通过回调 展示备注框
      this.beCheckedItemId = id;
      this.showModal(id);
    },
    showModal() {
      this.visible = true;
    },
    async handleOk() {
      this.loading = true;
      const res = await reject({// 发起驳回申请的请求
        subscribe_id: this.beCheckedItemId, // 当前操作的item的id
        remark: this.value, //备注内容
      });
      if (res.code === "1111") {
        this.$message.success(res.data.msg);
        this.loading = false;
        this.visible = false;
      }
    },
    handleCancel() {
      this.visible = false;
    },
  },
  async mounted() {
    const res = await get_pendingList({
      admin_id: this.$store.getters.adminInfo.admin_id,
    });
    if (res.code === "1111" && res.data.data instanceof Array) {
      res.data.data.forEach((i) => {
        // 循环将获取到的数据插入外层列表 展示
        this.colData.push({
          key: nanoid(),
          id: i.subscribe_id,
          userName: i.user_name,
          driver: i.driver_name,
          put_on_record: i.putOnRecord === "0" ? "未备案" : "已备案", //根据状态码 显示备案状态
          driver_phone: i.driver_phone,
          create_time: moment(i.create_time).format("YYYY-MM-DD HH:mm:ss"), //格式化时间
          user_phone: i.user_phone,
          children: [
            {
              key: nanoid(),
              id: i.subscribe_id,
              transboundary_type:
                i.transboundary_type === "0" ? "入境" : "出境", //根据状态码 显示出入境类型
              begin_time: i.begin_time,
              end_time: i.end_time,
              goods_weight: i.goods_weight,
              goods_type: this.$options.filters.goods_type_filter(i.goods_type), //根据状态码 显示货物类型
            },
          ],
        });
      });
    }
  },
  filters: {
    goods_type_filter: function (goods_type) {
      switch (goods_type) {
        case "1":
          return "医药";
        case "2":
          return "易燃物";
        case "3":
          return "食品";
        case "4":
          return "五金";
        default:
          return "其他";
      }
    },
  },
};
</script>

<style>
.ant-table-row-level-1 {
  display: none !important;
}
</style>