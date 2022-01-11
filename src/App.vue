<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'APP',
    beforeCreate(){
      console.log(navigator.userAgent)
      if( /Android|iPhone/.test(navigator.userAgent) ){
        // 用户设备为 移动设备 
        // commit => equipment = mobile
        this.$store.commit('user/SET_equipment', 'mobile')
      }else{
        // 用户设备为 PC
        this.$store.commit('user/SET_equipment', 'PC')
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