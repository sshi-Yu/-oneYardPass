<template>
  <div id="header">
    <!-- <van-nav-bar :title="headerDescription" left-text="返回" left-arrow @click.native="returnLastPage"> -->
    <van-nav-bar :title="headerDescription" @click.native="returnLastPage">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'
import 'vant/lib/nav-bar/style'

export default {
    name: 'Header',
    data(){
      return {
        headerDescription: ''
      }
    },
    methods: {
     /*  returnLastPage(){
        this.$router.go(-1);
      } */
    },
    components: { 
        [NavBar.name]: NavBar,
        [Icon.name]: Icon
     },
     mounted(){
       // 注册事件 用于修改header描述
       this.$bus.$on('SET_headerDescription',(msg)=>{
         this.headerDescription = msg;
       })
     }
};
</script>

<style scoped>

</style>