<template>
  <div id="pending_list">
    <a-table
      :columns="columns"
      :data-source="data"
      class="components-table-demo-nested"
    >
      <a slot="operation">Publish</a>
      <a-table
        slot="expandedRowRender"
       
        :columns="innerColumns"
        :data-source="innerData"
        :pagination="false"
      >
        <span slot="status">
          <a-badge status="warning" />Finished
        </span>
      </a-table>
    </a-table>
  </div>
</template>

<script>
const columns = [
  { title: "申请人", dataIndex: "userName", key: "userName" },
  { title: "司机", dataIndex: "driver", key: "driver" },
  { title: "是否备案", dataIndex: "put_on_record", key: "put_on_record" },
  { title: "司机联系方式", dataIndex: "driver_phone", key: "driver_phone" },
  { title: "提交时间", dataIndex: "create_time", key: "create_time" },
  { title: "申请人联系方式", dataIndex: "user_phone", key: "user_phone" },
  {
    title: "Action",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: "Screem",
    platform: "iOS",
    version: "10.3.4.5654",
    upgradeNum: 500,
    creator: "Jack",
    createdAt: "2014-12-24 23:12:00",
  });
}

const innerColumns = [
  { title: "信息类型", dataIndex: "data_type", key: "data_type" },
  { title: "详细信息", dataIndex: "data", key: "data" },
  /* { title: "起始通关时间", dataIndex: "start_time", key: "start_time" },
  { title: "结束通关时间", dataIndex: "end_time", key: "end_time" },
  { title: "状态", key: "state", scopedSlots: { customRender: "status" } },// 状态 根据预约通关时间段与目前时间作比较 三天内为橙色warning 三天外为绿色success 一天内为红色ERROR
  { title: "货物重量", dataIndex: "goods_weight", key: "goods_weight" },
  { title: "货物种类", dataIndex: "goods_type", key: "goods_type" }, */
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: "2014-12-24 23:12:00",
    name: "This is production name",
    upgradeNum: "Upgraded: 56",
  });
}
import { get_auditList } from "@/api/admin";
export default {
  name: "Audit_List",
  data() {
    return {
      data,
      columns,
      innerColumns,
      innerData,
    };
  },
  mounted() {},
};
</script>

<style scoped>
</style>