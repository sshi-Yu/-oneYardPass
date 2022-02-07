<template>
  <div id="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="guide-o" @click="toSubscribe"
        >通关预约</van-tabbar-item
      >
      <van-tabbar-item
        name="subscribeList"
        icon="cluster-o"
        dot
        @click="toCheckAllSubscribeList"
        >所有预约</van-tabbar-item
      >
      <van-tabbar-item
        name="userCenter"
        icon="friends-o"
        badge="5"
        @click="toUserCenter"
        >用户中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import "vant/lib/tabbar/style";
import "vant/lib/tabbar-item/style";

export default {
  name: "Footer",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      active: "home",
    };
  },
  methods: {
    toSubscribe() {
      this.$router.replace(
        `/${this.$store.getters.equipment}-main/${this.$store.getters.equipment}-subscribe`
      );
    },
    toCheckAllSubscribeList() {
      this.$router.replace(
        `/${this.$store.getters.equipment}-main/${this.$store.getters.equipment}-subscribeList`
      );
    },
    toUserCenter(){
      this.$router.replace(
        `/${this.$store.getters.equipment}-main/${this.$store.getters.equipment}-userCenter`
      );
    }
  },
};
</script>

<style>
</style>