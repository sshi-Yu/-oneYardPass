<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import { getAccessToken } from '@/utils/auth';

export default {
    name: 'APP',
    beforeCreate(){
      if( /Android|iPhone/.test(navigator.userAgent) ){
        // 用户设备为 移动设备 
        // commit => equipment = mobile
        this.$store.commit('user/SET_equipment', 'mobile')
        if( getAccessToken('At') ){
          // 发送token验证 未通过则重新定向到 m 登录界面
          // ... 未完成


        }else{
          // 无token
          this.$router.replace('/m-login') // token验证不通过 重定向到 m-login
        }
      }else{
        // 用户设备为 PC
        this.$store.commit('user/SET_equipment', 'PC')
        if( getAccessToken('At') ){
          // 发送token验证 未通过则重新定向到 pc 登录界面
          // ... 未完成


        }else{
          // 无token
          this.$router.replace('/pc-login') // token验证不通过 重定向到 pc-login
        }
      }
    }

}
</script>

<style>
@import url('./styles/init.css');
#app{
  height: 100%;
}
</style>