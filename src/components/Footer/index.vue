<template>
  <div id="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="guide-o" @click="toSubscribe">标签</van-tabbar-item>
      <van-tabbar-item name="cluster" icon="cluster-o" dot @click="toCheckAllSubscribeList">标签</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o" badge="5">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'

export default {
  name: "Footer",
  components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
  },
   data() {
    return {
      active: 'home',
    };
  },
  methods: {
    toSubscribe(){
      this.$router.push(`/${this.$store.getters.equipment}-main/${this.$store.getters.equipment}-subscribe`)
    },
    toCheckAllSubscribeList(){
      this.$router.push(`/${this.$store.getters.equipment}-main/${this.$store.getters.equipment}-subscribeList`)
    }
  }
};
</script>

<style>
</style>