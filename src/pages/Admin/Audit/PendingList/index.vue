<template>
  <div id="pending_list">
    <a-table
      :columns="columns"
      :data-source="colData"
      class="components-table-demo-nested"
      :pagination="false"
    >
      <a-table
        slot="expandedRowRender"
        slot-scope="record"
        :columns="innerColumns"
        :data-source="record.children"
        :pagination="false"
      >
      </a-table>
    </a-table>
  </div>
</template>

<script>
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
    key: "operation",
    scopedSlots: { customRender: "operation" },
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

import { get_auditList } from "@/api/admin";
export default {
  name: "Audit_List",
  data() {
    return {
      colData: [],
      columns,
      innerColumns,
    };
  },
  async mounted() {
    const res = await get_auditList({
      admin_id: this.$store.getters.adminInfo.admin_id,
    });
    if (res.code === "1111" && res.data.data instanceof Array) {
      res.data.data.forEach((i) => {
        // 循环将获取到的数据插入外层列表 展示
        this.colData.push({
          key: i.subscribe_id,
          userName: i.user_name,
          driver: i.driver_name,
          put_on_record: i.putOnRecord,
          driver_phone: i.driver_phone,
          create_time: i.create_time,
          user_phone: i.user_phone,
          children: [
            {
              key: i.subscribe_id,
              transboundary_type: i.transboundary_type,
              begin_time: i.begin_time,
              end_time: i.end_time,
              goods_weight: i.goods_weight,
              goods_type: i.goods_type,
            },
          ],
        });
      });
    }
  },
};
</script>

<style scoped>
</style>