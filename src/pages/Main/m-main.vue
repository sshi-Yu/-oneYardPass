<template>
  <div id="m-main">
      <Header />
      <div class="main-con">
            <!-- <keep-alive> -->
              <router-view></router-view>
            <!-- </keep-alive> -->
      </div>
      <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "M-Main",
  components: { Header, Footer },
};
</script>

<style scoped>
@import url("../../styles/m-main.css");
</style>