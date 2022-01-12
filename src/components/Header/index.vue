<template>
  <div id="header">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
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
    components: { 
        [NavBar.name]: NavBar,
        [Icon.name]: Icon
     }
};
</script>

<style>
</style>